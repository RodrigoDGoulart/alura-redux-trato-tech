import Header from "components/Header";
import styles from "./Carrinho.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Item from "components/Item";
import { resetarCarrinho } from "store/reducers/carrinho";
import Button from '../../components/Button';

export default function Carrinho() {
  const dispatch = useDispatch();

  const { carrinho, total } = useSelector((state) => {
    const regexp = new RegExp(state.busca, "i");
    let total = 0;
    const carrinho = state.carrinho.reduce((itens, itemCarrinho) => {
      const item = state.itens.find((item) => item.id === itemCarrinho.id);
      total += item.preco * itemCarrinho.quantidade;
      if (item.titulo.match(regexp)) {
        itens.push({
          ...item,
          quantidade: itemCarrinho.quantidade,
        });
      }
      return itens;
    }, []);
    return { carrinho, total };
  });

  return (
    <div>
      <Header
        titulo="Carrinho de compras"
        descricao="Confira produtos que você adicionou ao carrinho"
      />
      <div className={styles.carrinho}>
        {carrinho.map((item) => (
          <Item key={item.id} {...item} carrinho />
        ))}
        <div className={styles.total}>
          <strong>Resumo da compra</strong>
          <span>
            Subtotal: <strong>R$ {total.toFixed(2)}</strong>
          </span>
        </div>
        <Button onClick={() => dispatch(resetarCarrinho())}>
          Finalizar compra
        </Button>
      </div>
    </div>
  );
}
