const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { connectProducer, sendToKafka, disconnectProducer } = require('./kafka_server/KafkaProducer');
const { connectConsumer, consumeMessages, disconnectConsumer } = require('./kafka_server/KafkaConsumer');

const app = express();
const port = process.env.PORT || 11003;

app.use(express.json());
app.use(cors());

const apiKey = '422b67ada252e9771ef77e13b5f220c551d1861649895ec3d42fabf7741534ef';

// Démarrage du Producer Kafka
connectProducer().then(() => console.log('Producteur Kafka connecté')).catch(e => console.error('Erreur de connexion du producer Kafka:', e));

app.get('/api_back/cryptos/top-trending', async (req, res) => {
  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?tsym=USD', {
        params: {
            apikey: apiKey,
        },
    });

    const topTrendingCryptos = response.data.Data.map(crypto => ({
        image: `https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`,
        name: crypto.CoinInfo.FullName,
        symbol: crypto.CoinInfo.Name,
        price: crypto.DISPLAY.USD.PRICE,
        marketperformance: crypto.DISPLAY.USD.TOPTIERVOLUME24HOUR,
    }));

    await sendToKafka('server_cryptoviz', topTrendingCryptos);

    res.json(topTrendingCryptos);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

app.get('/api_back/cryptos/top-gainers', async (req, res) => {
  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD', {
      params: {
        apikey: apiKey,
      },
    });

    const topGainersCryptos = response.data.Data.map(crypto => ({
        image: `https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`,
        name: crypto.CoinInfo.FullName,
        symbol: crypto.CoinInfo.Name,
        price: crypto.DISPLAY.USD.PRICE,
        market_cap: crypto.DISPLAY.USD.MKTCAP,
    }));

    await sendToKafka('server_cryptoviz', topGainersCryptos);

    res.json(topGainersCryptos);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

app.get('/api_back/cryptos/total-mining', async (req, res) => {
    try {
      const response = await axios.get('https://min-api.cryptocompare.com/data/blockchain/mining/calculator?fsyms=BTC,ETH,ZEC&tsyms=USD', {
        params: {
          apikey: apiKey,
        },
      });
  
      const data = response.data.Data;
  
      const totalMiningCryptos = Object.keys(data).map(key => {
        const crypto = data[key];
        return {
          image: `https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`,
          name: crypto.CoinInfo.FullName,
          symbol: crypto.CoinInfo.Name,
          totalmining: crypto.CoinInfo.TotalCoinsMined,
          blockreward: crypto.CoinInfo.BlockReward,
        };
      });

      await sendToKafka('server_cryptoviz', totalMiningCryptos);
  
      res.json(totalMiningCryptos);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
      res.status(error.response ? error.response.status : 500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

app.get('/api_back/cryptos/all-cryptocurrency', async (req, res) => {
    try {
        const page = req.query.page || 1; // Commence à partir de zéro
        const response = await axios.get(`https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?tsym=USD&assetClass=ALL&page=${page - 1}`, {
            params: {
                apikey: apiKey,
            },
        });

        const data = response.data.Data;

        const allCurrencyCryptos = Object.keys(data).map(key => {
            const crypto = data[key];
            return {
              ratingrank: crypto.CoinInfo?.Rating?.Weiss?.Rating || 'N/A',
              image: `https://www.cryptocompare.com${crypto.CoinInfo?.ImageUrl || ''}`,
              symbol: crypto.CoinInfo?.Name || 'N/A',
              fullname: crypto.CoinInfo?.FullName || 'N/A',
              rating: crypto.CoinInfo?.Rating?.Weiss?.MarketPerformanceRating || 'N/A',
              marketperformance: crypto.CoinInfo?.Rating?.Weiss?.MarketPerformanceRating || 'N/A',
              maxsupply: crypto.CoinInfo?.MaxSupply || 'N/A',
              top24h: crypto.RAW?.USD?.TOPTIERVOLUME24HOUR || 'N/A',
              price: crypto.RAW?.USD?.PRICE || 'N/A',
              lastvolume: crypto.RAW?.USD?.LASTVOLUME || 'N/A',
              volumehour: crypto.RAW?.USD?.VOLUMEHOUR || 'N/A',
              volumeday: crypto.RAW?.USD?.VOLUMEDAY || 'N/A',
              volume24h: crypto.RAW?.USD?.VOLUME24HOUR || 'N/A',
            };
        });

        await sendToKafka('server_cryptoviz', allCurrencyCryptos);

        res.json(allCurrencyCryptos);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

app.get('/api_back/cryptos/all-exchanges', async (req, res) => {
  try {
      const response = await axios.get('https://min-api.cryptocompare.com/data/exchanges/general', {
          params: {
              apikey: apiKey,
          },
      });

      const data = response.data.Data;

      const allExchangesCryptos = Object.values(data).map(exchange => {
          return {
              image: `https://www.cryptocompare.com${exchange.LogoUrl}`,
              link: exchange.AffiliateURL,
              name: exchange.Name,
              gradepoint: exchange.GradePoints,
              marketquality: exchange.GradePointsSplit.MarketQuality,
              negativereport: exchange.GradePointsSplit.NegativeReportsPenalty,
              country: exchange.Country,
              volume24h: exchange.TOTALVOLUME24H,
              rating: {
                  one: exchange.Rating.One,
                  two: exchange.Rating.Two,
                  three: exchange.Rating.Three,
                  four: exchange.Rating.Four,
                  five: exchange.Rating.Five,
                  avg: exchange.Rating.Avg,
                  totalUsers: exchange.Rating.TotalUsers,
              },
          };
      });

      await sendToKafka('server_cryptoviz', allExchangesCryptos);

      res.json(allExchangesCryptos);
  } catch (error) {
      console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
      res.status(error.response ? error.response.status : 500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

// Démarrage et utilisation du Consommateur Kafka
connectConsumer().then(() => {
  console.log('Consommateur Kafka connecté');
  consumeMessages((data) => {
    console.log('Message reçu:', data);
    // Traitez ici les données reçues de Kafka
  });
}).catch(e => console.error('Erreur de connexion du consommateur Kafka:', e));

// Assurez-vous de déconnecter le producteur et le consommateur lors de l'arrêt du serveur
process.on('SIGINT', async () => {
  console.log('Fermeture du producteur et du consommateur Kafka...');
  await disconnectProducer();
  await disconnectConsumer();
  process.exit(0);
});
  
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
