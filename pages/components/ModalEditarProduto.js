import React, { useCallback, useMemo } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const ModalEditarProduto = ({
  modalEdicaoAberto,
  afterOpenModalEdicao,
  setModalEdicaoAberto,
  produtoAtual,
  quantidade,
  setQuantidade,
  handleEnvioQuantidade,
  handleKeyDown,
}) => {
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = useCallback(() => setModalEdicaoAberto(false), [setModalEdicaoAberto]);
  const handleChange = useCallback((e) => setQuantidade(e.target.value), [setQuantidade]);

  const modalStyle = useMemo(
    () => ({
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%', // Largura responsiva
      maxWidth: 400, // Largura máxima para telas maiores
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 2,
    }),
    []
  );

  return (
    <Modal
      open={modalEdicaoAberto}
      onClose={handleClose}
      onAfterOpen={afterOpenModalEdicao}
      // fullScreen={fullScreen}
    >
      <Box sx={modalStyle}>
        <Toolbar sx={{ bgcolor: 'primary.main', justifyContent: 'center', m: 0, p: 0 }}>
          <Typography variant="h7" component="div" sx={{ color: 'primary.contrastText', padding: 0 }}>
            EDITAR QUANTIDADE DO PRODUTO
          </Typography>
        </Toolbar>
        {produtoAtual && (
          <>
            <Typography sx={{ paddingTop: 2, alignItems: 'center' }}>{produtoAtual.nome}</Typography>
            <TextField
              autoFocus
              type="number"
              value={quantidade}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              fullWidth
              margin="normal"
            />
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={handleClose}
                startIcon={<CancelIcon />} // Ícone do Material-UI para Cancelar
                sx={{ width: '120px', height: '48px', margin: '8px', bgcolor: 'secondary.main', color:'#FFFFFF'}} // Ajustando tamanho e margem
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleEnvioQuantidade}
                startIcon={<SaveIcon />} // Ícone do Material-UI para Salvar
                sx={{ width: '120px', height: '48px', margin: '8px', bgcolor: 'primary.main' }} // Ajustando tamanho e margem
              >
                Salvar
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default React.memo(ModalEditarProduto);
