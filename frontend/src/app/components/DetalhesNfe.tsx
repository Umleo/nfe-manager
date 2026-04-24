import type { Nfe } from "../types/nfe";

export function DetalhesNfe({
  setModalOpen,
  data,
  elementoId,
}: {
  data: Nfe[];
  elementoId: string | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0 z-9999 bg-black/35 p-4 backdrop-blur-[2px] sm:p-8">
      <div className="mx-auto mt-[4vh] h-auto max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-neutral-200 bg-white shadow-2xl">
        <section className="border-b border-neutral-200">
          <div>
            <div className="relative ">
              <button
                className="right-0 absolute m-4 flex cursor-pointer rounded-lg border border-rose-300 bg-rose-50 p-3 py-1.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200"
                onClick={() => setModalOpen(false)}
              >
                Fechar
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center px-4 pt-4 pb-6">
            <h1 className="text-2xl font-semibold text-neutral-900">
              Detalhes da nota fiscal
            </h1>
          </div>
        </section>
        <section className="p-5 sm:p-6">
          {data.map((nfe) => {
            if (nfe.chave === elementoId) {
              return (
                <div
                  key={nfe.chave}
                  className="space-y-1 text-sm text-neutral-700"
                >
                  <p>
                    <strong>Razão Social:</strong> {nfe.razao_social}
                  </p>
                  <p>
                    <strong>Número:</strong> {nfe.numero}
                  </p>
                  <p>
                    <strong>Data:</strong> {nfe.data_dia}
                  </p>
                  <div>
                    <p className="mt-4 mb-3 text-sm text-neutral-800">
                      <strong>Produtos:</strong>{" "}
                    </p>
                    <div className="overflow-x-auto rounded-xl border border-neutral-200">
                      <table className="w-full min-w-180 table-fixed">
                        <thead className="bg-neutral-100 text-neutral-700">
                          <tr>
                            <th className="w-[10%] border-b border-neutral-200 px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide">
                              Item
                            </th>
                            <th className="w-7/12 border-b border-neutral-200 px-2 py-2 text-left text-xs font-semibold uppercase tracking-wide">
                              Descrição
                            </th>
                            <th className="w-[10%] border-b border-neutral-200 px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide">
                              Quant
                            </th>
                            <th className="min-w-[10%] max-w-auto border-b border-neutral-200 px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide">
                              val.unit
                            </th>
                            <th className="min-w-[10%] max-w-auto border-b border-neutral-200 px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide">
                              val.total
                            </th>
                          </tr>
                        </thead>
                        {nfe.produtos.map((produto) => {
                          return (
                            <tbody key={produto.id}>
                              <tr className="border-b border-neutral-200 text-sm text-neutral-700">
                                <td className="px-2 py-2 text-center">
                                  {produto.item}
                                </td>
                                <td className="px-4 py-2">
                                  {produto.descricao_produto}
                                </td>
                                <td className="px-2 py-2 text-center">
                                  {produto.quantidade}
                                </td>
                                <td className="px-2 py-2 text-center">
                                  R${produto.valor_unitario.toFixed(2)}
                                </td>
                                <td className="px-2 py-2 text-center">
                                  R${produto.valor_total.toFixed(2)}
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </section>
      </div>
    </div>
  );
}
