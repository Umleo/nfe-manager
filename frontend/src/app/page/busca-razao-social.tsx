import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetalhesNfe } from "../components/DetalhesNfe";
import InputFiltro from "../components/inputFiltro";
import TabelaNfe from "../components/TabelaNfe";

export default function BuscaRazaoSocial() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [idElemento, setIdElemento] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5111/nfe/razao-social/${id ? id : "a"}`,
        );
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <section>
        <div className="flex flex-col items-center gap-4 p-2">
          <h1
            className="text-3xl font-bold underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Busca por Razão Social
          </h1>
          <InputFiltro valor={id} filtro="Razão Social" />
        </div>
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
