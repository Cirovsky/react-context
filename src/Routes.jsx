import Carrinho from 'pages/Carrinho';
import Feira from 'pages/Feira';
import Login from 'pages/Login';
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {UsuarioProvider } from 'common/contexts/Usuario';

export default function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <UsuarioProvider>
                <Route exact path='/'>
                    <Login/>
                </Route>
                </UsuarioProvider>
                <Route path='/feira'>
                    <Feira/>
                </Route>
                <Route path='/carrinho'>
                    <Carrinho/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
