import React, { useRef, useState } from 'react';
import Quagga from 'quagga';
import ModalEditarProduto from './ModalEditarProduto'; // Importe o componente ModalEditarProduto aqui

const BarcodeScanner = ({ produtos, setModalEdicaoAberto, setProdutoAtual }) => {
  const videoRef = useRef(null);
  const [barcode, setBarcode] = useState('');
  const [modalEdicaoAberto, setModalEdicaoAbertoLocal] = useState(false);

  // Inicializa o scanner de código de barras
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

  return (
    <div>
      <video ref={videoRef} />
      <button onClick={startScanner}>Iniciar Leitura</button>
      <p>Código de barras lido: {barcode}</p>

      {/* Modal para editar quantidade do produto */}
      <ModalEditarProduto
          modalEdicaoAberto={modalEdicaoAberto}
          afterOpenModalEdicao={() => refInputQuantidade.current && refInputQuantidade.current.focus()}
          setModalEdicaoAberto={setModalEdicaoAberto}
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

export default BarcodeScanner;
