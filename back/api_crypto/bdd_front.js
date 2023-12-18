const express = require('express');
const cors = require('cors');
const { Client } = require('cassandra-driver');

const app = express();
const port = process.env.PORT || 11004;

app.use(express.json());
app.use(cors());

// Configurer la connexion à Cassandra
const client = new Client({
    contactPoints: ['host.docker.internal'],
    localDataCenter: 'dc1',
    keyspace: 'tdat901',
    credentials: { username: 'loic', password: 'test1234' },
});

// Se connecter à Cassandra
client.connect()
    .then(() => console.log('Connecté à Cassandra'))
    .catch(err => console.error('Erreur de connexion à Cassandra', err));

// Endpoint pour récupérer des données depuis Cassandra
app.get('/api_front/cryptos/:table', async (req, res) => {
    const { table } = req.params;
    try {
        const result = await client.execute(`SELECT * FROM ${table}`);
        res.json(result.rows);
    } catch (error) {
        console.error(`Erreur lors de la récupération des données depuis ${table} :`, error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});