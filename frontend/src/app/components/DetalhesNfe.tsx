import { useState } from "react";
import type { Nfe } from "../types/nfe";
import Excluir from "./buttons/Excluir";

export function DetalhesNfe({
  setModalOpen,
  data,
  elementoId,
}: {
  data: Nfe[];
  elementoId: string | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [copy, setCopy] = useState(false);

  const copiarChave = (chave: string) => {
    navigator.clipboard.writeText(chave);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

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
                  className="relative flex flex-row-reverse text-sm text-neutral-700"
                >
                  <div className="absolute right-0 flex flex-col gap-1">
                    <Excluir elementoId={elementoId} />
                  </div>
                  <div>
                    <p>
                      <strong>Chave:</strong> {nfe.chave}{" "}
                      <button
                        type="button"
                        onClick={() => copiarChave(nfe.chave)}
                        className={`inline-flex cursor-pointer rounded-md border p-1.5 transition focus:outline-none focus:ring-2 ${
                          copy
                            ? "border-neutral-300 bg-neutral-200 text-neutral-500 focus:ring-neutral-200"
                            : "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 focus:ring-sky-200"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-4 w-4"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
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
                      <div className="flex">
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
