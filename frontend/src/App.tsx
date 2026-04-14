import axios from "axios";
import { useEffect, useState } from "react";

// interface Nfe {
//   razao_social: string;
//   numero: string;
//   data: string;
// }

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/nfe");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Notas fiscais</h1>
      {data &&
        data.map((nfe, index) => {
          return (
            <div
              key={index}
              className="flex justify-between gap-2 border-2 border-gray-300 p-4 rounded"
            >
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="border px-2">Razão Social</th>
                    <th className="border px-2">Numero</th>
                    <th className="border px-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">{nfe.razao_social}</td>
                    <td className="border p-2">{nfe.numero}</td>
                    <td className="border p-2">{nfe.data_dia}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );

  <table className="table-auto">
    <thead>
      <tr>
        <th>Song</th>
        <th>Artist</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
        <td>Malcolm Lockyer</td>
        <td>1961</td>
      </tr>
      <tr>
        <td>Witchy Woman</td>
        <td>The Eagles</td>
        <td>1972</td>
      </tr>
      <tr>
        <td>Shining Star</td>
        <td>Earth, Wind, and Fire</td>
        <td>1975</td>
      </tr>
    </tbody>
  </table>;
}

export default App;
