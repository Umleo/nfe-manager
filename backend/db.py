import sqlite3

class Banco_dados:
    ##iniciando o banco
    def __init__(self, nome_banco):
        self.banco = nome_banco
        self.criar_tabelas()

    def conectar(self):
        return sqlite3.connect(self.banco)

    def criar_tabelas(self):
        with self.conectar() as con:

            cursor = con.cursor()

            # Tabela principal de Notas
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS notas (
                    chave TEXT PRIMARY KEY,
                    numero INTEGER,
                    valor_total REAL,
                    cnpj_emitente TEXT,
                    cnpj_destinatario TEXT,
                    razao_social TEXT,
                    data_dia TEXT,
                    data_hora TEXT
                )
            ''')

            # Tabela de Produtos (Relacionada)
            # Cada produto aponta para a chave da nota a que pertence
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS produtos (
                    item INTEGER,
                    chave_nota TEXT,                 
                    descricao_produto TEXT,             
                    quantidade INTEGER,                  
                    valor_unitario REAL,                  
                    valor_total REAL,                    
                    FOREIGN KEY (chave_nota) REFERENCES notas (chave)
                )
            ''')
            
            cursor.close()

    ##ações do gui para salvar no banco de dados
    def inserir_nota(self, nota):
        try:
            with self.conectar() as con:
                cursor = con.cursor()
                cursor.execute('''
                    INSERT OR IGNORE INTO notas VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', nota)
                con.commit()
                return cursor.rowcount > 0
        except Exception as e:
            print(f"Erro ao salvar nota: {e}")
            return False
        
    def inserir_produto(self, produto):
        try:
            with self.conectar() as con:
                cursor = con.cursor()
                cursor.execute('''
                    INSERT INTO produtos VALUES (?, ?, ?, ?, ?, ?)
                ''', produto)
                con.commit()
                return True
        except Exception as e:
            print(f"Erro ao salvar produto: {e}")
            return False
        
    


##db = Banco_dados()
##db.criar_tabelas()