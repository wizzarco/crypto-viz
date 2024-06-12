from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import threading
import time
from datetime import datetime
from flask import Flask, jsonify, request
import requests
from confluent_kafka import Consumer, KafkaException, Producer

app = Flask(__name__)

# Configuration Kafka
kafka_config = {
    'bootstrap.servers': 'kafka-server2:9092'
}

# Créer un producteur Kafka
kafka_producer = Producer(kafka_config)

def delivery_report(err, msg):
    if err is not None:
        print(f'Message non envoyé: {err}')
    else:
        print(f'Message envoyé à {msg.topic()} [{msg.partition()}]')

# Fonction pour envoyer des messages au topic Kafka
def send_kafka_message(topic, message):
    try:
        kafka_producer.produce(topic, message, callback=delivery_report)
        kafka_producer.poll(0)
    except Exception as e:
        print(f'Erreur lors de l\'envoi du message Kafka: {e}')

def create_kafka_consumer(topic):
    consumer_config = {
        'bootstrap.servers': 'kafka-server2:9092',
        'group.id': 'savebdd-group',
        'auto.offset.reset': 'earliest'
    }
    consumer = Consumer(consumer_config)
    consumer.subscribe([topic])

    try:
        while True:
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaException._PARTITION_EOF:
                    continue
                else:
                    print(msg.error())
                    break
            print(f'Message reçu: {msg.value().decode("utf-8")}')
    finally:
        consumer.close()

# Configuration de Cassandra
cassandra_config = {
    'contact_points': ['host.docker.internal'],
    'auth_provider': PlainTextAuthProvider(username='loic', password='test1234')
}

cluster = Cluster(**cassandra_config)
default_keyspace = 'tdat901'
session = cluster.connect(default_keyspace)

# Route pour vérifer la connection à la base de données
@app.route('/api_bdd/check_cassandra_connection', methods=['GET'])
def check_cassandra_connection():
    try:
        # Utiliser la session globale définie lors de la configuration
        result = session.execute("SELECT release_version FROM system.local").one()
        message = f'Connexion à Cassandra réussie. Version: {result.release_version}'
        send_kafka_message('save_bdd', message)
        return jsonify({'message': message})
    except Exception as e:
        error_message = f'Erreur lors de la connexion à Cassandra : {str(e)}'
        send_kafka_message('save_bdd', error_message)
        return jsonify({'error': error_message}), 500

# Route pour sauvegarder les crypto-monnaies
@app.route('/api_bdd/enregistrer_donnees_cryptocurrency', methods=['GET'])
def enregistrer_donnees_cryptocurrency():
    try:
        total_pages = 159  # Nombre total de pages à itérer
        for page in range(1, total_pages + 1):
            response = requests.get(f'http://host.docker.internal:11003/api_back/cryptos/all-cryptocurrency?page={page}')
            if response.status_code != 200:
                error_message = f'Erreur lors de la récupération des données pour la page {page}'
                send_kafka_message('save_bdd', error_message)
                return jsonify({'error': error_message}), response.status_code
            
            crypto_currency_data = response.json()
            enregistrer_donnees_cassandra_all('crypto_currency_all', crypto_currency_data)

        success_message = 'Toutes les pages ont été enregistrées avec succès pour les cryptocurrency'
        send_kafka_message('save_bdd', success_message)
        return jsonify({'message': success_message})
    except Exception as e:
        error_message = f'Erreur lors de l\'enregistrement des données: {e}'
        send_kafka_message('save_bdd', error_message)
        return jsonify({'error': str(e)}), 500

