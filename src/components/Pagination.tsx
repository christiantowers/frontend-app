import { Button, Group } from '@mantine/core';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <Group justify="center" mt="md">
      <Button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Anterior
      </Button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <Button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Próxima
      </Button>
    </Group>
  );
}
