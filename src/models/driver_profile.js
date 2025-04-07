"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DriverProfile extends Model {
        static associate(models) {
            DriverProfile.belongsTo(models.UserDriver, {
                foreignKey: "driver_id",
                as: "userDriver",
            });
        }
    }
    DriverProfile.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            driver_id: DataTypes.BIGINT,
            license_data: DataTypes.JSON, // Dữ liệu GPLX được lấy từ QR code
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "DriverProfile",
            tableName: "DriverProfiles",
        }
    );
    return DriverProfile;
};
