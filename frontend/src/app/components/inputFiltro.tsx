import { useState } from "react";
import { useNavigate } from "react-router";

export default function InputFiltro({
  filtro,
  valor,
}: {
  filtro: string;
  valor?: string;
}) {
  const navigate = useNavigate();

  //filtro date
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  //filtro
  const [dado, setDado] = useState(valor || "");

  const [tipoFiltro, setTipoFiltro] = useState(filtro);

  function redirect() {
    // Redireciona para a rota dinâmica
    if (tipoFiltro === "Data") {
      if (dataInicial.trim() === "" || dataFinal.trim() === "") {
        navigate(`/`);
        return;
      }
      navigate(`/busca-data/${dataInicial}f${dataFinal}`);
      window.location.reload();
    } else if (tipoFiltro === "Número") {
      if (dado.trim() === "") {
        navigate(`/`);
        return;
      }
      navigate(`/busca-numero/${dado}`);
      window.location.reload();
    } else {
      if (dado.trim() === "") {
        navigate(`/`);
        return;
      }
      navigate(`/busca-razao-social/${dado}`);
      window.location.reload();
    }
  }
  return (
    <div className="flex flex-row justify-center w-full overflow-x-auto">
      <select
        className="border rounded-sm py-2 px-4 shrink-0"
        value={tipoFiltro}
        onChange={(e) => setTipoFiltro(e.target.value)}
      >
        <option value="Razão Social">Razão Social</option>
        <option value="Número">Número</option>
        <option value="Data">Data</option>
      </select>

      {tipoFiltro === "Data" ? (
        <div className="flex flex-row flex-nowrap items-center m-2 gap-2 shrink-0">
          <input
            className="border rounded-sm px-2 py-1 text-center"
            type="date"
            placeholder={`Buscar por ${tipoFiltro.toLowerCase()}...`}
            onChange={(e) => setDataInicial(e.target.value)}
          />
          <input
            className="border rounded-sm px-2 py-1 text-center"
            type="date"
            placeholder={`Buscar por ${tipoFiltro.toLowerCase()}...`}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>
      ) : (
        <input
          className="border rounded-sm flex-1 min-w-0 m-2 text-center"
          type="text"
          placeholder={`Buscar por ${tipoFiltro.toLowerCase()}...`}
          value={dado}
          onChange={(e) => setDado(e.target.value)}
        />
      )}

      <button
        className="border bg-blue-500 text-white py-2 px-4 rounded-sm cursor-pointer shrink-0"
        onClick={() => redirect()}
      >
        Buscar
      </button>
    </div>
  );
}
