// KafkaProducer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'Server_back_producer',
  brokers: ['kafka-server2:9092']
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
