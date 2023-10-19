from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from flask import Flask, jsonify
import requests

app = Flask(__name__)

# Configuration de Cassandra
cassandra_config = {
    'contact_points': ['127.0.0.1'],
    'auth_provider': PlainTextAuthProvider(username='loic', password='test1234')
}

cluster = Cluster(**cassandra_config)
default_keyspace = 'tdat901'
session = cluster.connect(default_keyspace)

@app.route('/api_bdd/check_cassandra_connection', methods=['GET'])
def check_cassandra_connection():
    try:
        # Utiliser la session globale définie lors de la configuration
        result = session.execute("SELECT release_version FROM system.local").one()

        return jsonify({'message': f'Connexion à Cassandra réussie. Version: {result.release_version}'})
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la connexion à Cassandra : {str(e)}'}), 500

# Routes de l'API Flask
@app.route('/api_bdd/enregistrer_donnees', methods=['GET'])
def enregistrer_donnees():
    try:
        # Récupérer les données depuis le serveur Node.js
        top_trending_data = requests.get('http://localhost:11003/api_back/cryptos/top-trending').json()
        top_gainers_data = requests.get('http://localhost:11003/api_back/cryptos/top-gainers').json()
        total_mining_data = requests.get('http://localhost:11003/api_back/cryptos/total-mining').json()

        # Enregistrer les données dans Cassandra
        enregistrer_donnees_cassandra('top_trending', top_trending_data)
        enregistrer_donnees_cassandra('top_gainers', top_gainers_data)
        enregistrer_donnees_cassandra('total_mining', total_mining_data)

        return jsonify({'message': 'Données enregistrées avec succès'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def enregistrer_donnees_cassandra(table_name, data):
    # Utiliser la session globale définie lors de la configuration
    session.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ("
                    "id UUID PRIMARY KEY, "
                    "image TEXT, "
                    "name TEXT, "
                    "symbol TEXT, "
                    "price FLOAT, "  # Change the type to FLOAT
                    "marketperformance FLOAT, "
                    "market_cap FLOAT, "
                    "totalmining FLOAT, "
                    "blockreward FLOAT"
                    ")")

    # Insérer les données dans la table
    for entry in data:
        # Clean up the 'price' value, removing '$' and spaces
        price_raw = entry.get('price')
        cleaned_price = price_raw.replace('$', '').replace(' ', '') if price_raw else None

        try:
            # Try to convert the cleaned 'price' to float
            price_value = float(cleaned_price)
        except (ValueError, TypeError):
            # Handle the case where conversion to float is not possible
            price_value = None  # or any default value you prefer

        # Clean up the 'marketperformance' value, removing non-numeric characters
        marketperformance_raw = entry.get('marketperformance')

        if marketperformance_raw is not None:
            cleaned_marketperformance = ''.join(char for char in str(marketperformance_raw) if char.isdigit() or char == '.')

            try:
                # Try to convert the cleaned 'marketperformance' to float
                marketperformance_value = float(cleaned_marketperformance)
            except (ValueError, TypeError):
                # Handle the case where conversion to float is not possible
                marketperformance_value = None  # or any default value you prefer
        else:
            # Handle the case where 'marketperformance' is None
            marketperformance_value = None

        # Clean up the 'market_cap' value, removing non-numeric characters
        market_cap_raw = entry.get('market_cap')

        if market_cap_raw is not None:
            cleaned_market_cap = ''.join(char for char in str(market_cap_raw) if char.isdigit() or char == '.')

            try:
                # Try to convert the cleaned 'market_cap' to float
                market_cap_value = float(cleaned_market_cap)
            except (ValueError, TypeError):
                # Handle the case where conversion to float is not possible
                market_cap_value = None  # or any default value you prefer
        else:
            # Handle the case where 'market_cap' is None
            market_cap_value = None

        session.execute(
            f"INSERT INTO {table_name} (id, image, name, symbol, price, marketperformance, market_cap, totalmining, blockreward) "
            "VALUES (uuid(), %s, %s, %s, %s, %s, %s, %s, %s)",
            (
                entry.get('image'),
                entry.get('name'),
                entry.get('symbol'),
                price_value,
                marketperformance_value,
                market_cap_value,
                entry.get('totalmining'),
                entry.get('blockreward'),
            ),
        )

if __name__ == '__main__':
    app.run(port=11002)
