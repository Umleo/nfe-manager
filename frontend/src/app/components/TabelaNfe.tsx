import DataNfe from "./DataNfe";
import type { Nfe } from "../types/nfe";
import { useMemo, useState } from "react";

export default function TabelaNfe({
  setIdElemento,
  setModalOpen,
  modalOpen,
  data,
}: {
  setIdElemento: React.Dispatch<React.SetStateAction<string | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  data: Nfe[];
}) {
  const [filtro, setFiltro] = useState<
    | "numeralMaior"
    | "numeralMenor"
    | "dataMenor"
    | "dataMaior"
    | "alfabetica"
    | "alfabeticaMenor"
    | ""
  >("");

  const dataFiltro = useMemo(() => {
    const listaOrdenada = [...data];

    if (filtro === "alfabetica") {
      return listaOrdenada.sort((a, b) =>
        a.razao_social.localeCompare(b.razao_social),
      );
    }

    if (filtro === "alfabeticaMenor") {
      return listaOrdenada.sort((a, b) =>
        b.razao_social.localeCompare(a.razao_social),
      );
    }

    if (filtro === "numeralMenor") {
      return listaOrdenada.sort((a, b) => a.numero - b.numero);
    }

    if (filtro === "numeralMaior") {
      return listaOrdenada.sort((a, b) => b.numero - a.numero);
    }

    if (filtro === "dataMenor") {
      const data_menor = listaOrdenada.sort((a, b) => {
        const dataA = new Date(a.data_dia);
        const dataB = new Date(b.data_dia);
        return dataA.getTime() - dataB.getTime();
      });
      return data_menor;
    }

    if (filtro === "dataMaior") {
      const data_maior = listaOrdenada.sort((a, b) => {
        const dataA = new Date(a.data_dia);
        const dataB = new Date(b.data_dia);
        return dataB.getTime() - dataA.getTime();
      });
      return data_maior;
    }

    return listaOrdenada;
  }, [filtro, data]);

  data = dataFiltro;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full min-w-180 table-fixed bg-white">
          <thead className="bg-neutral-100 text-neutral-700">
            <tr>
              <th
                onClick={() =>
                  filtro === "alfabetica"
                    ? setFiltro("alfabeticaMenor")
                    : setFiltro("alfabetica")
                }
                className="cursor-pointer flex w-6/12 border-b border-neutral-200 px-4 py-3 text-left text-sm font-semibold"
              >
                Razão Social <span className="ml-1">↕️</span>
              </th>

              <th
                onClick={() =>
                  filtro === "numeralMaior"
                    ? setFiltro("numeralMenor")
                    : setFiltro("numeralMaior")
                }
                className="cursor-pointer w-[12%] border-b border-neutral-200 px-2 py-3 text-center text-sm font-semibold"
              >
                Número <span className="ml-1">↕️</span>
              </th>
              <th
                onClick={() =>
                  filtro === "dataMaior"
                    ? setFiltro("dataMenor")
                    : setFiltro("dataMaior")
                }
                className="cursor-pointer w-[14%] border-b border-neutral-200 px-2 py-3 text-center text-sm font-semibold"
              >
                Data <span className="ml-1">↕️</span>
              </th>
              <th className="w-[14%] border-b border-neutral-200 px-2 py-3 text-center text-sm font-semibold">
                Ações
              </th>
            </tr>
          </thead>

          <DataNfe
            setIdElemento={setIdElemento}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            data={data}
          />
        </table>
      </div>
    </section>
  );
}
