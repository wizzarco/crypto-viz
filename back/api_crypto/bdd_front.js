const express = require('express');
const cors = require('cors');
const { Client } = require('cassandra-driver');
// const { connectProducer, sendToKafka, disconnectProducer } = require('./kafka_api_bdd/KafkaProducer');
// const { connectConsumer, consumeMessages, disconnectConsumer } = require('./kafka_api_bdd/KafkaConsumer');

const app = express();
const port = process.env.PORT || 11004;

app.use(express.json());
app.use(cors());

// Configurer la connexion à Cassandra
const client = new Client({
    // contactPoints: ['host.docker.internal'],
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'dc1',
    keyspace: 'tdat901',
    credentials: { username: 'loic', password: 'test1234' },
});

// Se connecter à Cassandra
client.connect().then(() => console.log('Connecté à Cassandra')).catch(err => console.error('Erreur de connexion à Cassandra', err));
// connectProducer().then(() => console.log('Producteur Kafka connecté')).catch(e => console.error('Erreur de connexion du producer Kafka:', e));

app.get('/api_front/cryptos/:table', async (req, res) => {
    const { table } = req.params;
    try {
        const result = await client.execute(`SELECT * FROM ${table}`);
        // await sendToKafka('api_bdd_cryptoviz', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error(`Erreur lors de la récupération des données depuis ${table} :`, error);
        // await sendToKafka('api_bdd_cryptoviz', { error: error.message, table });
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.get('/api_front/crypto_currency_all/all', async (req, res) => {
    try {
        const symbol = req.query.symbol;
        let query;

        if (symbol) {
            // Utilisez ALLOW FILTERING avec prudence
            query = `SELECT * FROM crypto_currency_all WHERE symbol = ? ALLOW FILTERING`;
        } else {
            query = `SELECT * FROM crypto_currency_all`;
        }

        const result = await client.execute(query, symbol ? [symbol] : []);

    //   for (const row of result.rows) {
    //       await sendToKafka('api_bdd_cryptoviz', row);
    //   }

        res.json(result.rows);
    } catch (error) {
        console.error(`Erreur lors de la récupération des données depuis crypto_currency_all :`, error);
    //   await sendToKafka('api_bdd_cryptoviz', { error: error.message, table: 'crypto_currency_all' });
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// // Démarrage et utilisation du Consommateur Kafka
// connectConsumer().then(() => {
//     console.log('Consommateur Kafka connecté');
//     consumeMessages((data) => {
//       console.log('Message reçu:', data);
//       // Traitez ici les données reçues de Kafka
//     });
//   }).catch(e => console.error('Erreur de connexion du consommateur Kafka:', e));
  
//   // Assurez-vous de déconnecter le producteur et le consommateur lors de l'arrêt du serveur
//   process.on('SIGINT', async () => {
//     console.log('Fermeture du producteur et du consommateur Kafka...');
//     await disconnectProducer();
//     await disconnectConsumer();
//     client.shutdown();
//     process.exit(0);
//   });

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});