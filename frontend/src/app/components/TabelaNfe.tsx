import DataNfe from "./DataNfe";

export default function TabelaNfe({
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
  return (
    <section className="flex justify-center">
      <table className="table-fixed w-full max-w-4/5">
        <thead>
          <tr className="">
            <th className="border w-6/12">Razão Social</th>
            <th className="border px-2 w-[8%]">Numero</th>
            <th className="border px-2 w-[10%]">Data</th>
            <th className="w-[4%]"></th>
          </tr>
        </thead>

        <DataNfe
          setIdElemento={setIdElemento}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          data={data}
        />
      </table>
    </section>
  );
}
