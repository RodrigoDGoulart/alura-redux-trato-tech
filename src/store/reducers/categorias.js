import { createStandaloneToast } from "@chakra-ui/toast";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultToast } from "constants/defaultToast";
import categoriasService from "services/categorias";

const estadoInicial = [];

const { toast } = createStandaloneToast();

export const carregarCategorias = createAction("categorias/carregarCategorias");

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
  },
  extraReducers: (builder) => {
    builder.addCase(buscarCategorias.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const { addAllCategories } = categoriasSlice.actions;

export default categoriasSlice.reducer;
