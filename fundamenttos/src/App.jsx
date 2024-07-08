import React from "react";
import Card from './components/basics/Card/Card';
import RandomNumberGenerator from "./components/basics/Ramdom/random";
import "./app.css";

export default function App() {
    return (
        <>
            <Card titulo="Apresentação Pessoal">
                <p>Estou aprendendo os fundamentos do react aqui na minha máquina</p>
            </Card>
           
            <Card titulo = "Desafio do gerador de numero aleatórios">
              <RandomNumberGenerator/>
            </Card>
            <br></br>
            <br></br>
        </>
    );
}
