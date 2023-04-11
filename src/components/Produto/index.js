import { Container } from './styles';
import { memo, useContext, useState } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { CarrinhoContext } from 'common/contexts/Carrinho';
import { UsuarioContext } from 'common/contexts/Usuario';

function Produto({nome, foto, id, valor, unidade}) {

  const {carrinho, setCarrinho, total, setTotal} = useContext(CarrinhoContext);
  const {saldo} = useContext(UsuarioContext);
  const [qtd, setQtd] = useState(0);

  const alteraQtd = (operacao) => {
    const index = carrinho.map(p => p.id).indexOf(id);
    if(saldo - total >= valor){
      if(operacao === 'add'){
        const soma = qtd + 1;
        setQtd(soma);
        if (index === -1){
          const novoProduto = {nome: nome, foto: foto, id: id, qtd: soma, valor: valor};
          const novoCarrinho = [...carrinho, novoProduto];
          setCarrinho(novoCarrinho);
          calcTotal(novoCarrinho);
        }else{
          const novoCarrinho = [...carrinho];
          novoCarrinho[index].qtd = soma;
          setCarrinho(novoCarrinho);
          calcTotal(novoCarrinho);
        }
      }
    }

    if(operacao === 'sub'){
      if(qtd > 0){
        const subtracao = qtd - 1;
        setQtd(subtracao);
        const novoCarrinho = [...carrinho];
        novoCarrinho[index].qtd = subtracao;
        setCarrinho(novoCarrinho);
        calcTotal(novoCarrinho);
      }
      if(qtd === 0){
        if(index !== -1){
          const novoCarrinho = [...carrinho];
          novoCarrinho.splice(index, 1);
          setCarrinho(novoCarrinho);
          calcTotal(novoCarrinho);
        }
      }
    }
  }

  const calcTotal = (carrinho) => {
      const novoTotal = carrinho.length > 0 ? carrinho.map( p =>{ 
        return p.qtd * p.valor}).reduce((acc, current) => acc+current) : total;
        setTotal(novoTotal);
    
  }

  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            onClick={ () => alteraQtd('sub')}
            color="secondary"
          >
            <RemoveIcon />
          </IconButton>
          <span>{qtd}</span>
          <IconButton
            onClick={ () => alteraQtd('add')}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)