// KafkaProducer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'Server_back_producer',
  brokers: ['kafka-server1:9092'] // Adaptez selon vos brokers Kafka
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const sendToKafka = async (topic, data) => {
  await producer.send({
    topic,
    messages: [
      { value: JSON.stringify(data) },
    ],
  });
};

const disconnectProducer = async () => {
  await producer.disconnect();
};

module.exports = { connectProducer, sendToKafka, disconnectProducer };
