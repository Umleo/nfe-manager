from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
### Para ler os arquivos XML
import xml.etree.ElementTree as ET
import os
import re
from model.nfe import NFE

###inicia servidor
app = FastAPI()

##cors
origins = [
    "http://localhost:5173",  # React (Vite)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


##
def nfe_data():
    pass

    # numero = root.find(".//nfe:nNF", ns)
    # valor = root.find(".//nfe:vNF", ns)
    # emit_cnpj = root.find(".//nfe:emit/nfe:CNPJ", ns) 
    # dest_cnpj = root.find(".//nfe:dest/nfe:CNPJ", ns)
    # razao_social = root.find(".//nfe:emit/nfe:xNome", ns)
    # data = root.find(".//nfe:ide/nfe:dhEmi", ns)

    # ##regex para filtrar apenas o dias
    # data_match = re.match(r"^(\d{4}-\d{2}-\d{2})", data.text)
    # data_dia = data_match.group(1) if data_match else ""

    # ##regex para filtrar apenas a hora
    # data_match = re.search(r"T(\d{2}:\d{2}:\d{2})", data.text)
    # data_hora = data_match.group(1) if data_match else ""

    # chave = root.find(".//nfe:chNFe", ns)
##

nfe_data()

@app.get("/nfe")
def get_nfe():
    pass

if __name__ == "__main__":
    # Define a porta 5000, por exemplo
    uvicorn.run("main:app", host="127.0.0.1", port=5000, reload=True)

