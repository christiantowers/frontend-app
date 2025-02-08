import { useEffect, useState } from 'react';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Button, Flex, Group, Paper, Table, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  created_at: string; // Assumindo que vem no formato ISO (ex: "2024-02-07T12:30:00Z")
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    api
      .get('/product')
      .then((response) => {
        setProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      })
      .catch((error) => console.error('Erro ao buscar produtos', error));
  }, []);

  const handleDelete = (productId: number) => {
    api
      .delete(`/product/${productId}`)
      .then((response) => {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        setTotalPages(Math.ceil(products.length / itemsPerPage)); // Atualiza total de páginas
        notifications.show({ title: 'Sucesso', message: response.data.message, color: 'green' });
      })
      .catch(() => {
        notifications.show({ title: 'Erro', message: 'Falha ao excluir produto.', color: 'red' });
      });
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout title="Gerenciamento de Produtos">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Group justify="space-between" mb={20}>
          <Title order={2}>Produtos</Title>
          <Button leftSection={<IconPlus size={16} />} onClick={() => navigate('/products/new')}>
            Adicionar Produto
          </Button>
        </Group>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', width: '40px' }}>ID</th>
              <th style={{ textAlign: 'left' }}>Nome</th>
              <th style={{ textAlign: 'left' }}>Descrição</th>
              <th style={{ textAlign: 'left' }}>Preço</th>
              <th style={{ textAlign: 'left' }}>Estoque</th>
              <th style={{ textAlign: 'left' }}>Criado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td style={{ textAlign: 'left' }}>{product.name}</td>
                <td style={{ textAlign: 'left' }}>{product.description || 'Sem descrição'}</td>
                <td>R${(Number(product.price) || 0).toFixed(2)}</td>
                <td>{product.stock_quantity}</td>
                <td>{new Date(product.created_at).toLocaleDateString('pt-BR')}</td>
                <td>
                  <Flex justify="center">
                    <Group gap="xs">
                      <ActionIcon
                        color="blue"
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                      >
                        <IconEdit size={18} />
                      </ActionIcon>
                      <ActionIcon color="red" onClick={() => handleDelete(product.id)}>
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Group>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Paginação */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Paper>
    </Layout>
  );
}
