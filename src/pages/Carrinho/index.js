import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext, useMemo, useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useCarrinhoContext} from 'common/contexts/Carrinho';
import { UsuarioContext } from 'common/contexts/Usuario';
import Produto from 'components/Produto';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { usePagamentoContext } from 'common/contexts/Pagamento';

function Carrinho() {

  const history = useHistory();

  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const {total, carrinho, efetuarCompra} = useCarrinhoContext();
  const {saldo} = useContext(UsuarioContext);
  const{tiposPagamentos, formaPagamento, mudarFormaPagamento} = usePagamentoContext();
  const saldoRestante = useMemo(() => Number(saldo) - total,[saldo, total]);
  

  return (

    <Container>
      <Voltar 
      onClick={() => history.goBack()}
      />
      <h2>
        Carrinho
      </h2>
      {carrinho.map(produto => <Produto {...produto} key={produto.id}/>)}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={formaPagamento.id}
          onChange={e => mudarFormaPagamento(e.target.value)}
        >
          {tiposPagamentos.map(p => <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>)}  
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho:</h2>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(saldo).toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Final: </h2>
            <span> R$ {saldoRestante.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          efetuarCompra();
          setOpenSnackbar(true);
        }}
        disabled={saldoRestante < 0 || carrinho.length === 0}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;