import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, NumberInput, Paper, Stack, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Layout from '../components/Layout';
import api from '../services/api';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>(0);
  const [stockQuantity, setStockQuantity] = useState<number | ''>(0);

  useEffect(() => {
    if (id) {
      api.get(`/product/${id}`).then((response) => {
        setName(response.data.name);
        setDescription(response.data.description || '');
        setPrice(response.data.price);
        setStockQuantity(response.data.stock_quantity);
      });
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const productData = {
        name,
        description,
        price: Number(price),
        stock_quantity: Number(stockQuantity),
      };

      let response;
      if (id) {
        response = await api.put(`/product/${id}`, productData);
      } else {
        response = await api.post('/product', productData);
      }

      notifications.show({ title: 'Sucesso!', message: response.data.message, color: 'green' });
      navigate('/products');
    } catch (error) {
      notifications.show({ title: 'Erro!', message: 'Falha ao salvar produto.', color: 'red' });
    }
  };

  return (
    <Layout title={id ? 'Editar Produto' : 'Novo Produto'}>
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Textarea
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <NumberInput
              label="Preço"
              value={price}
              onChange={(value) => setPrice(value as number)}
              min={0}
              step={0.01}
              decimalSeparator="."
              required
            />
            <NumberInput
              label="Quantidade em Estoque"
              value={stockQuantity}
              onChange={(value) => setStockQuantity(value as number)}
              min={0}
              required
            />

            <Button fullWidth type="submit">
              {id ? 'Salvar' : 'Adicionar'}
            </Button>
            <Button fullWidth type="button" onClick={() => navigate('/products')} color="red">
              Cancelar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
}
