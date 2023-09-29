const cassandra = require('cassandra-driver');
const crypto = require('crypto-js');

// Configuration pour la connexion à Cassandra
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], // Mettez à jour avec l'adresse IP de votre serveur Cassandra
  localDataCenter: 'datacenter1',
  keyspace: 'tdat901', // Mettez à jour avec le nom de votre keyspace
});

// Fonction pour récupérer des données de la base de données
async function getData() {
  const query = 'SELECT * FROM TABKE_A_CREER;';
  try {
    const result = await client.execute(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    throw error;
  }
}

// Fonction pour traiter les données (exemple : chiffrement)
function processCrypto(data) {
  // Votre logique de traitement Crypto ici
  // Exemple : Chiffrement de chaque valeur dans la colonne 'valeur'
  data.forEach(row => {
    row.valeur = crypto.AES.encrypt(row.valeur.toString(), 'C135usnywHxeHyw9Y0Sshhcy8mBeszMxl2goehycPbhaUxiBSyV3LuS4qhGn1Qc').toString();
  });
  return data;
}

// Fonction principale
async function main() {
  try {
    // Connexion à Cassandra
    await client.connect();
    console.log('Connecté à Cassandra');

    // Récupération des données
    const data = await getData();
    console.log('Données récupérées :', data);

    // Traitement des données
    const processedData = processCrypto(data);
    console.log('Données traitées :', processedData);
  } catch (error) {
    console.error('Erreur lors de l\'exécution du script :', error);
  } finally {
    // Fermeture de la connexion à Cassandra
    await client.shutdown();
  }
}

// Exécution de la fonction principale
main();
