from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from flask import Flask, jsonify
import requests

app = Flask(__name__)

# Configuration de Cassandra
cassandra_config = {
    'contact_points': ['127.0.0.1'],  # Remplacez par les adresses IP de vos nœuds Cassandra
    'auth_provider': PlainTextAuthProvider(username='loic', password='test1234')  # Remplacez par votre authentification Cassandra
}

cluster = Cluster(**cassandra_config)
session = cluster.connect('votre_keyspace')  # Remplacez par le nom de votre keyspace

# Routes de l'API Flask
@app.route('/api/enregistrer_donnees', methods=['GET'])
def enregistrer_donnees():
    try:
        # Récupérer les données depuis le serveur Node.js
        top_trending_data = requests.get('http://localhost:3000/api/cryptos/top-trending').json()
        top_gainers_data = requests.get('http://localhost:3000/api/cryptos/top-gainers').json()
        total_mining_data = requests.get('http://localhost:3000/api/cryptos/total-mining').json()

        # Enregistrer les données dans Cassandra
        enregistrer_donnees_cassandra('top_trending', top_trending_data)
        enregistrer_donnees_cassandra('top_gainers', top_gainers_data)
        enregistrer_donnees_cassandra('total_mining', total_mining_data)

        return jsonify({'message': 'Données enregistrées avec succès'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def enregistrer_donnees_cassandra(table_name, data):
    # Créer la table si elle n'existe pas
    session.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ("
                    "id UUID PRIMARY KEY, "
                    "image TEXT, "
                    "name TEXT, "
                    "symbol TEXT, "
                    "price FLOAT, "
                    "marketperformance FLOAT, "
                    "market_cap FLOAT, "
                    "totalmining FLOAT, "
                    "blockreward FLOAT"
                    ")")

    # Insérer les données dans la table
    for entry in data:
        session.execute(f"INSERT INTO {table_name} (id, image, name, symbol, price, marketperformance, market_cap, totalmining, blockreward) "
                        "VALUES (uuid(), %s, %s, %s, %s, %s, %s, %s, %s)",
                        (entry.get('image'), entry.get('name'), entry.get('symbol'),
                         entry.get('price'), entry.get('marketperformance'), entry.get('market_cap'),
                         entry.get('totalmining'), entry.get('blockreward')))

if __name__ == '__main__':
    app.run(port=5000) 
