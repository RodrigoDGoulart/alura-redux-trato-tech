import { createStandaloneToast } from "@chakra-ui/toast";
import { defaultToast } from "constants/defaultToast";

const { toast } = createStandaloneToast();

export default async function criarTarefa({
  dispatch,
  fork,
  action,
  busca,
  textos
}) {
  toast({
    ...defaultToast,
    id: "loadingToast",
    title: "Carregando",
    description: textos.loading,
    status: "loading",
  });

  const tarefa = fork(async (api) => {
    await api.delay(1000);
    return await busca();
  });

  const resposta = await tarefa.result;

  toast.close("loadingToast");
  if (resposta.status === "ok") {
    dispatch(action(resposta.value));
    toast({
      ...defaultToast,
      title: "Sucesso",
      description: textos.sucesso,
      status: "success",
    });
  } else {
    toast({
      ...defaultToast,
      title: "Erro!",
      description: textos.erro,
      status: "error",
    });
  }
}
