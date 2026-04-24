import type { Nfe } from "../types/nfe";

export default function DataNfe({
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
  function trataData(dataValue: string) {
    const partes = dataValue.split("-");
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  function toggleModal(id: string) {
    setModalOpen(!modalOpen);
    setIdElemento(id);
  }

  return (
    <>
      {data && data.length > 0 ? (
        data.map((nfe, index) => {
          return (
            <tbody key={index}>
              <tr className="border-b border-neutral-200 text-neutral-700 transition hover:bg-neutral-50">
                <td className="px-4 py-3 text-sm">{nfe.razao_social}</td>
                <td className="p-2 text-center text-sm">{nfe.numero}</td>
                <td className="p-2 text-center text-sm">
                  {trataData(nfe.data_dia)}
                </td>
                <td className="p-2">
                  <button
                    className="m-auto flex cursor-pointer rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    onClick={() => toggleModal(nfe.chave)}
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })
      ) : (
        <tbody>
          <tr>
            <td
              className="p-6 text-center text-sm text-neutral-500"
              colSpan={4}
            >
              Nenhum resultado encontrado.
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
}
