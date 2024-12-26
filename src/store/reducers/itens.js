import { createSlice } from "@reduxjs/toolkit";
import { estadoInicial } from '../../constants/itensInitialState'

const itensSlice = createSlice({
  name: "itens",
  initialState: estadoInicial,
  reducers: {
    mudarFavorito: (state, {payload}) => {
      state = state.map(item => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      })
    }
  }
});

export const { mudarFavorito } = itensSlice.actions;

export default itensSlice.reducer;