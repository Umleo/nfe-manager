import { useState } from "react";
import { ModalDelete } from "./ModalDelete";

export default function Excluir({ elementoId }: { elementoId: string }) {
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <>
      <button
        className="cursor-pointer rounded-xl border border-red-300 bg-red-600 p-2.5 text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
        aria-label="Excluir"
        title="Excluir"
        onClick={() => setModalDelete(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
      {modalDelete && (
        <ModalDelete elementoId={elementoId} setModalDelete={setModalDelete} />
      )}
    </>
  );
}
