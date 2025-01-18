import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  addAllCategories,
  carregarCategorias,
  carregarUmaCategoria,
} from "store/reducers/categorias";
import criarTarefa from "./utils/criarTarefa";
import categoriasService from "services/categorias";

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (_, listeningAPI) => {
    const { fork, dispatch, unsubscribe } = listeningAPI;
    await criarTarefa({
      fork,
      dispatch,
      action: addAllCategories,
      busca: categoriasService.buscar,
      textos: {
        sucesso: "Categorias carregadas com sucesso",
        loading: "Carregando categorias...",
        erro: "Erro na busca de categoria"
      }
    });
    unsubscribe();
  },
});

listener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: () => {},
});
