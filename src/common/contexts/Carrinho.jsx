import { useState, createContext } from "react"

export const CarrinhoContext = createContext();

CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({children}) =>{
const [carrinho, setCarrinho] = useState([]);
const [total, setTotal] = useState(0);
    return(
        <CarrinhoContext.Provider value={{carrinho, setCarrinho, total, setTotal}}>
            {children}
        </CarrinhoContext.Provider>
    )
}