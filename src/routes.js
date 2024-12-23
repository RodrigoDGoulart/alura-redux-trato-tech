import PaginaPadrao from "components/PaginaPadrao";
import Home from "pages/Home";
import Categoria from "pages/Home/Categoria";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<Home />} />
          <Route path="/categorias/:nomeCategoria" element={<Categoria />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
