
import React from "react";
import './app.css'
import Menu from './menu'
import Content from './content'
import { BrowserRouter as Router} from "react-router-dom";

const App = (props) => {
    <div className="app">
        <Router>
            <Menu></Menu>
            <Content></Content>
        </Router>
    </div>
}

export default App