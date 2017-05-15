module.exports = (sequelize, DataTypes) => {
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