import { createListenerMiddleware } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import {
  addAllCategories,
  carregarCategorias,
} from "store/reducers/categorias";

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (_, listeningAPI) => {
    const { dispatch, fork } = listeningAPI;
    const tarefa = fork(async () => {
      return await categoriasService.buscar();
    });

    const resposta = await tarefa.result;

    if (resposta.status === "ok") {
      dispatch(addAllCategories(resposta.value));
    }
  },
});
