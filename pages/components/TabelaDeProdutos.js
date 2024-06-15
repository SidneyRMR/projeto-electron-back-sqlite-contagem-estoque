import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

export default function TabelaDeProdutos({ produtosFiltrados, handleAbrirModalEdicao }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nome do Produto</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtosFiltrados.map(produto => (
            <TableRow key={produto.id}>
              <TableCell>{produto.codigo}</TableCell>
              <TableCell>{produto.nome}</TableCell>
              <TableCell>{produto.estoque_atual || 0}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleAbrirModalEdicao(produto)}>Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
