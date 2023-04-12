import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCarrinhoContext } from 'common/contexts/Carrinho';
import { useHistory } from 'react-router-dom';


export default function NavBar() {
  const history = useHistory();
  
  const {qtdProdutos}= useCarrinhoContext();
  
  return (
    <Nav> 
      <Logo />
      <IconButton
        disabled={qtdProdutos === 0}
        onClick={() => history.push('/carrinho')}
      >
        <Badge
          color="primary"
          badgeContent={qtdProdutos}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}