import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Paper, PasswordInput, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Layout from '../components/Layout';
import api from '../services/api';

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/user/${id}`).then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
      });
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      let response;

      if (id) {
        response = await api.put(`/user/${id}`, { name, email, password });
      } else {
        response = await api.post('/user', { name, email, password });
      }

      // Exibir notificação de sucesso
      notifications.show({
        title: 'Sucesso!',
        message: response.data.message || 'Operação realizada com sucesso.',
        color: 'green',
      });

      // Redirecionar apenas após o sucesso
      navigate('/users');
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro inesperado.';

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      notifications.show({
        title: 'Erro!',
        message: errorMessage,
        color: 'red',
      });
    }
  };

  return (
    <Layout title={id ? 'Editar Usuário' : 'Novo Usuário'}>
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextInput
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button fullWidth type="submit">
              {id ? 'Salvar' : 'Adicionar'}
            </Button>
            <Button fullWidth type="button" onClick={() => navigate('/users')} color="red">
              Cancelar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
}
