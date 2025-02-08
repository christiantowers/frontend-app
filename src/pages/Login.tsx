import { useState } from 'react';
import { Button, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Layout title="Acesso ao Sistema">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Title order={2} mb="md">
          Bem-vindo de volta!
        </Title>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="Digite seu email"
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
            <Button type="submit" fullWidth>
              Entrar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
}
