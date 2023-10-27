-- Création du keyspace
CREATE KEYSPACE IF NOT EXISTS tdat901 WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- Utilisation du keyspace
USE tdat901;

-- Création de l'utilisateur
CREATE ROLE IF NOT EXISTS loic WITH PASSWORD = 'test1234' AND LOGIN = true AND SUPERUSER = true;

-- Attribution des autorisations sur le keyspace
GRANT ALL PERMISSIONS ON KEYSPACE tdat901 TO loic;