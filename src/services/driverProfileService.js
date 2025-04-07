import db from "../models/index.js";

let getAllDrivers = (DriverId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Drivers = "";
            if (DriverId === "ALL") {
                Drivers = await db.DriverProfile.findAll();
            }
            if (DriverId && DriverId !== "ALL") {
                Drivers = await db.DriverProfile.findOne({
                    where: { id: DriverId },
                });
            }
            resolve(Drivers);
        } catch (error) {
            reject(error);
        }
    });
};


let createDriver =  (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.DriverProfile.create({
                driver_id: data.driver_id,
                license_data: data.license_data,
                
            });
            console.log("Check license", data.license_data);
            //hàm xử lý tạo mới tài xế, đổi trường role của UserDriver thành driver
            //nếu không tìm thấy tài xế trả về lỗi
            let driver = await db.UserDriver.findOne({
                where: { id: data.driver_id },
            });
            if (!driver) {
                resolve({
                    errCode: 1,
                    errMessage: "The driver isn't exist!",
                });
            }
            await driver.update({
                role: "driver",
            });
            resolve({
                errCode: 0,
                errMessage: "Create a new driver successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let deleteDriver =  (DriverId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let driver = await db.DriverProfile.findOne({
                where: { id: DriverId },
            });
            if (!driver) {
                resolve({
                    errCode: 1,
                    errMessage: "The driver isn't exist!",
                });
            }
            //hàm xử lý xóa tài xế, đổi trường role của UserDriver thành user
            //nếu không tìm thấy tài xế trả về lỗi
            let user = await db.UserDriver.findOne({
                where: { id: driver.driver_id },
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: "The user isn't exist!",
                });
            }
            await user.update({
                role: "user",
            });
            await db.DriverProfile.destroy({
                where: { id: DriverId },
            });
            
            resolve({
                errCode: 0,
                errMessage: "The driver is deleted!",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let updateDriver =  (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let driver = await db.DriverProfile.findOne({
                where: { id: data.id },
            });
            if (!driver) {
                //nếu không tìm thấy partner
                resolve({
                    errCode: 1,
                    errMessage: "The driver isn't exist!",
                });
            }
            await driver.update({
                driver_id: data.driver_id,
                license_data: data.license_data,
            });
            resolve({
                errCode: 0,
                errMessage: "Update driver successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllDrivers: getAllDrivers,
    createDriver: createDriver,
    deleteDriver: deleteDriver,
    updateDriver: updateDriver,
};