from db import Banco_dados    # Importa o módulo de banco de dados

meu_db = Banco_dados('nfe.db') # Cria uma instância do banco de dados

def nota_completa(notas, produtos):
    #lista com notas e seus produtos
    nota_completa = []
    #looping em notas
    for nota in notas:
        chave = nota[0]
        #looping em produtos, onde produtos_nota vai assumir o valor de um array com os seguintes indices: 0-item, 1-chave_nota, 2-descricao_produto, 3-quantidade, 4-valor_unitario, 5-valor_total - somente se o produto tiver a chave_nota igual a chave da nota atual.
        produtos_nota = [produto for produto in produtos if produto[1] == chave]
        #cada nota é um array com os seguintes indices: 0-chave, 1-numero, 2-valor_total, 3-cnpj_emitente, 4-cnpj_destinatario, 5-razao_social, 6-data_dia, 7-data_hora
        nota_completa.append({
            "chave": nota[0],
            "numero": nota[1],
            "valor_total": nota[2],
            "cnpj_emitente": nota[3],
            "cnpj_destinatario": nota[4],
            "razao_social": nota[5],
            "data_dia": nota[6],
            "data_hora": nota[7],
            "produtos": [{
                "item": produto[0],
                "descricao_produto": produto[2],
                "quantidade": produto[3],
                "valor_unitario": produto[4],
                "valor_total": produto[5]
            } for produto in produtos_nota]
        })
    return nota_completa

async def crud_ler():
    try:
        ##conexao com db
        conexao = meu_db.conectar()
        ##cursor para manipular banco
        cursor = conexao.cursor()
        ##executa consulta 
        cursor.execute("SELECT * FROM notas")
        ##resgata valores e fecha cursor
        notas = cursor.fetchall()
        cursor.execute("SELECT * FROM produtos")
        produtos = cursor.fetchall()
        cursor.close()

        return nota_completa(notas, produtos)
    except Exception as e:
        return {"message": "Erro ao buscar notas", "error": str(e)}
    
async def crud_delete(chave: str):
    try:
        #conexão
        conexao = meu_db.conectar()
        cursor = conexao.cursor()
        #execução sql
        cursor.execute("DELETE FROM notas WHERE chave = ?", (chave,))
        cursor.execute("DELETE FROM produtos WHERE chave_nota = ?", (chave,))
        #salva no banco
        conexao.commit()
        #retorna delete
        return {"message": "Nota deletada com sucesso"}
    except Exception as e:
        return {"message": "Erro ao deletar nota", "error": str(e)}
    
async def crud_ler_razao_social(razao_social: str):
        try:
            #conexão
            conexao = meu_db.conectar()
            cursor = conexao.cursor()
            #execução sql
            #parametro LIKE busca por similaridade, o % é um coringa que representa qualquer sequência de caracteres antes ou depois da razão social
            cursor.execute("SELECT * FROM notas WHERE razao_social LIKE ?", (f"%{razao_social}%",)) 
            #resgata valores e fecha cursor
            notas = cursor.fetchall()
            cursor.execute("SELECT * FROM produtos")
            produtos = cursor.fetchall()
            cursor.close()

            return nota_completa(notas, produtos)
        except Exception as e:
            return {"message": "Erro ao buscar notas", "error": str(e)}
        
async def crud_ler_data(dataInicial: str, dataFinal: str):
    try:
        #conexão
        conexao = meu_db.conectar()
        cursor = conexao.cursor()

        #execução sql
        cursor.execute("SELECT * FROM notas WHERE data_dia BETWEEN ? AND ?", (dataInicial, dataFinal))
        #resgata valores e fecha cursor
        notas = cursor.fetchall()
        cursor.execute("SELECT * FROM produtos")
        produtos = cursor.fetchall()
        cursor.close()

        return nota_completa(notas, produtos)
    except Exception as e:
        return {"message": "Erro ao conectar ao banco de dados", "error": str(e)}

async def crud_ler_numero(numero: str):  
    try:
        #conexão
        conexao = meu_db.conectar()
        cursor = conexao.cursor()
        #execução sql
        #parametro LIKE busca por similaridade, o % é um coringa que representa qualquer sequência de caracteres antes ou depois da razão social
        cursor.execute("SELECT * FROM notas WHERE numero = ?", (f"{numero}",)) 
        #resgata valores e fecha cursor
        notas = cursor.fetchall()
        cursor.execute("SELECT * FROM produtos")
        produtos = cursor.fetchall()
        cursor.close()

        return nota_completa(notas, produtos)
    except Exception as e:
        return {"message": "Erro ao buscar notas", "error": str(e)}  