def enregistrer_donnees_cassandra_all(table_name, data):
    session.execute(f"""
        CREATE TABLE IF NOT EXISTS {table_name} (
            id UUID PRIMARY KEY,
            image TEXT,
            symbol TEXT,
            fullname TEXT,
            maxsupply FLOAT,
            top24h FLOAT,
            price FLOAT,
            lastvolume FLOAT,
            volumehour FLOAT,
            volumeday FLOAT,
            volume24h FLOAT,
            record_date DATE,
            record_time TIME
        )
    """)

    for entry in data:
        current_date = datetime.now().date()
        current_time = datetime.now().time()

        maxsupply_value = try_convert_float(entry.get('maxsupply'))
        top24h_value = try_convert_float(entry.get('top24h'))
        price_value = try_convert_float(entry.get('price'))
        lastvolume_value = try_convert_float(entry.get('lastvolume'))
        volumehour_value = try_convert_float(entry.get('volumehour'))
        volumeday_value = try_convert_float(entry.get('volumeday'))
        volume24h_value = try_convert_float(entry.get('volume24h'))

        session.execute(f"""
            INSERT INTO {table_name} (
                id, image, symbol, fullname, maxsupply, top24h, price, lastvolume, volumehour, volumeday, volume24h, record_date, record_time
            ) VALUES (
                uuid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
            )""",
            (
                entry.get('image'),
                entry.get('symbol'),
                entry.get('fullname'),
                maxsupply_value,
                top24h_value,
                price_value,
                lastvolume_value,
                volumehour_value,
                volumeday_value,
                volume24h_value,
                current_date,
                current_time
            )
        )

def try_convert_float(value, default=0.0):
    try:
        return float(value)
    except ValueError:
        return default

# Routes de l'API Flask
@app.route('/api_bdd/enregistrer_donnees_top', methods=['GET'])
def enregistrer_donnees():
    try:
        # Récupérer les données depuis le serveur Node.js
        top_trending_data = requests.get('http://host.docker.internal:11003/api_back/cryptos/top-trending').json()
        top_gainers_data = requests.get('http://host.docker.internal:11003/api_back/cryptos/top-gainers').json()
        total_mining_data = requests.get('http://host.docker.internal:11003/api_back/cryptos/total-mining').json()
 
        # Enregistrer les données dans Cassandra
        success_messages = []

        # Ajouter les messages de succès à la liste
        success_messages.append(enregistrer_donnees_cassandra('top_trending', top_trending_data))
        success_messages.append(enregistrer_donnees_cassandra('top_gainers', top_gainers_data))
        success_messages.append(enregistrer_donnees_cassandra('total_mining', total_mining_data))

        # Joindre tous les messages en une seule chaîne de caractères
        final_message = ' '.join([msg for msg in success_messages if msg])

        send_kafka_message('save_bdd', f'Données top trending, top gainers, et total mining enregistrées avec succès: {final_message}')
        return jsonify({'message': 'Données enregistrées avec succès'})

    except Exception as e:
        send_kafka_message('save_bdd', f'Erreur lors de l\'enregistrement des données top: {e}')
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
        if not isinstance(entry, dict):
            continue
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

# Update les données automatiquement
def connexion_cassandra():
    while True:
        try:
            requests.get('http://host.docker.internal:11002/api_bdd/check_cassandra_connection')

        except Exception as e:
            print(f"Erreur lors de la connexion à la base de données : {e}")
        
        time.sleep(300)

def update_data_top():
    while True:
        try:
            requests.get('http://host.docker.internal:11002/api_bdd/enregistrer_donnees_top')

        except Exception as e:
            print(f"Erreur lors de la mise à jour des données : {e}")

        time.sleep(120)
    
def update_data_all():
    while True:
        try:
            requests.get('http://host.docker.internal:11002/api_bdd/enregistrer_donnees_cryptocurrency')

        except Exception as e:
            print(f"Erreur lors de la mise à jour des données : {e}")

        time.sleep(120)

if __name__ == '__main__':
    update_thread = threading.Thread(target=connexion_cassandra)
    update_thread.start()

    update_thread = threading.Thread(target=update_data_top)
    update_thread.start()

    update_thread = threading.Thread(target=update_data_all)
    update_thread.start()

    app.run(host='0.0.0.0', port=11002)