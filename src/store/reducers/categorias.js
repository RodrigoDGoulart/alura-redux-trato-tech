import { createStandaloneToast } from "@chakra-ui/toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";

const estadoInicial = [];

const { toast } = createStandaloneToast();

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const defaultToast = {
  duration: 2000,
  isClosable: true,
}

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: estadoInicial,
  extraReducers: (builder) => {
    builder
      .addCase(buscarCategorias.fulfilled, (state, { payload }) => {
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
          title: 'Carregando',
          description: 'Carregando categorias...',
          status: 'loading',
        })
      })
      .addCase(buscarCategorias.rejected, () => {
        toast({
          ...defaultToast,
          title: 'Erro!',
          description: 'Erro na busca de categoria',
          status: 'error',
        })
      });
  },
});

export default categoriasSlice.reducer;
