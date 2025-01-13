import instance from "common/config/api";

const itensService = {
  buscar: async () => {
    const resp = await instance.get("/itens");
    return resp.data;
  },
};

export default itensService;
