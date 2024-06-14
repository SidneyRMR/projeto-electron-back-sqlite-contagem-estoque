import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import QRCode from 'qrcode.react';
import { isMobile } from 'react-device-detect';

Modal.setAppElement('#__next');

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/produtos');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
    // Submit the counted quantity
    setModalIsOpen(false);
    // Update product count in state or send to server
    console.log('Count submitted for product:', currentProduct, 'Count:', count);
  };

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      {!isMobile ? (
        <QRCode value={window.location.href} />
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ flex: 1, padding: '10px', fontSize: '16px' }}
            />
            <button onClick={handleBarcodeScan} style={{ marginLeft: '10px', padding: '10px' }}>
              Ler Código de Barras
            </button>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
  <table style={{ width: '100%' }}>
    <thead>
      <tr>
        <th>Código</th>
        <th>Nome do Produto</th>
        <th>Quantidade</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.map(product => (
        <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
          <td style={{ padding: '10px' }}>{product.codigo}</td>
          <td style={{ padding: '10px' }}>{product.nome}</td>
          <td style={{ padding: '10px' }}>{product.quantidade}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <h2>{currentProduct && currentProduct.nome}</h2>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="Insira a quantidade contada"
            />
            <button onClick={handleCountSubmit}>Enviar Contagem</button>
            <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
          </Modal>
        </div>
      )}
    </div>
  );
}
