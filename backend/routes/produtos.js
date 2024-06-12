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

module.exports = router;
