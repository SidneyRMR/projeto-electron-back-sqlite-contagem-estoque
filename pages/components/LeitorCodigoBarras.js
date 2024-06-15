import React, { useRef, useState } from 'react';
import Quagga from 'quagga';
import ModalEditarProduto from './ModalEditarProduto'; // Importe o componente ModalEditarProduto aqui

const LeitorCodigoBarras = ({ produtos, setModalEdicaoAberto, setProdutoAtual }) => {
  const videoRef = useRef(null);
  const [barcode, setBarcode] = useState('');
  const [modalEdicaoAberto, setModalEdicaoAbertoLocal] = useState(false);
  const [quantidade, setQuantidade] = useState(0); // Adicione conforme necessário

  // Ref para input de quantidade (caso seja necessário)
  const refInputQuantidade = useRef(null);

  // Função para iniciar o scanner de código de barras
  const startScanner = () => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: videoRef.current,
        constraints: {
          facingMode: 'environment' // para câmera traseira do celular
        },
      },
      decoder: {
        readers: ['ean_reader'] // ou outros tipos de leitores de acordo com sua necessidade
      }
    }, function(err) {
      if (err) {
        console.error('Erro ao inicializar o scanner:', err);
        return;
      }
      console.log('Scanner inicializado com sucesso');
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      Quagga.stop();
      handleBarcodeDetected(data.codeResult.code);
    });
  };

  // Função para lidar com a detecção do código de barras
  const handleBarcodeDetected = (code) => {
    const produtoEncontrado = produtos.find(produto => produto.codigo === code);
    if (produtoEncontrado) {
      setProdutoAtual(produtoEncontrado);
      setModalEdicaoAbertoLocal(true);
    } else {
      alert('Produto não encontrado');
    }
    setBarcode(code);
  };

  // Função para lidar com o envio da quantidade do produto
  const handleEnvioQuantidade = async () => {
    if (produtoAtual) {
      try {
        await axios.put(`http://localhost:5000/api/produtos/${produtoAtual.id}`, {
          estoque_atual: quantidade
        });
        buscarProdutos();
        setModalEdicaoAberto(false);
        setProdutoAtual(null);
        setQuantidade(0);
      } catch (error) {
        console.error('Erro ao atualizar a quantidade do produto:', error);
      }
    }
  };

  return (
    <div>
      <video ref={videoRef} />
      <button onClick={startScanner}>Iniciar Leitura</button>
      <p>Código de barras lido: {barcode}</p>

      {/* Modal para editar quantidade do produto */}
      <ModalEditarProduto
        modalEdicaoAberto={modalEdicaoAberto}
        afterOpenModalEdicao={() => refInputQuantidade.current && refInputQuantidade.current.focus()}
        setModalEdicaoAberto={setModalEdicaoAbertoLocal} // Use setModalEdicaoAbertoLocal para controlar o estado local
        produtoAtual={produtoAtual}
        quantidade={quantidade}
        setQuantidade={setQuantidade}
        handleEnvioQuantidade={handleEnvioQuantidade}
        handleKeyDown={(e) => e.key === 'Enter' && handleEnvioQuantidade()}
        refInputQuantidade={refInputQuantidade}
      />
    </div>
  );
};

export default LeitorCodigoBarras;
