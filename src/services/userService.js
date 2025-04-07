import db from "../models/index.js";
import bcrypt from "bcryptjs";
let handleUserDriverLogin = async (phone_number, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let UserDriverData = {};
            let isExist = await checkUserDriverPhone(phone_number);
            if (isExist) {
                //UserDriver exist
                let UserDriver = await db.UserDriver.findOne({
                    attributes: [`id`, `name`, `phone_number`, `email_verified_at`, `password`, `remember_token`, `role`, `fcm_token`, `avatar`],
                    where: { phone_number: phone_number },
                });
                if (UserDriver) {
                    //compare password
                    let check = await bcrypt.compareSync(
                        password,
                        UserDriver.password
                    );
                    if (check) {
                        UserDriverData.errCode = 0;
                        UserDriverData.errMessage = "OK";
                        delete UserDriver.dataValues.password;
                        UserDriverData.UserDriver = UserDriver;
                    } else {
                        UserDriverData.errCode = 3;
                        UserDriverData.errMessage = "Wrong password";
                    }
                } else {
                    UserDriverData.errCode = 2;
                    UserDriverData.errMessage = "UserDriver's not found";
                }
            } else {
                UserDriverData.errCode = 1;
                UserDriverData.errMessage =
                    "Your phone number isn't exist in system. Please try again!";
            }

            resolve(UserDriverData);
        } catch (error) {
            reject(error);
        }
    });
};
let checkUserDriverPhone = (phone_number) => {
    return new Promise(async (resolve, reject) => {
        try {
            let UserDriver = await db.UserDriver.findOne({
                where: { phone_number: phone_number },
            });
            if (UserDriver) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getAllUserDrivers = (UserDriverId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let UserDrivers = "";
            if (UserDriverId === "ALL") {
                UserDrivers = await db.UserDriver.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            if (UserDriverId && UserDriverId !== "ALL") {
                UserDrivers = await db.UserDriver.findOne({
                    where: { id: UserDriverId },
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            resolve(UserDrivers);
        } catch (error) {
            reject(error);
        }
    });
};
let hashUserDriverPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let salt = bcrypt.genSaltSync(10);
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};
let createNewUserDriver = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserDriverPhone(data.phone_number);
            if (isExist === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Your phone number is already in used. Please try another phone number!",
                });
            } else {
                let hashPassword = await hashUserDriverPassword(data.password);
                await db.UserDriver.create({
                    name: data.name,
                    phone_number: data.phone_number,
                    //email_verified_at: data.email_verified_at,
                    password: hashPassword,
                    //remember_token: data.remember_token,
                    //role: data.role,
                    //fcm_token: data.fcm_token,
                    //avatar: data.avatar,
                });
                resolve({
                    errCode: 0,
                    errMessage: "Create a new UserDriver successfully!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteUserDriver = async (UserDriverId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let UserDriver = await db.UserDriver.findOne({
                where: { id: UserDriverId },
            });
            if (!UserDriver) {
                resolve({
                    errCode: 1,
                    errMessage: "The UserDriver isn't exist!",
                });
            }
            await db.UserDriver.destroy({
                where: { id: UserDriverId },
            });
            resolve({
                errCode: 0,
                errMessage: "The UserDriver is deleted!",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let updateUserDriver = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter!",
                });
            } else {
                let UserDriver = await db.UserDriver.findOne({
                    where: { id: data.id },
                });
                if (!UserDriver) {
                    resolve({
                        errCode: 1,
                        errMessage: "The UserDriver isn't exist!",
                    });
                }
                UserDriver.name = data.name;
                UserDriver.phone_number = data.phone_number;
                UserDriver.email_verified_at = data.email_verified_at;
                UserDriver.password = data.password;
                UserDriver.remember_token = data.remember_token;
                UserDriver.role = data.role;
                UserDriver.fcm_token = data.fcm_token;
                UserDriver.avatar = data.avatar;
                await UserDriver.save();
                resolve({
                    errCode: 0,
                    errMessage: "The UserDriver is updated!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserDriverLogin: handleUserDriverLogin,
    checkUserDriverPhone: checkUserDriverPhone,
    getAllUserDrivers: getAllUserDrivers,
    createNewUserDriver: createNewUserDriver,
    deleteUserDriver: deleteUserDriver,
    updateUserDriver: updateUserDriver,
};