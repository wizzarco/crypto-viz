const express = require('express');
const cors = require('cors'); // Importez le module cors
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

app.get('/api/cryptos', async (req, res) => {
  try {
    const apiKey = 'E78147AA-2CF7-46C8-BFE0-50C5227EEA44'; // Remplacez par votre clé API CoinGecko
    const response = await axios.get('https://rest.coinapi.io/v1/assets', {
      params: {
        apikey: apiKey,
        limit: 10,
      },
    });

    const cryptocurrencies = response.data.map(crypto => ({
      name: crypto.name,
      symbol: crypto.asset_id,
      price: crypto.price_usd,
      market_cap: crypto.market_cap_usd,
    }));

    res.json(cryptocurrencies);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
