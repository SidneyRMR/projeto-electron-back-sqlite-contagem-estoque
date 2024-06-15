import React from 'react';
import { Modal, Box, Typography, TextField, Button, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ModalEditarProduto({ modalEdicaoAberto, afterOpenModalEdicao, setModalEdicaoAberto, produtoAtual, quantidade, setQuantidade, handleEnvioQuantidade, handleKeyDown }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal
      open={modalEdicaoAberto}
      onClose={() => setModalEdicaoAberto(false)}
      onAfterOpen={afterOpenModalEdicao}
      fullScreen={fullScreen}
    >
      <Box sx={modalStyle}>
        <Toolbar sx={{ bgcolor: 'primary.main', justifyContent: 'center' }}>
          <Typography variant="h6" component="div" sx={{ color: 'primary.contrastText', padding: 2 }}>
            Editar Quantidade do Produto
          </Typography>
        </Toolbar>
        {produtoAtual && (
          <>
            <Typography sx={{ paddingTop: 2, alignItems: 'center'}}>{produtoAtual.nome}</Typography>
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
              <Button
                variant="contained"
                onClick={handleEnvioQuantidade}
                startIcon={<SaveIcon />} // Ícone do Material-UI para Salvar
                sx={{ width: '120px', height: '48px', margin: '8px' }} // Ajustando tamanho e margem
              >
                Salvar
              </Button>
              <Button
                variant="outlined"
                onClick={() => setModalEdicaoAberto(false)}
                startIcon={<CancelIcon />} // Ícone do Material-UI para Cancelar
                sx={{ width: '120px', height: '48px', margin: '8px' }} // Ajustando tamanho e margem
              >
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
  width: '90%', // Largura responsiva
  maxWidth: 400, // Largura máxima para telas maiores
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
