import React from 'react';
import { Modal, Box, Typography, TextField, Button, Toolbar } from '@mui/material';

export default function ModalEditarProduto({ modalEdicaoAberto, afterOpenModalEdicao, setModalEdicaoAberto, produtoAtual, quantidade, setQuantidade, handleEnvioQuantidade, handleKeyDown }) {
  return (
    <Modal
      open={modalEdicaoAberto}
      onClose={() => setModalEdicaoAberto(false)}
      onAfterOpen={afterOpenModalEdicao}
    >
      <Box sx={modalStyle}>
        <Toolbar sx={{ bgcolor: 'primary.main', justifyContent: 'center' }}>
          <Typography variant="h6" component="div" sx={{ color: 'primary.contrastText' }}>
            Editar Quantidade do Produto
          </Typography>
        </Toolbar>
        {produtoAtual && (
          <>
            <Typography>{produtoAtual.nome}</Typography>
            <TextField
              autoFocus
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              onKeyDown={handleKeyDown}
              fullWidth
              margin="normal"
            />
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="contained" onClick={handleEnvioQuantidade}>
                Salvar
              </Button>
              <Button variant="outlined" onClick={() => setModalEdicaoAberto(false)} sx={{ ml: 2 }}>
                Cancelar
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
