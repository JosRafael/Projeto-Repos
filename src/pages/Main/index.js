import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';
import api from '../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [error, setError] = useState(null); // Adicionar estado de erro

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      try {
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name,
        };

        setRepositorios([...repositorios, data]);
        setNewRepo('');
        setError(null); // Resetar erro ao obter sucesso
      } catch (error) {
        setError('Repositório não encontrado'); // Definir mensagem de erro
      }
    }

    submit();
  }, [newRepo, repositorios]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton type="submit">
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>

      {error && <p>{error}</p>} 
    </Container>
  );
}
