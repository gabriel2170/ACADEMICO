//o metodo Link tem o mesmo conceito de uma tag a, ela tbm faz um link com um elemento pra no momento que vc clicar nele ele direciona para a pagina que foi informada na tag
//nesse caso ele esta sendo usado para direcionar para um outro component desse projeto
//repara que podemos tbm incluir parametros nos enderecos dos links , de forma que esses parametros sao passados pelos components informados nas tags Route dentro da tag Switch



import React from "react";
import './menu.css'
import {Link} from 'react-router-dom'

const Menu = (props)=>{

    <aside className="menu">
        <nav>
            <ul>
                <li>
                    <Link to='/'>Inicio</Link>
                </li>
            
                <li>
                    <Link to='/param/321'>Param #01</Link>
                </li>
                <li>
                    <Link to='/param'>Param #02</Link>
                </li>
                <li>
                    <Link to='/about'>Sobre</Link>
                </li>
                <li>
                    <Link to='/naoExiste'>Nao existe</Link>
                </li>
            </ul>
        </nav>
    </aside>
}



export default Menu
