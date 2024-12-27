import classNames from "classnames";
import styles from "./Item.module.scss";
import { AiOutlineHeart, AiFillHeart, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { mudarCarrinho, mudarQuantidade } from "store/reducers/carrinho";
import { mudarFavorito } from "store/reducers/itens";

const iconeProps = {
  size: 24,
  color: "#041833",
};

const iconeQuantidadeProps = {
  size: 32,
  color: '#1875E8'
};

export default function Item(props) {
  const { titulo, foto, preco, descricao, favorito, id, carrinho, quantidade } = props;

  const dispatch = useDispatch();
  const estaNoCarrinho = useSelector((state) =>
    state.carrinho.some((itemCarrinho) => itemCarrinho.id === id)
  );

  function resolveFavorito() {
    dispatch(mudarFavorito(id));
  }

  function resolveCarrinho() {
    dispatch(mudarCarrinho(id));
  }

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemNoCarrinho]: carrinho,
      })}
    >
      <div className={styles["item-imagem"]}>
        <img src={foto} alt={titulo} />
      </div>
      <div className={styles["item-descricao"]}>
        <div className={styles["item-titulo"]}>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
        <div className={styles["item-info"]}>
          <div className={styles["item-preco"]}>R$ {preco.toFixed(2)}</div>
          <div className={styles["item-acoes"]}>
            {favorito ? (
              <AiFillHeart
                {...iconeProps}
                color="#ff000"
                className={styles["item-acao"]}
                onClick={resolveFavorito}
              />
            ) : (
              <AiOutlineHeart
                {...iconeProps}
                className={styles["item-acao"]}
                onClick={resolveFavorito}
              />
            )}
            {carrinho ? (
              <div className={styles.quantidade}>
                Quantidade:
                <AiFillMinusCircle 
                  {...iconeQuantidadeProps}
                  onClick={() => {
                    if (quantidade >= 1) dispatch(mudarQuantidade({id, quantidade: -1}))
                  }}
                />
                <span>{String(quantidade || 0).padStart(2, '0')}</span>
                <AiFillPlusCircle 
                  {...iconeQuantidadeProps} 
                  onClick={() => {
                    dispatch(mudarQuantidade({id, quantidade: 1}))
                  }}
                />
              </div>
            ) : (
              <FaCartPlus
                {...iconeProps}
                color={estaNoCarrinho ? "#1875E8" : iconeProps.color}
                className={styles["item-acao"]}
                onClick={resolveCarrinho}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
