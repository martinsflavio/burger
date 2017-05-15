module.exports = (sequelize, DataTypes) => {
  let Burgers;
  let schema;
  let association;

///////////////// schema
  schema = {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  };
  /////////////// tables relation
  association = {
    classMethods: {
      associate: models => {
        Burgers.hasMany(models.Clients, {
          onDelete: "cascade"
        })
      }
    }
  };

  Burgers = sequelize.define('Burgers',schema,association);
  return Burgers;
};