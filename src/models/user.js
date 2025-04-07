"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserDriver extends Model {
        static associate(models) {
            // Một người dùng có nhiều đơn đặt xe
            UserDriver.hasMany(models.Order, {
                foreignKey: "user_id",
                as: "orders",
            });

            // Một tài xế có nhiều đơn đặt xe
            UserDriver.hasMany(models.Order, {
                foreignKey: "driver_id",
                as: "driverOrders",
            });

            // Một tài xế có một hồ sơ
            UserDriver.hasOne(models.DriverProfile, {
                foreignKey: "driver_id",
                as: "driverProfile",
            });
        }
    }
    UserDriver.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            email_verified_at: DataTypes.DATE,
            password: DataTypes.STRING,
            remember_token: DataTypes.STRING, // Token nhớ đăng nhập- ko dùng react native
            // Token này sẽ được lưu vào cookie của trình duyệt
            // và sẽ được gửi lại cho server khi người dùng truy cập vào trang web
            role: DataTypes.ENUM("user", "driver", "admin"), // Vai trò của người dùng
            fcm_token: DataTypes.TEXT, // Token FCM để gửi thông báo đến người dùng
            // Token này sẽ được gửi từ client đến server khi người dùng đăng nhập
            // và sẽ được lưu vào cơ sở dữ liệu
            // để server có thể gửi thông báo đến người dùng
            avatar: DataTypes.STRING,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "UserDriver",
            tableName: "UserDrivers",
        }
    );
    return UserDriver;
};
