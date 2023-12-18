// KafkaConsumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'Server_back_consumer',
  brokers: ['kafka-server1:9092']
});

const consumer = kafka.consumer({ groupId: 'server-group' });

const connectConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'server_crytpoviz', fromBeginning: true });
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