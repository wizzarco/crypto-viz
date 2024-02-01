const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'Frontend_vuejs_consumer',
  brokers: ['kafka-server1:9092']
});

const consumer = kafka.consumer({ groupId: 'front-end-group' });

const run = async () => {
  // Connexion au consommateur
  await consumer.connect();

  // S'abonner au topic
  await consumer.subscribe({ topic: 'front_cryptoviz', fromBeginning: true });

  // Écouter les messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
