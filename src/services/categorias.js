import instance from "common/config/api";

const categoriasService = {
  buscar: async () => {
    const resp = await instance.get("/categorias");
    return resp.data;
  },
  buscarUmaCategoria: async (nomeCategoria) => {
    const resp = await instance.get(`/categorias/${nomeCategoria}`);
    return resp.data;
  },
};

export default categoriasService;
