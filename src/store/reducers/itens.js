import { createSlice } from "@reduxjs/toolkit";
import { estadoInicial } from '../../constants/itensInitialState'
import { v4 as uuid } from 'uuid'
import { noImage } from "constants/noImage";

const itensSlice = createSlice({
  name: "itens",
  initialState: estadoInicial,
  reducers: {
    mudarFavorito: (state, {payload}) => {
      state.map(item => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    cadastrarItem: (state, {payload}) => {
      state.push({
        titulo: payload.nome,
        categoria: payload.categoria,
        descricao: payload.descricao,
        favorito: false,
        foto: payload.imagem || noImage,
        id: uuid(),
        preco: payload.preco
      })
    }
  }
});

export const { mudarFavorito, cadastrarItem } = itensSlice.actions;

export default itensSlice.reducer;