import Header from "components/Header";
import styles from "./Carrinho.module.scss";
import { useSelector } from "react-redux";
import Item from "components/Item";

export default function Carrinho() {
  const { carrinho, total } = useSelector((state) => {
    let total = 0;
    const carrinho = state.carrinho.reduce((itens, itemCarrinho) => {
      const item = state.itens.find((item) => item.id === itemCarrinho.id);
      total += (item.preco * itemCarrinho.quantidade)
      itens.push({
        ...item,
        quantidade: itemCarrinho.quantidade,
      });
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
        {carrinho.map(item => <Item key={item.id} {...item} carrinho />)}
        <div className={styles.total}>
          <strong>
            Resumo da compra
          </strong>
          <span>
            Subtotal: <strong>R$ {(total).toFixed(2)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
