import {
  Container,
  Header,
  Lista,
} from './styles';
import feira from './feira.json';
import Produto from 'components/Produto';
import NavBar from './NavBar';
import { useContext } from 'react';
import { UsuarioContext } from 'common/contexts/Usuario';
import { useCarrinhoContext } from 'common/contexts/Carrinho';


function Feira() {
  const {nome, saldo} = useContext(UsuarioContext);
  const {total} = useCarrinhoContext();
  const parcial = saldo - total;
  return (
    <Container>
      <NavBar />
      <Header>
        <div>
          <h2> Olá! {nome}</h2>
          <h3> Saldo: R$ {(parcial).toFixed(2)}</h3>
        </div>
        <p>Encontre os melhores produtos orgânicos!</p>
      </Header>
      <Lista>
        <h2>
          Produtos:
        </h2>
        {feira.map(produto => (
          <Produto
            {...produto}
            key={produto.id}
          />
        ))}
      </Lista>
    </Container>
  )
}

export default Feira;