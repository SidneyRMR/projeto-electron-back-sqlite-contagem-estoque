import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Container, Box } from '@mui/material';
import BarraDeBusca from './components/BarraDeBusca';
import TabelaDeProdutosMobile from './components/TabelaDeProdutosMobile';
import ModalEditarProduto from './components/ModalEditarProduto';
import Header from './components/Header';
import { gerarRelatorioPDF } from '../utils/pdfUtils';

export default function MobileApp() {
  const [termoBuscaNome, setTermoBuscaNome] = useState('');
  const [termoBuscaCodigo, setTermoBuscaCodigo] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState(null);
  const [quantidade, setQuantidade] = useState(0);
  const [enderecoLocalIP, setEnderecoLocalIP] = useState('');

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const enderecoIP = await buscarEnderecoLocalIP();
        setEnderecoLocalIP(enderecoIP);

        const produtosResponse = await buscarProdutos(enderecoIP);
        setProdutos(produtosResponse);
        setProdutosFiltrados(produtosResponse);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      }
    };

    carregarDadosIniciais();
  }, []);


  const buscarEnderecoLocalIP = async () => {
    try {
      // Obtenha a string de consulta da URL atual
      const queryString = window.location.search;
  
      // Parse a string de consulta para extrair os parâmetros
      const urlParams = new URLSearchParams(queryString);
  
      // Obtenha o valor do parâmetro enderecoLocalIP
      const enderecoIP = urlParams.get('enderecoLocalIP');
  
      if (!enderecoIP) {
        throw new Error('Parâmetro enderecoLocalIP não encontrado na URL');
      }
  
      return enderecoIP;
    } catch (error) {
      console.error('Erro ao buscar o endereço IP local:', error);
      throw error;
    }
  };

  const buscarProdutos = async (enderecoIP) => {
    try {
      const response = await axios.get(`http://${enderecoLocalIP}:5000/api/produtos`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
      throw error;
    }
  };

  const handleEnvioQuantidade = async () => {
    try {
      if (produtoAtual) {
        const response = await axios.put(`http://${enderecoLocalIP}:5000/api/produtos/${produtoAtual.id}`, {
          estoque_atual: quantidade
        });

        if (response.status === 200) {
          // Atualiza a quantidade no produto atual
          const produtosAtualizados = produtos.map(produto =>
            produto.id === produtoAtual.id ? { ...produto, estoque_atual: quantidade } : produto
          );

          // Atualiza as listas de produtos
          setProdutos(produtosAtualizados);
          setProdutosFiltrados(produtosAtualizados);

          // Fecha o modal e limpa o estado
          setModalEdicaoAberto(false);
          setProdutoAtual(null);
          setQuantidade(0);
        } else {
          console.error('Erro ao atualizar a quantidade do produto:', response.data);
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do produto:', error);
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

  const handleLeituraCodigoBarras = (data) => {
    const produtoEncontrado = produtos.find(produto => produto.EAN === data);
    if (produtoEncontrado) {
      setProdutoAtual(produtoEncontrado);
      setModalEdicaoAberto(true);
    } else {
      alert('Produto não encontrado.');
    }
  };

  const handleAbrirModalEdicao = (produto) => {
    setProdutoAtual(produto);
    setQuantidade(produto.estoque_atual);
    setModalEdicaoAberto(true);
  };

  const modalStyle = useMemo(() => ({
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
  }), []);

  return (
    <Container sx={{ p: 0, m: 0 }}>
      <Header gerarRelatorioPDF={() => gerarRelatorioPDF(produtosFiltrados)} />
      <Box sx={{ p: 1, marginTop: 0 }}>
        <BarraDeBusca
          termoBuscaNome={termoBuscaNome}
          termoBuscaCodigo={termoBuscaCodigo}
          handleMudancaBuscaNome={handleMudancaBuscaNome}
          handleMudancaBuscaCodigo={handleMudancaBuscaCodigo}
          handleLeituraCodigoBarras={handleLeituraCodigoBarras}
          handleAbrirModal={() => setModalAberto(true)}
        />
        <TabelaDeProdutosMobile
          produtosFiltrados={produtosFiltrados}
          handleAbrirModalEdicao={handleAbrirModalEdicao}
        />
        <ModalEditarProduto
          modalEdicaoAberto={modalEdicaoAberto}
          setModalEdicaoAberto={setModalEdicaoAberto}
          afterOpenModalEdicao={() => document.getElementById('quantidade-input')?.focus()}
          produtoAtual={produtoAtual}
          quantidade={quantidade}
          setQuantidade={setQuantidade}
          handleEnvioQuantidade={handleEnvioQuantidade}
          handleKeyDown={(e) => e.key === 'Enter' && handleEnvioQuantidade()}
        />
      </Box>
    </Container>
  );
}
