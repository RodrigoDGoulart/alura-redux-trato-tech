import { createStandaloneToast } from "@chakra-ui/toast";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { defaultToast } from "constants/defaultToast";
import categoriasService from "services/categorias";
import {
  addAllCategories,
  carregarCategorias,
} from "store/reducers/categorias";

export const listener = createListenerMiddleware();

const { toast } = createStandaloneToast();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (_, listeningAPI) => {
    toast({
      ...defaultToast,
      id: "loadingToast",
      title: "Carregando",
      description: "Carregando categorias...",
      status: "loading",
    });

    const { dispatch, fork, unsubscribe } = listeningAPI;
    const tarefa = fork(async (api) => {
      await api.delay(1000);
      return await categoriasService.buscar();
    });

    const resposta = await tarefa.result;

    if (resposta.status === "ok") {
      dispatch(addAllCategories(resposta.value));
      toast.close("loadingToast");
      toast({
        ...defaultToast,
        title: "Sucesso",
        description: "Categorias carregadas com sucesso",
        status: "success",
      });
      unsubscribe();
    } else {
      toast.close("loadingToast");
      toast({
        ...defaultToast,
        title: "Erro!",
        description: "Erro na busca de categoria",
        status: "error",
      });
    }
  },
});
