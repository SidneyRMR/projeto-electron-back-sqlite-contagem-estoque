import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import QRCode from 'react-qr-code';
import { isMobile } from 'react-device-detect';
const os = require('os');

Modal.setAppElement('#__next');

export default function DesktopApp() {
  const [termoBuscaNome, setTermoBuscaNome] = useState('');
  const [termoBuscaCodigo, setTermoBuscaCodigo] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState(null);
  const [quantidade, setQuantidade] = useState(0);
  const [enderecoLocalIP, setEnderecoLocalIP] = useState('');
  const refInputQuantidade = useRef(null);

  const buscarEnderecoLocalIP = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getLocalIP`);
      setEnderecoLocalIP(response.data.ip);
    } catch (error) {
      console.error('Erro ao buscar o endereço IP local:', error);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

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
    setTipoFiltro('name');
    filtrarProdutos(event.target.value, termoBuscaCodigo, 'name');
  };

  const handleMudancaBuscaCodigo = (event) => {
    setTermoBuscaCodigo(event.target.value);
    setTipoFiltro('code');
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

  const handleLeituraCodigoBarras = () => {
    const produto = produtos.find(p => p.id === 1);
    if (produto) {
      setProdutoAtual(produto);
      setModalAberto(true);
    }
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

  const handleAbrirModal = () => {
    buscarEnderecoLocalIP();
    setModalAberto(true);
  };

  const afterOpenModalEdicao = () => {
    if (refInputQuantidade.current) {
      refInputQuantidade.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleEnvioQuantidade();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="ID"
          value={termoBuscaCodigo}
          onChange={handleMudancaBuscaCodigo}
          maxLength="3"
          style={{ width: '50px', marginRight: '10px', padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Buscar produtos por nome..."
          value={termoBuscaNome}
          onChange={handleMudancaBuscaNome}
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        {isMobile ? (
          <button onClick={handleLeituraCodigoBarras} style={{ marginLeft: '10px', padding: '10px' }}>
            Ler Código de Barras
          </button>
        ) : (
          <button onClick={handleAbrirModal} style={{ marginLeft: '10px', padding: '10px' }}>
            Gerar QR Code
          </button>
        )}
      </div>
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome do Produto</th>
              <th>Quantidade</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map(produto => (
              <tr key={produto.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{produto.codigo}</td>
                <td style={{ padding: '10px' }}>{produto.nome}</td>
                <td style={{ padding: '10px' }}>{produto.estoque_atual || 0}</td>
                <td>
                  <button onClick={() => handleAbrirModalEdicao(produto)} style={{ padding: '10px' }}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalAberto}
        onRequestClose={() => setModalAberto(false)}
        style={{
          content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }
        }}
      >
        <div>
          <h2>ACESSO MOBILE</h2>
          <QRCode value={`http://${enderecoLocalIP}:3000/mobile`} /><br />
          <button
            onClick={() => setModalAberto(false)}
            style={{
              display: 'flex',
              marginTop: '20px',
              padding: '15px',
              fontSize: '18px'
            }}
          >
            Fechar
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={modalEdicaoAberto}
        onAfterOpen={afterOpenModalEdicao}
        onRequestClose={() => setModalEdicaoAberto(false)}
        style={{
          content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }
        }}
      >
        <div>
          <h2>Editar Quantidade do Produto</h2>
          {produtoAtual && (
            <>
              <p>{produtoAtual.nome}</p>
              <input
                ref={refInputQuantidade}
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ padding: '10px', fontSize: '16px' }}
              />
              <button
                onClick={handleEnvioQuantidade}
                style={{
                  display: 'flex',
                  marginTop: '20px',
                  padding: '15px',
                  fontSize: '18px'
                }}
              >
                Salvar
              </button>
              <button
                onClick={() => setModalEdicaoAberto(false)}
                style={{
                  display: 'flex',
                  marginTop: '10px',
                  padding: '15px',
                  fontSize: '18px'
                }}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
