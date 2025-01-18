import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";

const estadoInicial = [];

export const carregarCategorias = createAction("categorias/carregarCategorias");

export const carregarUmaCategoria = createAction(
  "categorias/carregarUmaCategoria"
);

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: estadoInicial,
  reducers: {
    addAllCategories: (state, { payload }) => {
      return payload;
    },
    adicionarUmaCategoria: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarCategorias.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const { addAllCategories, adicionarUmaCategoria } = categoriasSlice.actions;

export default categoriasSlice.reducer;
