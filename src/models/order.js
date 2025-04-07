"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.UserDriver, {
                foreignKey: "user_id",
                as: "user",
            });

            Order.belongsTo(models.UserDriver, {
                foreignKey: "driver_id",
                as: "driver",
            });
        }
    }
    Order.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.BIGINT,
            driver_id: DataTypes.BIGINT,
            from_address: DataTypes.JSON, // Địa chỉ đầu
            to_address: DataTypes.JSON, // Địa chỉ cuối
            shipping_cost: DataTypes.DECIMAL(19, 2), // Phí ship
            discount: DataTypes.DECIMAL(8, 2), // Giảm giá
            status_code: DataTypes.INTEGER, // Trạng thái đơn hàng
            completed_at: DataTypes.DATE, // Thời gian hoàn thành đơn hàng
            driver_accept_at: DataTypes.DATE, // Thời gian tài xế nhận đơn hàng
            user_note: DataTypes.TEXT, // Ghi chú của người dùng
            driver_note: DataTypes.TEXT, // Ghi chú của tài xế
            driver_rate: DataTypes.INTEGER, // Đánh giá cho tài xế
            receiver: DataTypes.JSON, // Thông tin người nhận hàng
            distance: DataTypes.DECIMAL(8, 2), // Khoảng cách
            except_drivers: DataTypes.JSON, // Danh sách tài xế không được nhận đơn hàng
        },
        {
            sequelize,
            modelName: "Order",
            tableName: "Orders",
        }
    );
    return Order;
};
