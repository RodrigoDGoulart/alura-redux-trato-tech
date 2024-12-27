import { createSlice } from "@reduxjs/toolkit";

const estadoInicial = [];

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState: estadoInicial,
  reducers: {
    mudarCarrinho: (state, { payload }) => {
      const temItem = state.some((item) => item.id === payload);
      if (!temItem)
        return [...state, { id: payload, quantidade: 1 }];
      // item já está no carrinho
      return state.filter((item) => item.id !== payload);
    },
    mudarQuantidade: (state, {payload}) => {
      state = state.map(itemCarrinho => {
        if (itemCarrinho.id === payload.id) itemCarrinho.quantidade += payload.quantidade;
        return itemCarrinho;
      })
    }
  },
});

export const { mudarCarrinho, mudarQuantidade } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;
