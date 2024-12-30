import Header from "components/Header";
import styles from "./Anuncie.module.scss";
import { useSelector } from "react-redux";
import Button from "components/Button";
import { useForm } from "react-hook-form";

export default function Anuncie() {
  const categorias = useSelector((state) =>
    state.categorias.map(({ nome, id }) => ({ nome, id }))
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      categoria: '',
    }
  });

  function cadastrar(parametro) {
    console.log({ parametro });
  }

  return (
    <div className={styles.container} onSubmit={handleSubmit(cadastrar)}>
      <Header
        titulo="Anuncie aqui"
        descricao="Anunce seu produto no melhor site do Brasil"
      />
      <form className={styles.formulario}>
        <input
          {...register("nome", { required: true })}
          placeholder="Nome do produto"
          alt="Nome do produto"
        />
        <input
          {...register("descricao", { required: true })}
          placeholder="Descricão do produto"
          alt="Descrição do produto"
        />
        <input
          {...register("imagem", { required: true })}
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
        />
        <select {...register("categoria", { required: true })}>
          <option value="" disabled>
            Selecione a categoria
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <input
          {...register("preco", { required: true })}
          type="number"
          placeholder="Preço do produto"
        />
        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
}
