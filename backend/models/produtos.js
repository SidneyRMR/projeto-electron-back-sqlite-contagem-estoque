module.exports = (sequelize, DataTypes) => {
  const produtos = sequelize.define('produtos', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      codigo: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      nome: {
          type: DataTypes.STRING,
          allowNull: false
      },
      estoque_atual: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      ean: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {
      tableName: 'produtos', // Nome da tabela conforme criado em initDb.js
      timestamps: false       // Se não houver colunas createdAt e updatedAt
  });

  return produtos;
};
