import { configureStore } from "@reduxjs/toolkit";
import categoriasSlice from "./reducers/categorias";
import itensSlice from './reducers/itens';
import carrinhoSlice from './reducers/carrinho';
import buscaSlide from './reducers/busca';

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlide
  },
});

export default store;