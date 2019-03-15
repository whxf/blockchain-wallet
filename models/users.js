/**
 * @Description: user model
 * @author Li Xi
 * @date 2019-03-15
*/

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    balance: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    freeze_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    transfer_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'users'
  });
};
