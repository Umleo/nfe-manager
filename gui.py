import tkinter as tk                 # Importa a biblioteca Tkinter
from tkinter import filedialog       # Importa o módulo de janela de seleção de arquivos.
from tkinter import messagebox       # Importa caixas de mensagem (erro, aviso, info).
from pathlib import Path             # Importa Path para manipular caminhos
import xml.etree.ElementTree as ET   # Importa ElementTree para ler arquivos XML
import re #regex
from backend.db import Banco_dados    # Importa o módulo de banco de dados

meu_db = Banco_dados("backend/nfe.db") # Cria uma instância do banco de dados

db_path = Path("backend/nfe.db")
if db_path.exists():
    pass
else:
    meu_db.criar_tabelas()
    
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
                    ##Dados da nota (opcionais - retornam "" se não existirem)
                    numero = root.find(".//nfe:nNF", ns) 
                    numero_text = numero.text if numero is not None else ""
                    
                    valor = root.find(".//nfe:vNF", ns) 
                    valor_text = valor.text if valor is not None else ""
                    
                    emit_cnpj = root.find(".//nfe:emit/nfe:CNPJ", ns) 
                    emit_cnpj_text = emit_cnpj.text if emit_cnpj is not None else ""
                    
                    dest_cnpj = root.find(".//nfe:dest/nfe:CNPJ", ns)
                    dest_cnpj_text = dest_cnpj.text if dest_cnpj is not None else ""
                    
                    razao_social = root.find(".//nfe:emit/nfe:xNome", ns) 
                    razao_social_text = razao_social.text if razao_social is not None else ""
                    
                    data = root.find(".//nfe:ide/nfe:dhEmi", ns) 
                    data_text = data.text if data is not None else ""

                    ##regex para filtrar apenas o dias
                    data_dia = ""
                    data_hora = ""
                    if data_text:
                        data_match = re.match(r"^(\d{4}-\d{2}-\d{2})", data_text)
                        data_dia = data_match.group(1) if data_match else ""

                        ##regex para filtrar apenas a hora
                        data_match = re.search(r"T(\d{2}:\d{2}:\d{2})", data_text)
                        data_hora = data_match.group(1) if data_match else ""

                    chave = root.find(".//nfe:chNFe", ns)
                    chave_text = chave.text

                except Exception as e:
                    print(f"Erro ao processar o arquivo {xml}: {e}")
                    messagebox.showerror("Erro", f"Erro ao processar o arquivo {xml}. Verifique se é um XML de NFE válido.")  # Exibe uma mensagem de erro se o arquivo não for XML.
                    continue

                id_produ = 0
                ##salvar no banco de dados
                salvo_nfe = meu_db.inserir_nota((chave_text, numero_text, valor_text, emit_cnpj_text, dest_cnpj_text, razao_social_text, data_dia, data_hora))
                if salvo_nfe:
                    print(f"Nota {chave_text} inserida com sucesso!")
                    for item in root.findall(".//nfe:det", ns):
                        id_produ += 1
                        # Buscamos as informações dentro da tag <prod> de cada <det>
                        descricao_elem = item.find(".//nfe:prod/nfe:xProd", ns)
                        quantidade_elem = item.find(".//nfe:prod/nfe:qCom", ns)
                        valor_unitario_elem = item.find(".//nfe:prod/nfe:vUnCom", ns)
                        valor_total_prod_elem = item.find(".//nfe:prod/nfe:vProd", ns)
                        
                        descricao = descricao_elem.text if descricao_elem is not None else ""
                        quantidade = quantidade_elem.text if quantidade_elem is not None else ""
                        valor_unitario = valor_unitario_elem.text if valor_unitario_elem is not None else ""
                        valor_total_prod = valor_total_prod_elem.text if valor_total_prod_elem is not None else ""

                    ##Produtos da nota
                        meu_db.inserir_produto((id_produ, chave_text, descricao, quantidade, valor_unitario, valor_total_prod))
                else:
                    print(f"Nota {chave_text} já existe no banco de dados ou ocorreu um erro.")
                    messagebox.showerror("Erro", f"Nota {numero_text} já existe no banco de dados.")  # Exibe uma mensagem de erro se o arquivo não for XML.

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