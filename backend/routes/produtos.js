const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const Produto = require('../models/produtos')(sequelize, require('sequelize').DataTypes);

// Rota para obter todos os produtos
router.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        console.error('Error fetching produtos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Rota para atualizar o estoque do produto
router.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { estoque_atual } = req.body;

  try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
          return res.status(404).json({ message: 'Produto não encontrado' });
      }

      produto.estoque_atual = estoque_atual;
      await produto.save();
      
      res.json({ message: 'Estoque atualizado com sucesso!', produto });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
