import { Container } from './styles';
import { memo} from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext } from 'common/contexts/Carrinho';


function Produto(produto) {
const {carrinho, addProduto, decProduto}= useCarrinhoContext();
const {nome, foto, id, valor} = produto;
const qtd = carrinho.some(item => item.id === id)? carrinho.find(item => item.id === id).qtd : 0;

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
            onClick={ () => decProduto(produto.id)}
            color="secondary"
          >
            <RemoveIcon />
          </IconButton>
          <span>{qtd}</span>
          <IconButton
            onClick={ () => addProduto(produto)}
            color="primary"
          >
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)