import DataNfe from "./DataNfe";
import type { Nfe } from "../types/nfe";

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
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full min-w-180 table-fixed bg-white">
          <thead className="bg-neutral-100 text-neutral-700">
            <tr>
              <th className="w-6/12 border-b border-neutral-200 px-4 py-3 text-left text-sm font-semibold">
                Razão Social
              </th>
              <th className="w-[12%] border-b border-neutral-200 px-2 py-3 text-center text-sm font-semibold">
                Número
              </th>
              <th className="w-[14%] border-b border-neutral-200 px-2 py-3 text-center text-sm font-semibold">
                Data
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
