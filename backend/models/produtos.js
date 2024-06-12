module.exports = (sequelize, DataTypes) => {
  const produtos = sequelize.define('produtos', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
      },
      codigo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
      },
      nome: {
          type: DataTypes.STRING,
          allowNull: false
      
      },
      estoque_atual: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      EAN: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
  }, {
      tableName: 'produtos', // Nome da tabela conforme criado em initDb.js
      timestamps: false       // Se não houver colunas createdAt e updatedAt
  });

  return produtos;
};
