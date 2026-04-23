import { createRoot } from "react-dom/client";
import "../style.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App";
import BuscaRazaoSocial from "./page/busca-razao-social";
import BuscaData from "./page/busca-data";
import BuscaNumero from "./page/busca-numero";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/busca-razao-social/:id",
    element: <BuscaRazaoSocial />,
  },
  {
    path: "/busca-data/:id",
    element: <BuscaData />,
  },
  {
    path: "/busca-numero/:id",
    element: <BuscaNumero />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
