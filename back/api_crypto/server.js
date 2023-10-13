const express = require('express');
const cors = require('cors'); // Importez le module cors
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

// ... (autres importations)

app.get('/api/cryptos/top-trending', async (req, res) => {
try {
    const apiKey = 'CG-dM9mQcvNb2ePFwDss4Mip7Pi';
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=gecko_desc&page=1&per_page=3&sparkline=false&locale=en', {
        params: {
            apikey: apiKey,
        },
    });

    const topTrendingCryptos = response.data.map(crypto => ({
        image: crypto.image,
        name: crypto.name,
        symbol: crypto.symbol,
        price: crypto.current_price,
        market_cap: crypto.market_cap,
    }));

    res.json(topTrendingCryptos);
} catch (error) {
    console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Erreur lors de la récupération des données' });
}
});

app.get('/api/cryptos/top-gainers', async (req, res) => {
    try {
        const apiKey = 'CG-dM9mQcvNb2ePFwDss4Mip7Pi';
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=price_change_percentage_24h&page=1&per_page=3&sparkline=false&locale=en', {
            params: {
                apikey: apiKey,
            },
        });

        const topGainersCryptos = response.data.map(crypto => ({
            image: crypto.image,
            name: crypto.name,
            symbol: crypto.symbol,
            price: crypto.current_price,
            market_cap: crypto.market_cap,
        }));

        res.json(topGainersCryptos);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

app.get('/api/cryptos/recently-added', async (req, res) => {
    try {
        const apiKey = 'CG-dM9mQcvNb2ePFwDss4Mip7Pi';
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=date_added&page=1&per_page=3&sparkline=false&locale=en', {
            params: {
                apikey: apiKey,
            },
        });

        const recentlyAddedCryptos = response.data.map(crypto => ({
            image: crypto.image,
            name: crypto.name,
            symbol: crypto.symbol,
            price: crypto.current_price,
            market_cap: crypto.market_cap,
        }));

        res.json(recentlyAddedCryptos);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Erreur lors de la récupération des données' });
    }
});  

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
