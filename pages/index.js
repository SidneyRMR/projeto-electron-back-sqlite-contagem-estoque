import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import QRCode from 'react-qr-code';
import { isMobile } from 'react-device-detect';
const os = require('os');

Modal.setAppElement('#__next');

export default function Home() {
  const [searchTermName, setSearchTermName] = useState('');
  const [searchTermCode, setSearchTermCode] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterType, setFilterType] = useState(''); // 'name' or 'code'
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [count, setCount] = useState(0);

  const [localIP, setLocalIp] = useState('');

  const fetchLocalIP = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getLocalIP');
      setLocalIp(response.data.ip);
    } catch (error) {
      console.error('Error fetching local IP:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/produtos');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleNameSearchChange = (event) => {
    setSearchTermName(event.target.value);
    setFilterType('name');
    filterProducts(event.target.value, searchTermCode, 'name');
  };

  const handleCodeSearchChange = (event) => {
    setSearchTermCode(event.target.value);
    setFilterType('code');
    filterProducts(searchTermName, event.target.value, 'code');
  };

  const filterProducts = (name, code, type) => {
    let filtered = [];
    if (type === 'name') {
      filtered = products.filter(product =>
        product.nome.toLowerCase().includes(name.toLowerCase())
      );
    } else if (type === 'code') {
      filtered = products.filter(product =>
        String(product.codigo).includes(code)
      );
    }
    setFilteredProducts(filtered);
  };

  const handleBarcodeScan = () => {
    // Implement barcode scanning functionality here
    // For now, let's simulate a product scan
    const product = products.find(p => p.id === 1); // Simulate scanning product with id 1
    if (product) {
      setCurrentProduct(product);
      setModalIsOpen(true);
    }
  };

  const handleCountSubmit = () => {
    setModalIsOpen(false);
    console.log('Count submitted for product:', currentProduct, 'Count:', count);
  };

  const handleOpenModal = () => {
    fetchLocalIP();
    setModalIsOpen(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="ID"
          value={searchTermCode}
          onChange={handleCodeSearchChange}
          maxLength="3"
          style={{ width: '50px', marginRight: '10px', padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Buscar produtos por nome..."
          value={searchTermName}
          onChange={handleNameSearchChange}
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        {isMobile ? (
          <button onClick={handleBarcodeScan} style={{ marginLeft: '10px', padding: '10px' }}>
            Ler Código de Barras
          </button>
        ) : (
          <button onClick={() => setModalIsOpen(true)} style={{ marginLeft: '10px', padding: '10px' }}>
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
            {filteredProducts.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{product.codigo}</td>
                <td style={{ padding: '10px' }}>{product.nome}</td>
                <td style={{ padding: '10px' }}>{product.quantidade || 0}</td>
                <td ><button style={{ padding: '10px' }}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal 
  isOpen={modalIsOpen} 
  onRequestClose={() => setModalIsOpen(false)} 
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
    <QRCode value={`http://${localIP}:3000`} /><br />
    <button 
      onClick={handleCountSubmit} 
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

    </div>
  );
}
