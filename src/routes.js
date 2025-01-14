import PaginaPadrao from "components/PaginaPadrao";
import Home from "pages/Home";
import Categoria from "pages/Categoria";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Carrinho from "pages/Carrinho";
import Anuncie from "pages/Anuncie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { buscarCategorias } from "store/reducers/categorias";
import { buscarItens } from "store/reducers/itens";

export default function Router() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buscarCategorias());
    dispatch(buscarItens());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<Home />} />
          <Route path="/categorias/:nomeCategoria" element={<Categoria />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/anuncie/:nomeCategoria" element={<Anuncie />} />
          <Route path="/anuncie" element={<Anuncie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
