import tkinter as tk                 # Importa a biblioteca Tkinter
from tkinter import filedialog       # Importa o módulo de janela de seleção de arquivos.
from tkinter import messagebox       # Importa caixas de mensagem (erro, aviso, info).
from pathlib import Path             # Importa Path para manipular caminhos
import xml.etree.ElementTree as ET   # Importa ElementTree para ler arquivos XML
import re #regex
from db import Banco_dados as db_class     # Importa o módulo de banco de dados

meu_db = db_class() # Cria uma instância do banco de dados

home = Path.home()  # Obtém o diretório home do usuário

def selecionar_arquivo():            # Define a função que será executada ao clicar no botão.
    arquivos = filedialog.askopenfilenames(
        initialdir=home
    )  # Abre a janela através do filedialog para o usuário escolher um arquivo.

    for xml in arquivos: # Itera sobre os arquivos selecionados (caso o usuário tenha selecionado mais de um).   
        if xml.endswith('.xml'): # Verifica se o arquivo tem a extensão .xml
            # 1. Abrimos o arquivo em modo de leitura ('r') com encoding utf-8
            with open(xml, 'r', encoding='utf-8') as arquivo:
            # 2. Lemos o conteúdo total
                conteudo = arquivo.read()

                root = ET.fromstring(conteudo)
                ns = {"nfe": "http://www.portalfiscal.inf.br/nfe"}

                try: 
                    ##Dados da nota
                    numero = root.find(".//nfe:nNF", ns)
                    valor = root.find(".//nfe:vNF", ns)
                    emit_cnpj = root.find(".//nfe:emit/nfe:CNPJ", ns)
                    dest_cnpj = root.find(".//nfe:dest/nfe:CNPJ", ns)
                    razao_social = root.find(".//nfe:emit/nfe:xNome", ns) 
                    data = root.find(".//nfe:ide/nfe:dhEmi", ns) 

                    ##regex para filtrar apenas o dias
                    data_match = re.match(r"^(\d{4}-\d{2}-\d{2})", data.text)
                    data_dia = data_match.group(1) if data_match else ""

                    ##regex para filtrar apenas a hora
                    data_match = re.search(r"T(\d{2}:\d{2}:\d{2})", data.text)
                    data_hora = data_match.group(1) if data_match else ""

                    chave = root.find(".//nfe:chNFe", ns)

                except Exception as e:
                    print(f"Erro ao processar o arquivo {xml}: {e}")
                    messagebox.showerror("Erro", f"Erro ao processar o arquivo {xml}. Verifique se é um XML de NFE válido.")  # Exibe uma mensagem de erro se o arquivo não for XML.
                    continue

                id_produ = 0
                ##salvar no banco de dados
                salvo_nfe = meu_db.inserir_nota((chave.text, numero.text, valor.text, emit_cnpj.text, dest_cnpj.text, razao_social.text, data_dia, data_hora))
                if salvo_nfe:
                    print(f"Nota {chave.text} inserida com sucesso!")
                    for item in root.findall(".//nfe:det", ns):
                        id_produ += 1
                        # Buscamos as informações dentro da tag <prod> de cada <det>
                        descricao = item.find(".//nfe:prod/nfe:xProd", ns).text
                        quantidade = item.find(".//nfe:prod/nfe:qCom", ns).text
                        valor_unitario = item.find(".//nfe:prod/nfe:vUnCom", ns).text
                        valor_total_prod = item.find(".//nfe:prod/nfe:vProd", ns).text

                    ##Produtos da nota
                        meu_db.inserir_produto((id_produ, chave.text, descricao, quantidade, valor_unitario, valor_total_prod))
                else:
                    print(f"Nota {chave.text} já existe no banco de dados ou ocorreu um erro.")
                    messagebox.showerror("Erro", f"Nota {numero.text} já existe no banco de dados.")  # Exibe uma mensagem de erro se o arquivo não for XML.

        else:
            messagebox.showerror("Erro", "Por favor, selecione um arquivo XML válido.")  # Exibe uma mensagem de erro se o arquivo não for XML.
                

# Interface                          
janela = tk.Tk()                       # Cria a janela principal da aplicação.
janela.title("Upload de Arquivo")      # Define o título da janela.
janela.geometry("300x100")            # Define o tamanho da janela (largura x altura).

botao = tk.Button(janela, text="Selecionar Arquivo", command=selecionar_arquivo, padx=50, pady=15)  # Cria o botão e passa a função.
botao.pack(padx=30, pady=30)         # Posiciona o botão na janela com espaçamento horizontal e vertical.

janela.mainloop()                      # Inicia o loop da interface (mantém a janela aberta e respondendo a eventos).

print("GUI iniciada. Selecione um arquivo para copiar para a pasta /temp.")  # Exibe mensagem no terminal após fechar a GUI.