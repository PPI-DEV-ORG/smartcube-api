import { DataTypes, Model } from "sequelize";
import { db } from "./BaseEntity"
import NotificationEntity from "./Notification";

class UserEntity extends Model { }

UserEntity.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize: db.getConnection(),
  modelName: 'User',
  tableName: 'users',
  underscored: true
});

UserEntity.hasMany(NotificationEntity)
NotificationEntity.belongsTo(UserEntity)

export default UserEntity