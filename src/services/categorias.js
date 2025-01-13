import instance from "common/config/api";

const categoriasService = {
  buscar: async () => {
    const resp = await instance.get("/categorias");
    return resp.data;
  },
};

export default categoriasService;
