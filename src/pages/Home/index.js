import Header from "components/Header";
import styles from "./Home.module.scss";
import relogio from "assets/inicial.png";
import { categorias } from "./Home.constants";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Header
          titulo="Classificados Tech"
          descricao="Compre diversos tipos de produtos no melhor site do Brasil!"
          imagem={relogio}
          className={styles.header}
        />
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
