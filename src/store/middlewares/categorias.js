import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  addAllCategories,
  adicionarUmaCategoria,
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
        erro: "Erro na busca de categoria",
      },
    });
    unsubscribe();
  },
});

listener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, listeningAPI) => {
    const { fork, dispatch, unsubscribe, getState } = listeningAPI;
    const { categorias } = getState();
    const categoriaCarregada = categorias.some(
      (categoria) => categoria.id === nomeCategoria
    );
    if (categoriaCarregada) return;
    if (categorias.length === 5) return unsubscribe();

    const nomeCategoria = action.payload;
    const resp = await criarTarefa({
      fork,
      dispatch,
      action: adicionarUmaCategoria,
      busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
      textos: {
        sucesso: `Categoria ${nomeCategoria} carregada com sucesso`,
        loading: "Carregando categoria...",
        erro: "Erro na busca de categoria",
      },
    });
    if (resp.status === "ok") {
      unsubscribe();
    }
  },
});
