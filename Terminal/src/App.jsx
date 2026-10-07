import React, { useState } from 'react';
import './index.css';

export default function App() {
  // RF2: A lista de ideias começa vazia
  const [ideias, setIdeias] = useState([]);
  // RF1: Estado controlado para o texto do input
  const [textoIdeia, setTextoIdeia] = useState('');
  // RF6: Estado para guardar a mensagem de validação
  const [erro, setErro] = useState('');

  // RF1: Função de disparo do formulário
  function handleSubmit(e) {
    e.preventDefault();

    // RF6: Se estiver vazio, exibe o erro exato exigido pelo professor
    if (!textoIdeia.trim()) {
      setErro('Digite sua ideia antes de adicionar.');
      return;
    }

    // RF1 e RF2: Adiciona a nova ideia com o formato correto (feita: false)
    setIdeias((prev) => [
      ...prev,
      { 
        id: Date.now(), // Dica do RF2: ID gerado com base no tempo atual
        texto: textoIdeia.trim(), 
        feita: false // RF3: Propriedade booleana para controle de conclusão
      }
    ]);
            
    // Limpa os campos após o sucesso
    setTextoIdeia('');
    setErro('');
  }

  // RF1: Limpa a mensagem de erro assim que o usuário volta a digitar
  function handleInputChange(e) {
    setTextoIdeia(e.target.value);
    if (erro) {
      setErro('');
    }
  }

  // RF3: Altera a propriedade 'feita' sem mutar o estado original
  function handleAlternarConcluida(id) {
    setIdeias((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, feita: !item.feita } : item
      )
    );
  }

  // RF4: Remove a ideia gerando um novo array através do .filter()
  function handleRemover(id) {
    setIdeias((prev) => prev.filter((item) => item.id !== id));
  }

  // RF5: Contadores derivados diretamente do estado original (sem estado duplicado)
  const totalIdeias = ideias.length;
  const ideiasConcluidas = ideias.filter((item) => item.feita).length;

  return (
    <main className="container">
      <h1>Painel de Ideias</h1>

      {/* RF1: Formulário controlado com onSubmit */}
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

      {/* RF6: Renderização condicional da mensagem de erro usando && */}
      {erro && <p className="error-message" style={{ color: 'red' }}>{erro}</p>}

      {/* Exibição da lista ou mensagem de vazio */}
      {ideias.length === 0 ? (
        <p className="empty-message">Nenhuma ideia anotada.</p>
      ) : (
        <div className="lista-ideias">
          {ideias.map((ideia) => (
            <div key={ideia.id} className="item-ideia">
              {/* RF3: Aplica estilo condicional riscado se a ideia estiver feita */}
              <span 
                style={{ textDecoration: ideia.feita ? 'line-through' : 'none' }}
                onClick={() => handleAlternarConcluida(ideia.id)}
                className="texto-ideia"
              >
                {ideia.texto}
              </span>

              <div className="item-acoes">
                {/* RF3: Checkbox ou botão para alternar status */}
                <input 
                  type="checkbox" 
                  checked={ideia.feita} 
                  onChange={() => handleAlternarConcluida(ideia.id)} 
                />
                
                {/* RF4: Botão de exclusão */}
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

      {/* RF5: Rodapé com template string derivando os contadores em tempo real */}
      <footer className="rodape">
        <p>{`${totalIdeias} ideias no painel · ${ideiasConcluidas} concluídas`}</p>
      </footer>
    </main>
  );
}