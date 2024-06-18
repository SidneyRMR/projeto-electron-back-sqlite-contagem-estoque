import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, useMediaQuery, useTheme, TableSortLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function TabelaDeProdutosMobile({ produtosFiltrados, handleAbrirModalEdicao }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('codigo');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 'calc(93vh - 150px)', overflow: 'auto' }}>
      <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ width:'20%', py: 1 }}>
              <TableSortLabel
                active={orderBy === 'codigo'}
                direction={orderBy === 'codigo' ? order : 'asc'}
                onClick={() => handleRequestSort('codigo')}
                sx={{ color: 'text.primary' }}
                IconComponent={order === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
              >
                CÓD
              </TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ width:'40%', py: 1 }}>
              <TableSortLabel
                active={orderBy === 'nome'}
                direction={orderBy === 'nome' ? order : 'asc'}
                onClick={() => handleRequestSort('nome')}
                sx={{ color: 'text.primary' }}
                IconComponent={order === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
              >
                PRODUTO
              </TableSortLabel>
            </TableCell>
            <TableCell align="center" sx={{ width: '20%', py: 1 }}>ESTOQUE  </TableCell>
              {/* <TableSortLabel
                active={orderBy === 'estoque_atual'}
                direction={orderBy === 'estoque_atual' ? order : 'asc'}
                onClick={() => handleRequestSort('estoque_atual')}
                sx={{ color: 'text.primary' }}
                IconComponent={order === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
              >
                ESTOQUE
              </TableSortLabel> */}
            {/* </TableCell> */}
            <TableCell align="center" sx={{ width: '20%', py: 1 }}>
              AÇÃO
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtosFiltrados && produtosFiltrados
            .sort((a, b) => {
              const isAsc = order === 'asc';
              if (orderBy === 'codigo' || orderBy === 'estoque_atual') {
                return isAsc
                  ? a[orderBy] - b[orderBy]
                  : b[orderBy] - a[orderBy];
              } else {
                return isAsc
                  ? a[orderBy].localeCompare(b[orderBy])
                  : b[orderBy].localeCompare(a[orderBy]);
              }
            })
            .map((produto) => (
              <TableRow key={produto.id}>
                <TableCell align="left" sx={{ py: 1 }}>{produto.codigo}</TableCell>
                <TableCell align="left" sx={{ py: 1 }}>{produto.nome}</TableCell>
                <TableCell align="center" sx={{ py: 1 }}>{produto.estoque_atual || 0}</TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleAbrirModalEdicao(produto)}
                    sx={{
                      minWidth: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      margin: 'auto'
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
