import { useState, useContext, createContext, useEffect } from "react"
import { UsuarioContext } from "./Usuario";
import { usePagamentoContext } from "./Pagamento";

const CarrinhoContext = createContext();

CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({ children }) => {

  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [qtdProdutos, setQtdProdutos] = useState(0);

  return (
    <CarrinhoContext.Provider value={{ 
      total, 
      setTotal, 
      qtdProdutos, 
      setQtdProdutos, 
      carrinho, 
      setCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  )
}


export const useCarrinhoContext = () => {
  const { total, setTotal, qtdProdutos, setQtdProdutos, carrinho, setCarrinho } = useContext(CarrinhoContext);
  const { saldo, setSaldo } = useContext(UsuarioContext);
  const {formaPagamento} = usePagamentoContext();

  const addProduto = (item) => {
    if (saldo - total >= Number(item.valor)) {
      const produto = { ...item }
      const temProduto = carrinho.map(item => item.id).indexOf(produto.id);
      if (temProduto !== -1) {
        const novoCarrinho = [...carrinho];
        novoCarrinho[temProduto].qtd += 1;
        setCarrinho(novoCarrinho);
      } else {
        produto.qtd = 1;
        const novoCarrinho = [...carrinho, produto];
        setCarrinho(novoCarrinho);
      }
    }
  }

  const decProduto = (id) => {
    const temProduto = carrinho.map(item => item.id).indexOf(id);
    if (temProduto !== -1) {
      const novoCarrinho = [...carrinho];
      if (novoCarrinho[temProduto].qtd > 0) {
        novoCarrinho[temProduto].qtd -= 1;
        if (novoCarrinho[temProduto].qtd === 0) {
          novoCarrinho.splice(temProduto, 1);
        }
      }
      setCarrinho(novoCarrinho);
    }
  }

  function efetuarCompra (){
    setCarrinho([]);
    setSaldo(saldoAtual => saldoAtual - total)
  }

  useEffect(() => {
    const novaQtd = carrinho.reduce((contador, produto) => contador + produto.qtd, 0);
    const parcial = carrinho.length > 0 ? carrinho.map(item => item.qtd * Number(item.valor)).reduce((a, b) => a + b) : 0;
    setQtdProdutos(novaQtd);
    setTotal(parcial * formaPagamento.juros);
  }, [setQtdProdutos,carrinho,setTotal, formaPagamento]);

  return {
    total,
    carrinho,
    qtdProdutos,
    addProduto,
    decProduto,
    efetuarCompra
  }
}