import sqlite3

def update_product_ean(db_path, codigo, new_ean):
    try:
        # Conectando ao banco de dados SQLite
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Comando SQL para atualizar o campo 'EAN' do produto com 'codigo' igual a 2
        sql_update_query = """UPDATE produtos SET EAN = ? WHERE codigo = ?"""
        
        # Executando o comando SQL
        cursor.execute(sql_update_query, (new_ean, codigo))
        
        # Confirmando a transação
        conn.commit()
        
        if cursor.rowcount > 0:
            print(f"Registro atualizado com sucesso. Codigo: {codigo}, Novo EAN: {new_ean}")
        else:
            print(f"Nenhum registro encontrado com o codigo {codigo}.")
        
    except sqlite3.Error as error:
        print("Erro ao atualizar o registro:", error)
        
    finally:
        # Fechando a conexão com o banco de dados
        if conn:
            conn.close()
            print("Conexão com SQLite fechada")

# Especificando o caminho do banco de dados e os valores
db_path = 'database.db'
codigo = 2
new_ean = '7896523202822'

# Chamando a função para atualizar o produto
update_product_ean(db_path, codigo, new_ean)
