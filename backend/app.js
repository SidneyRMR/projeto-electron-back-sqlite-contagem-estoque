const express = require('express');
const sequelize = require('./config/database');
const produtosRoutes = require('./routes/produtos');
const cors = require('cors');
const os = require('os');

const app = express();
app.use(cors());

// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

// Sincronize os modelos com o banco de dados
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Error syncing database:', err);
});

// Função para obter o endereço IP local
const getLocalIPAddress = () => {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '127.0.0.1';
};

// Endpoint para obter o endereço IP local
app.get('/api/getLocalIP', (req, res) => {
    const localIp = getLocalIPAddress();
    res.json({ ip: localIp });
});

// Use a rota de produtos
app.use('/api', produtosRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
