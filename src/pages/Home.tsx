import { IconPackage, IconUsers } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Card, Flex, SimpleGrid, Text, Title } from '@mantine/core';
import Layout from '../components/Layout';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout title="Dashboard">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        {/* Card de Usuários */}
        <Card
          shadow="md"
          radius="md"
          p="lg"
          withBorder
          style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
          onClick={() => navigate('/users')}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Flex align="center" gap="md">
            <ActionIcon size={50} radius="xl" color="blue" variant="light">
              <IconUsers size={30} />
            </ActionIcon>
            <div>
              <Title order={3}>Usuários</Title>
              <Text size="sm" color="dimmed">
                Gerencie os usuários do sistema: visualize, edite e exclua registros facilmente.
              </Text>
            </div>
          </Flex>
        </Card>

        {/* Card de Produtos */}
        <Card
          shadow="md"
          radius="md"
          p="lg"
          withBorder
          style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
          onClick={() => navigate('/products')}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Flex align="center" gap="md">
            <ActionIcon size={50} radius="xl" color="green" variant="light">
              <IconPackage size={30} />
            </ActionIcon>
            <div>
              <Title order={3}>Produtos</Title>
              <Text size="sm" color="dimmed">
                Gerencie os produtos cadastrados: visualize, edite e exclua itens do catálogo.
              </Text>
            </div>
          </Flex>
        </Card>
      </SimpleGrid>
    </Layout>
  );
}
