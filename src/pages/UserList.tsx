import { useEffect, useState } from 'react';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Button, Flex, Group, Paper, Table, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Layout from '../components/Layout';
import api from '../services/api';

interface User {
  id: number;
  email: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/user')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Erro ao buscar usuários', error));
  }, []);

  const handleDelete = (userId: number) => {
    api
      .delete(`/user/${userId}`)
      .then((response) => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
        notifications.show({
          title: 'Sucesso',
          message: response.data.message, // Mensagem vinda do backend
          color: 'green',
        });
      })
      .catch(() => {
        notifications.show({
          title: 'Erro',
          message: 'Falha ao excluir usuário.',
          color: 'red',
        });
      });
  };

  return (
    <Layout title="Gerenciamento de Usuários">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Group justify="space-between" mb={20}>
          <Title order={2}>Usuários</Title>

          <Button leftSection={<IconPlus size={16} />} onClick={() => navigate('/users/new')}>
            Adicionar Usuário
          </Button>
        </Group>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>ID</th>
              <th style={{ textAlign: 'left' }}>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td style={{ textAlign: 'left' }}>{user.email}</td>
                <td>
                  <Flex justify="center">
                    <Group gap="xs">
                      <ActionIcon color="blue" onClick={() => navigate(`/users/edit/${user.id}`)}>
                        <IconEdit size={18} />
                      </ActionIcon>
                      <ActionIcon color="red" onClick={() => handleDelete(user.id)}>
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Group>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Layout>
  );
}
