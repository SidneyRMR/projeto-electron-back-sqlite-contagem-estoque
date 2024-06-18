import React, { useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const TabelaDeProdutos = ({ produtosFiltrados, handleAbrirModalEdicao }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEditClick = useCallback((produto) => {
    handleAbrirModalEdicao(produto);
  }, [handleAbrirModalEdicao]);

  return (
    <Box sx={{ overflowX: 'auto', m:0 }}>
      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 145px)', overflow: 'auto' }}>
        <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell align="left" sx={{ width: isMobile ? '20%' : '15%', py: 1 }}>CÓDIGO</TableCell>
              <TableCell align="left" sx={{ width: isMobile ? '40%' : '50%', py: 1 }}>NOME DO PRODUTO</TableCell>
              <TableCell align="center" sx={{ width: isMobile ? '20%' : '20%', py: 1 }}>ESTOQUE</TableCell>
              <TableCell align="center" sx={{ width: isMobile ? '20%' : '15%', py: 1 }}>AÇÃO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtosFiltrados && produtosFiltrados.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell align="left" sx={{ py: 1 }}>{produto.codigo}</TableCell>
                <TableCell align="left" sx={{ py: 1 }}>{produto.nome}</TableCell>
                <TableCell align="center" sx={{ py: 1 }}>{produto.estoque_atual || 0}</TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleEditClick(produto)}
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
                    {!isMobile && <span style={{ marginLeft: 5, padding: 2 }}>EDITAR</span>}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default React.memo(TabelaDeProdutos);
