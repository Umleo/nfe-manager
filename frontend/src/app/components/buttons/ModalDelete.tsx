import axios from "axios";

export function ModalDelete({
  elementoId,
  setModalDelete,
}: {
  elementoId: string;
  setModalDelete: (show: boolean) => void;
}) {
  const deleteElemento = async () => {
    try {
      await axios.delete(`http://localhost:5111/nfe/${elementoId}`);
      console.log("Excluindo elemento com ID:", elementoId);
    } catch (error) {
      console.error("Erro ao excluir o elemento:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
        <p className="mb-6">Tem certeza de que deseja excluir este item?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => setModalDelete(false)}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={deleteElemento}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
