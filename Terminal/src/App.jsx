import React, { useState } from 'react';
import './index.css';

// Componente para exibir o cartão da ideia
function CardIdeia({ item, onCurtir, onDeletar }) {
  return (
    <div className="card">
      <p className="conteudo">{item.titulo}</p>
      <div className="botoes-card">
        <button className="btn-like" onClick={() => onCurtir(item.id)}>
          Curtir ({item.curtidas})
        </button>
        <button className="btn-apagar" onClick={() => onDeletar(item.id)}>
          Remover
        </button>
      </div>
    </div>
  );
}

export default function App() {
  // Lista inicial
  const [ideias, setIdeias] = useState([
    { id: 1, titulo: 'Criar app em React', curtidas: 3 },
    { id: 2, titulo: 'Modo Escuro no Painel', curtidas: 5 }
  ]);

  const [texto, setTexto] = useState('');

  // Adiciona item na lista usando concat
  const criarNovaIdeia = (e) => {
    e.preventDefault();
    if (texto.trim() === '') return;

    const objetoIdeia = {
      id: Date.now(),
      titulo: texto.trim(),
      curtidas: 0
    };

    setIdeias(ideias.concat(objetoIdeia));
    setTexto('');
  };

  // Incrementa curtidas
  const incrementarCurtida = (idAlvo) => {
    const listaAtualizada = ideias.map((elemento) => {
      if (elemento.id === idAlvo) {
        return { ...elemento, curtidas: elemento.curtidas + 1 };
      }
      return elemento;
    });
    setIdeias(listaAtualizada);
  };

  // Remove item da lista
  const removerIdeia = (idAlvo) => {
    setIdeias(ideias.filter((elemento) => elemento.id !== idAlvo));
  };

  return (
    <div className="painel-principal">
      <header className="cabecalho">
        <h1>Suas Ideias</h1>
      </header>

      <form onSubmit={criarNovaIdeia} className="campo-add">
        <input
          type="text"
          placeholder="O que você está pensando?"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit" className="btn-confirmar">Salvar</button>
      </form>

      <section className="grade-ideias">
        {ideias.length === 0 ? (
          <p className="mensagem-vazia">Sem sugestões no momento.</p>
        ) : (
          ideias.map((ideia) => (
            <CardIdeia
              key={ideia.id}
              item={ideia}
              onCurtir={incrementarCurtida}
              onDeletar={removerIdeia}
            />
          ))
        )}
      </section>
    </div>
  );
}