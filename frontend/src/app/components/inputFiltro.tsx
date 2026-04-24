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
    <div className="flex w-full flex-col items-stretch justify-center gap-3 overflow-x-auto md:flex-row md:items-center">
      <select
        className="shrink-0 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
        value={tipoFiltro}
        onChange={(e) => setTipoFiltro(e.target.value)}
      >
        <option value="Razão Social">Razão Social</option>
        <option value="Número">Número</option>
        <option value="Data">Data</option>
      </select>

      {tipoFiltro === "Data" ? (
        <div className="flex flex-row flex-nowrap items-center gap-2 shrink-0">
          <input
            className="rounded-xl border border-neutral-300 px-3 py-2 text-center text-sm text-neutral-700 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
            type="date"
            placeholder={`Buscar por ${tipoFiltro.toLowerCase()}...`}
            onChange={(e) => setDataInicial(e.target.value)}
          />
          <input
            className="rounded-xl border border-neutral-300 px-3 py-2 text-center text-sm text-neutral-700 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
            type="date"
            placeholder={`Buscar por ${tipoFiltro.toLowerCase()}...`}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>
      ) : (
        <input
          className="min-w-0 flex-1 rounded-xl border border-neutral-300 px-4 py-2 text-center text-sm text-neutral-700 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
          type="text"
          placeholder={`Buscar por ${tipoFiltro.toLowerCase()}...`}
          value={dado}
          onChange={(e) => setDado(e.target.value)}
        />
      )}

      <button
        className="shrink-0 cursor-pointer rounded-xl border border-blue-300 bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        onClick={() => redirect()}
      >
        Buscar
      </button>
    </div>
  );
}
