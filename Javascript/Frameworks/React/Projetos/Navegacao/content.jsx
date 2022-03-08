//Quando eu utilizo o exact eu estou dizendo para a tag Route que ele so vai direcionar para determinada pagina quando o parametro for exatamente igual ao especificado
//Ele é bom para evitar que as outras rotas fiquem presas na mesma rota as vezes pelo detalhe delas comecarem com \

import React from "react";
import './content.css'
import { Switch, Route } from "react-router-dom";
import About from './about'
import Home from './home'
import Param from "./param";
import NotFound from "./notFound";

const Content = (props) => {

    <aside className="content">
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>

            <Route exact path='/about'>
                <About />
            </Route>

            <Route exact path='/param/:id'>
                <Param />
            </Route>
            
            <Route path='*'>
                <NotFound />
            </Route>


        </Switch>
    </aside>
}



export default Content
