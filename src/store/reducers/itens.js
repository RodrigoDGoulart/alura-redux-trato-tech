import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { noImage } from "constants/noImage";
import itensService from "services/itens";

export const buscarItens = createAsyncThunk(
  "itens/buscar",
  itensService.buscar
);

const estadoInicial = [];

// padrões de mudança de objetos e arrays: https://immerjs.github.io/immer/update-patterns/
const itensSlice = createSlice({
  name: "itens",
  initialState: estadoInicial,
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    cadastrarItem: (state, { payload }) => {
      state.push({
        titulo: payload.nome,
        categoria: payload.categoria,
        descricao: payload.descricao,
        favorito: false,
        foto: payload.imagem || noImage,
        id: uuid(),
        preco: payload.preco,
      });
    },
    mudarItem: (state, { payload }) => {
      // método 1
      // return state.map((item) => {
      //   if (item.id === payload.id) item = { ...item, ...payload.item };
      //   return item;
      // });

      // método 2
      // state.map((item) => {
      //   if (item.id === payload.id) Object.assign(item, payload.item);
      //   return item;
      // });

      // método 3
      const index = state.findIndex((item) => item.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    deletarItem: (state, { payload }) => {
      // método 1
      // return state.filter(item => item.id !== payload)

      // método 2 (evitando return segundo documentação immer)
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarItens.fulfilled, (state, { payload }) => {
        return payload;
      })
      .addCase(buscarItens.pending, () => console.log("loading"))
      .addCase(buscarItens.rejected, () => console.log("rejected"));
  },
});

export const { mudarFavorito, cadastrarItem, mudarItem, deletarItem } =
  itensSlice.actions;

export default itensSlice.reducer;
