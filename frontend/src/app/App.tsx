import axios from "axios";
import { useEffect, useState } from "react";
import { DetalhesNfe } from "./components/DetalhesNfe";
import InputFiltro from "./components/inputFiltro";
import TabelaNfe from "./components/TabelaNfe";

function App() {
  const [data, setData] = useState(null);

  //modal para visualizar os detalhes da nota fiscal
  const [modalOpen, setModalOpen] = useState(false);
  const [idElemento, setIdElemento] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5111/nfe");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="flex flex-col items-center gap-4 p-2">
        <h1 className="text-3xl font-bold underline">Notas fiscais</h1>
        <InputFiltro filtro="Razão Social" />
      </section>
      <TabelaNfe
        setIdElemento={setIdElemento}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        data={data}
      />
      {modalOpen && (
        <DetalhesNfe
          setModalOpen={setModalOpen}
          data={data}
          elementoId={idElemento}
        />
      )}
    </>
  );
}

export default App;
