

import { useState } from 'react'; // Vírgula removida aqui
import './index.css';

export default function App() {
  const [ideias, setIdeias] = useState([]);
  const [textoIdeia, setTextoIdeia] = useState('');
  const [erro, setErro] = useState('');

  // RF1: Função de disparo do formulário
  function handleSubmit(e) {
    e.preventDefault();
    if (!textoIdeia.trim()) {
      setErro('Digite sua ideia antes de adicionar.');
      return;
    }

    setIdeias((prev) => [
      ...prev,
      { id: Date.now(), texto: textoIdeia.trim(), feita: false }
    ]);
    setTextoIdeia('');
    setErro('');
  }

  function handleInputChange(e) {
    setTextoIdeia(e.target.value);
    if (erro) {
      setErro('');
    }
  }

  function handleAlternarConcluida(id) {
    setIdeias((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, feita: !item.feita } : item
      )
    );
  }

  function handleRemover(id) {
    setIdeias((prev) => prev.filter((item) => item.id !== id));
  }

  // RF5: Contadores derivados diretamente do estado original
  const totalIdeias = ideias.length;
  const ideiasConcluidas = ideias.filter((item) => item.feita).length;

  return (
    <main className="container">
      <h1>Painel de Ideias</h1>

      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          placeholder="O que tem em mente?"
          value={textoIdeia}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn-salvar">
          Adicionar
        </button>
      </form>

      {erro && <p className="error-message" style={{ color: 'red' }}>{erro}</p>}

      {ideias.length === 0 ? (
        <p className="empty-message">Nenhuma ideia anotada.</p>
      ) : (
        <div className="lista-ideias">
          {ideias.map((ideia) => (
            <div key={ideia.id} className="item-ideia">
              <span
                style={{ textDecoration: ideia.feita ? 'line-through' : 'none' }}
                onClick={() => handleAlternarConcluida(ideia.id)}
                className="texto-ideia"
              >
                {ideia.texto}
              </span>
              
              <div className="item-acoes">
                <input
                  type="checkbox"
                  checked={ideia.feita}
                  onChange={() => handleAlternarConcluida(ideia.id)}
                />
                <button
                  type="button"
                  className="btn-remover"
                  onClick={() => handleRemover(ideia.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="rodape">
        <p>{`${totalIdeias} ideias no painel · ${ideiasConcluidas} concluídas`}</p>
      </footer>
    </main>
  );
}