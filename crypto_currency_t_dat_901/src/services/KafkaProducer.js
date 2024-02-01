const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'Frontend_vuejs_producer',
  brokers: ['kafka-server1:9092'] 
});

const producer = kafka.producer();

const sendMessage = async (topic, message) => {
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }],
    });
    await producer.disconnect();
};

// Exemple d'envoi d'un message structuré
const ConnexionMessage = {
    type: 'Connexion kafka',
    content: 'Le front-end est allumé et connecté à kafka',
    timestamp: new Date()
};

sendMessage('front_cryptoviz', ConnexionMessage).catch(console.error);
