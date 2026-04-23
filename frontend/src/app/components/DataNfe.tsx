export default function DataNfe({
  setIdElemento,
  setModalOpen,
  modalOpen,
  data,
}: {
  setIdElemento: React.Dispatch<React.SetStateAction<string>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  data: any;
}) {
  function trataData(data) {
    const partes = data.split("-");
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  function toggleModal(id) {
    setModalOpen(!modalOpen);
    setIdElemento(id);
  }

  return (
    <>
      {data && data.length > 0 ? (
        data.map((nfe, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td className="border px-4">{nfe.razao_social}</td>
                <td className="border p-2 text-center">{nfe.numero}</td>
                <td className="border p-2 text-center">
                  {trataData(nfe.data_dia)}
                </td>
                <td>
                  <button
                    className="cursor-pointer border bg-amber-200 flex m-auto"
                    onClick={() => toggleModal(nfe.chave)}
                  >
                    teste
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })
      ) : (
        <tbody>
          <tr>
            <td className="text-center" colSpan={4}>
              Nenhum resultado encontrado.
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
}
