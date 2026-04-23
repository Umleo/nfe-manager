from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
### Para ler os arquivos XML
import xml.etree.ElementTree as ET
from crud.crud import crud_ler, crud_delete, crud_ler_razao_social, crud_ler_data, crud_ler_numero

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

@app.get("/nfe")
async def read_nfe():
    return await crud_ler()

##rota dinamica baseada na chave da nota
@app.delete("/nfe/{chave}")
async def delete_nfe(chave: str):
    return await crud_delete(chave)

##rota dinamica baseada na razao social da nota
@app.get("/nfe/razao-social/{razao_social}")
async def read_nfe_by_razao_social(razao_social: str):
    return await crud_ler_razao_social(razao_social)

##rota dinamica baseada na data da nota
@app.get("/nfe/data/{data}")
async def read_nfe_by_data(data: str):
    ##função para separar dataInicial e dataFinal, onde o formato esperado é "dataInicialfdataFinal"
    def split_data(data):
        try:
            data_inicial, data_final = data.split('f')
            return data_inicial, data_final
        except ValueError:
            raise ValueError("Formato de data inválido. Use 'dataInicialfdataFinal'.")
    data_inicial, data_final = split_data(data)
    return await crud_ler_data(data_inicial, data_final)

@app.get("/nfe/numero/{numero}")
async def read_nfe_by_numero(numero: str):
    return await crud_ler_numero(numero)

#executa com python3 main.py
if __name__ == "__main__":
    # Define a porta 5000, por exemplo
    uvicorn.run("main:app", host="127.0.0.1", port=5111, reload=True)

