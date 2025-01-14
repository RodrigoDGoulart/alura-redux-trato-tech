import Header from "components/Header";
import styles from "./Home.module.scss";
import relogio from "assets/inicial.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/Button";
import { useEffect } from "react";
import { carregarCategorias } from "store/reducers/categorias";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categorias);

  useEffect(() => {
    dispatch(carregarCategorias());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Header
          titulo="Classificados Tech"
          descricao="Compre diversos tipos de produtos no melhor site do Brasil!"
          imagem={relogio}
          className={styles.header}
        >
          <Button onClick={() => navigate("/anuncie")}>Quero anunciar</Button>
        </Header>
        <div className={styles.categorias}>
          <div className={styles["categorias-title"]}>
            <h1>categorias</h1>
          </div>
          <div className={styles["categorias-container"]}>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => navigate(`/categorias/${categoria.id}`)}
              >
                <img src={categoria.thumbnail} alt={categoria.nome} />
                <h1>{categoria.nome}</h1>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
