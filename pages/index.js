import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { Container, Box } from '@mui/material';
import BarraDeBusca from './components/BarraDeBusca';
import TabelaDeProdutos from './components/TabelaDeProdutos';
import ModalEditarProduto from './components/ModalEditarProduto';
import ModalQRCode from './components/ModalQRCode';
import Header from './components/Header';
import { gerarRelatorioPDF } from './utils/pdfUtils';
import LeitorCodigoBarras from './components/LeitorCodigoBarras'; // Importe o componente

export default function DesktopApp() {
  const [termoBuscaNome, setTermoBuscaNome] = useState('');
  const [termoBuscaCodigo, setTermoBuscaCodigo] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState(null);
  const [quantidade, setQuantidade] = useState(0);
  const [enderecoLocalIP, setEnderecoLocalIP] = useState('');
  const refInputQuantidade = useRef(null);

  useEffect(() => {
    buscarEnderecoLocalIP();
    buscarProdutos();
  }, []);

  const buscarEnderecoLocalIP = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getLocalIP`);
      setEnderecoLocalIP(response.data.ip);
    } catch (error) {
      console.error('Erro ao buscar o endereço IP local:', error);
    }
  };

  const buscarProdutos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/produtos`);
      setProdutos(response.data);
      setProdutosFiltrados(response.data);
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
    }
  };

  const handleMudancaBuscaNome = (event) => {
    setTermoBuscaNome(event.target.value);
    filtrarProdutos(event.target.value, termoBuscaCodigo, 'name');
  };

  const handleMudancaBuscaCodigo = (event) => {
    setTermoBuscaCodigo(event.target.value);
    filtrarProdutos(termoBuscaNome, event.target.value, 'code');
  };

  const filtrarProdutos = (nome, codigo, tipo) => {
    let filtrados = [];
    if (tipo === 'name') {
      filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(nome.toLowerCase())
      );
    } else if (tipo === 'code') {
      filtrados = produtos.filter(produto =>
        String(produto.codigo).includes(codigo)
      );
    }
    setProdutosFiltrados(filtrados);
  };

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

  const handleAbrirModalEdicao = (produto) => {
    setProdutoAtual(produto);
    setQuantidade(produto.estoque_atual);
    setModalEdicaoAberto(true);
  };

  return (
    <Container>
      <Header gerarRelatorioPDF={() => gerarRelatorioPDF(produtosFiltrados)} />
      <Box sx={{ p: 2 }}>
        <BarraDeBusca
          termoBuscaNome={termoBuscaNome}
          termoBuscaCodigo={termoBuscaCodigo}
          handleMudancaBuscaNome={handleMudancaBuscaNome}
          handleMudancaBuscaCodigo={handleMudancaBuscaCodigo}
          //handleLeituraCodigoBarras={handleLeituraCodigoBarras}
          handleAbrirModal={() => setModalAberto(true)}
          isMobile={isMobile}
        />
        <TabelaDeProdutos
          produtosFiltrados={produtosFiltrados}
          handleAbrirModalEdicao={handleAbrirModalEdicao}
        />
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
        <ModalQRCode
          modalAberto={modalAberto}
          setModalAberto={setModalAberto}
          enderecoLocalIP={enderecoLocalIP}
        />
      </Box>
    </Container>
  );
}
