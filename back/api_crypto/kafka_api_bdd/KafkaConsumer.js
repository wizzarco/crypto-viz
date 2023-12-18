// KafkaConsumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'Api_bdd_back_consumer',
  brokers: ['kafka-server3:9092']
});

const consumer = kafka.consumer({ groupId: 'api-bdd-group' });

const connectConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'api_bdd_cryptoviz', fromBeginning: true });
};

const consumeMessages = async (callback) => {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      callback(data);
    },
  });
};

const disconnectConsumer = async () => {
  await consumer.disconnect();
};

module.exports = { connectConsumer, consumeMessages, disconnectConsumer };