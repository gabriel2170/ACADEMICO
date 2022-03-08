//o metodo de useParams serve para implementar o id dos parametros recebidos pelas tags Link e passados palas tags Route
//De forma para podermos representar esses parametros no HTML 

import React from "react";
import { useParams } from 'react-router-dom'

const Param = (props) => {
    const {id} = useParams()
    return (
        <div className="Param">
            <h1>Param</h1>
            <p>Valor: {id}</p>
        </div>
    )
}



export default Param
