import Header from "components/Header";
import styles from "./Anuncie.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/Button";
import { useForm } from "react-hook-form";
import { cadastrarItem } from "store/reducers/itens";
import { useParams } from "react-router-dom";
import Input from "components/Input";

export default function Anuncie() {
  const dispatch = useDispatch();

  const { nomeCategoria = '' } = useParams();

  const categorias = useSelector((state) =>
    state.categorias.map(({ nome, id }) => ({ nome, id }))
  );

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      categoria: nomeCategoria,
    },
  });

  function cadastrar(data) {
    dispatch(cadastrarItem(data));
    reset();
    window.alert("Produto cadastrado com sucesso!");
  }

  return (
    <div className={styles.container} onSubmit={handleSubmit(cadastrar)}>
      <Header
        titulo="Anuncie aqui"
        descricao="Anunce seu produto no melhor site do Brasil"
      />
      <form className={styles.formulario}>
        <Input
          {...register("nome", { required: true })}
          placeholder="Nome do produto"
          alt="Nome do produto"
        />
        <Input
          {...register("descricao", { required: true })}
          placeholder="Descricão do produto"
          alt="Descrição do produto"
        />
        <Input
          {...register("imagem")}
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
        />
        <select {...register("categoria", { required: true })} disabled={nomeCategoria}>
          <option value="" disabled>
            Selecione a categoria
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <Input
          {...register("preco", { required: true, valueAsNumber: true })}
          type="number"
          step="0.01"
          placeholder="Preço do produto"
        />
        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
}
