import React, { useState } from 'react';
import './index.css';

export default function App() {
  const [ideias, setIdeias] = useState([]);
  const [textoIdeia, setTextoIdeia] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!textoIdeia.trim()) return;

    setIdeias((prev) => [
      ...prev,
      { id: crypto.randomUUID(), texto: textoIdeia.trim(), curtidas: 0 }
    ]);
    setTextoIdeia('');
  }

  function handleCurtir(id) {
    setIdeias((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, curtidas: item.curtidas + 1 } : item
      )
    );
  }

  function handleRemover(id) {
    setIdeias((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <main className="container">
      <h1>Minhas Ideias</h1>

      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          placeholder="O que tem em mente?"
          value={textoIdeia}
          onChange={(e) => setTextoIdeia(e.target.value)}
        />
        <button type="submit" className="btn-salvar">
          Salvar
        </button>
      </form>

      {ideias.length === 0 ? (
        <p className="empty-message">Nenhuma ideia anotada.</p>
      ) : (
        <div className="lista-ideias">
          {ideias.map((ideia) => (
            <div key={ideia.id} className="item-ideia">
              <span>{ideia.texto}</span>
              <div className="item-acoes">
                <button
                  type="button"
                  className="btn-curtir"
                  onClick={() => handleCurtir(ideia.id)}
                >
                  Curtir ({ideia.curtidas})
                </button>
                <button
                  type="button"
                  className="btn-remover"
                  onClick={() => handleRemover(ideia.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}