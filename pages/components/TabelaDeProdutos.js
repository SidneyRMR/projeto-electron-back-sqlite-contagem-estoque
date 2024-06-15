import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function TabelaDeProdutosMobile({ produtosFiltrados, handleAbrirModalEdicao }) {

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 150px)', overflow: 'auto' }}>
        <Table stickyHeader sx={{ width: '100%', tableLayout: 'fixed' }}>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell align="left" sx={{ width: '15%', py: 1 }}>CÓDIGO</TableCell>
              <TableCell align="left" sx={{ width: '50%', py: 1 }}>NOME DO PRODUTO</TableCell>
              <TableCell align="center" sx={{ width: '20%', py: 1 }}>QUANTIDADE</TableCell>
              <TableCell align="center" sx={{ width: '15%', py: 1 }}>AÇÃO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtosFiltrados.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell align="left" sx={{ py: 1 }}>{produto.codigo}</TableCell>
                <TableCell align="left" sx={{ py: 1 }}>{produto.nome}</TableCell>
                <TableCell align="center" sx={{ py: 1 }}>{produto.estoque_atual || 0}</TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleAbrirModalEdicao(produto)}
                    sx={{
                      minWidth: 50,
                      height: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 2,
                      margin: 0,
                    }}
                  >
                    <EditIcon />
                    <span style={{ marginLeft: 5 , padding: 2}}>EDITAR</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
