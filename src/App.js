import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])
  async function handleAddRepository() {
    // TODO
    const mockRepository = {title: 'Desafio ReactJS', url: 'mock.com', techs: 'mocktech1, mocktech2, mocktech3'}
    api.post('/repositories', mockRepository).then(response => {
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    // TODO
    api.delete(`/repositories/${id}`).then(response => {
      setRepositories(repositories.filter(repository => repository.id!==id))
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover 
          </button>
        </li>
      )
      )}  
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
