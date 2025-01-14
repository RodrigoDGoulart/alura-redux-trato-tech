import { createStandaloneToast } from "@chakra-ui/toast";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";

const estadoInicial = [];

const { toast } = createStandaloneToast();

export const carregarCategorias = createAction("categorias/carregarCategorias");

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const defaultToast = {
  duration: 2000,
  isClosable: true,
};

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: estadoInicial,
  reducers: {
    addAllCategories: (state, { payload }) => {
      return payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarCategorias.fulfilled, (state, { payload }) => {
        toast.close("loadingToast");
        toast({
          ...defaultToast,
          title: "Sucesso",
          description: "Categorias carregadas com sucesso",
          status: "success",
        });
        return payload;
      })
      .addCase(buscarCategorias.pending, () => {
        toast({
          ...defaultToast,
          id: "loadingToast",
          title: "Carregando",
          description: "Carregando categorias...",
          status: "loading",
        });
      })
      .addCase(buscarCategorias.rejected, () => {
        toast.close("loadingToast");
        toast({
          ...defaultToast,
          title: "Erro!",
          description: "Erro na busca de categoria",
          status: "error",
        });
      });
  },
});

export const { addAllCategories } = categoriasSlice.actions;

export default categoriasSlice.reducer;
