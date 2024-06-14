import json
import sqlite3

# Caminho para o arquivo JSON
json_file_path = 'public/produtos.json'

# Função para ler o arquivo JSON
def read_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

# Função para conectar ao banco de dados
def connect_to_db(db_name='backend/database.db'):
    return sqlite3.connect(db_name)

# Função para criar a tabela de produtos no banco de dados
def create_table_produtos(conn):
    with conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                codigo INTEGER,
                nome TEXT NOT NULL,
                estoque_atual INTEGER DEFAULT 0,
                EAN STRING
            )
        ''')

# Função para criar a tabela de contagens no banco de dados
def create_table_contagens(conn):
    with conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS contagens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                codigo_produto INTEGER,
                quantidade_contada INTEGER,
                data_contagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (codigo_produto) REFERENCES produtos(codigo)
            )
        ''')

# Função para inserir os produtos no banco de dados
def insert_produtos(conn, produtos):
    with conn:
        for produto in produtos:
            # Convertendo o código para inteiro
            codigo = int(produto['codigo'])
            conn.execute('''
                INSERT OR IGNORE INTO produtos (codigo, nome) VALUES (?, ?)
            ''', (codigo, produto['nome']))

# Lê o arquivo JSON
produtos = read_json(json_file_path)

# Conecta ao banco de dados
conn = connect_to_db()

# Cria a tabela de produtos
create_table_produtos(conn)

# Cria a tabela de contagens
create_table_contagens(conn)

# Insere os produtos no banco de dados
insert_produtos(conn, produtos)

# Fecha a conexão com o banco de dados
conn.close()

print("Produtos inseridos com sucesso!")
