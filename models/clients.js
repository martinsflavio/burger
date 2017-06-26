module.exports = (sequelize, DataTypes) => {
  // Same comments here as in your `burgers.js` model file

  let Clients;
  let schema;
  let association;
  /////////////// schema
  schema = {
    name: {
      type: DataTypes.STRING,
     // allowNull: false
    }
  };
  //////////////// tables relation
  association = {
    classMethods: models => {
      Clients.belongsTo(models.Burgers, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };

  Clients = sequelize.define("Clients",schema);
  return Clients;
};