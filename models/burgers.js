module.exports = (sequelize, DataTypes) => {
  // Also, I think declaring these inline makes a bit more sense.
  // You generally only want to declare a variable without a value
  // when you're not sure what the value of it will end up being.

///////////////// schema
  let schema = {
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
  // while this currently is only handling associations, it really is more of an options object
  // that can contain a number of other things, so you'll generally want to name it something less specific.
  let association = {
    classMethods: {
      associate: models => {
        // If you follow my below suggestion and don't define a burgers variable that you're returning,
        // then you'll need to reference your Burgers model through the passed in models object.
        models.Burgers.hasMany(models.Clients, {
          onDelete: "cascade"
        })
      }
    }
  };

  // Really like your approach of defining the schema and options as objects and simply passing their reference to the sequelize.define call.
  // One thing I'd say though is that it's probably unnecessary to define a `Burgers` variable since you can simply return the sequelize.define call
  // like so:
  return sequelize.define('Burgers', schema, association);
};