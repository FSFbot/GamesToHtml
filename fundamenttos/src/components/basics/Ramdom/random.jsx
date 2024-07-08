import React, { useState } from 'react';

function RandomNumberGenerator() {
  // Estado para armazenar o número aleatório
  const [randomNumber, setRandomNumber] = useState(null);

  // Função para gerar o número aleatório
  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100) + 1; // Gera um número entre 1 e 100
    setRandomNumber(number); // Atualiza o estado com o novo número
  };

  return (
    <div>
      <h1>Gerador de Números Aleatórios</h1>
      <button onClick={generateRandomNumber}>Gerar Número</button>
      {randomNumber !== null && <p>Número Gerado: {randomNumber}</p>}
    </div>
  );
}

export default RandomNumberGenerator;