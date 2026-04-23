export function DetalhesNfe({
  setModalOpen,
  data,
  elementoId,
}: {
  data: any;
  elementoId: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0 z-9999 bg-[rgba(0,0,0,0.8)] ">
      <div className="absolute border top-[10vh] left-[10vw] h-auto w-[80vw] rounded-xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <section className="border-b-2 border-[rgba(210,210,210,1)]">
          <div className="w-full flex justify-end absolute top-0 p-4">
            <button
              className="cursor-pointer border bg-red-200 flex font-normal"
              onClick={() => setModalOpen(false)}
            >
              Fechar
            </button>
          </div>
          <div className="flex justify-center items-center mt-2">
            <h1 className="text-2xl font-bold underline m-4">
              Detalhes da nota fiscal
            </h1>
          </div>
        </section>
        <section>
          {data.map((nfe) => {
            if (nfe.chave === elementoId) {
              return (
                <div key={nfe.chave} className="p-4">
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
                    <p>
                      <strong>Produtos:</strong>{" "}
                    </p>
                    <table className="table-fixed w-full">
                      <thead>
                        <tr className="">
                          <th className="border w-[10%]">Item</th>
                          <th className="border px-2 w-7/12">Descrição</th>
                          <th className="border px-2 w-[10%]">Quant</th>
                          <th className="border px-2 min-w-[10%] max-w-auto">
                            val.unit
                          </th>
                          <th className="border px-2 min-w-[10%] max-w-auto">
                            val.total
                          </th>
                        </tr>
                      </thead>
                      {nfe.produtos.map((produto) => {
                        return (
                          <tbody key={produto.id}>
                            <tr>
                              <td className="border px-2 text-center">
                                {produto.item}
                              </td>
                              <td className="border px-4">
                                {produto.descricao_produto}
                              </td>
                              <td className="border px-2 text-center">
                                {produto.quantidade}
                              </td>
                              <td className="border px-2 text-center">
                                R${produto.valor_unitario.toFixed(2)}
                              </td>
                              <td className="border px-2 text-center">
                                R${produto.valor_total.toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
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
