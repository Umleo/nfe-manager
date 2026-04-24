import axios from "axios";
import { useEffect, useState } from "react";
import { DetalhesNfe } from "./components/DetalhesNfe";
import InputFiltro from "./components/inputFiltro";
import TabelaNfe from "./components/TabelaNfe";
import type { Nfe } from "./types/nfe";

function App() {
  const [data, setData] = useState<Nfe[]>([]);

  //modal para visualizar os detalhes da nota fiscal
  const [modalOpen, setModalOpen] = useState(false);
  const [idElemento, setIdElemento] = useState<string | null>(null);

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
    <main className="min-h-screen bg-white px-4 py-8 text-neutral-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col items-center gap-2 text-center">
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium tracking-wide text-neutral-600 uppercase">
              Triagem de documentos
            </span>
            <h1 className="text-3xl font-semibold text-neutral-900">
              Notas fiscais
            </h1>
            <p className="text-sm text-neutral-500">
              Busque por razão social, número ou intervalo de data.
            </p>
          </div>
          <InputFiltro filtro="Razão Social" />
        </section>

        <TabelaNfe
          setIdElemento={setIdElemento}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          data={data}
        />
      </div>

      {modalOpen && (
        <DetalhesNfe
          setModalOpen={setModalOpen}
          data={data}
          elementoId={idElemento}
        />
      )}
    </main>
  );
}

export default App;
