import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell, Button, Container, Title } from '@mantine/core';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="lg">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <Title order={3} mt="xs">
              {title}
            </Title>
            <Button mt="sm" onClick={() => navigate('/')} color="gray">
              Voltar para Home
            </Button>
          </div>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" py="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
