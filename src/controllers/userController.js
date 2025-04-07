import userService from "../services/userService";
let handleLogin = async (req, res) => {
    let phone_number = req.body.phone_number;
    let password = req.body.password;
    //check phone is exist
    if (!phone_number || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter!"
        });
    }
    let UserDriverData = await userService.handleUserDriverLogin(phone_number, password);
    //compare password
    //return UserDriver information
    //access_token: jwt json web token
    return res.status(200).json({
        errCode: UserDriverData.errCode,
        message: UserDriverData.errMessage,
        UserDriver: UserDriverData.UserDriver ? UserDriverData.UserDriver : {}
    });
}
let handleGetAllUserDrivers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameter!",
            UserDrivers: []
        });
    }
    let UserDrivers = await userService.getAllUserDrivers(id);
    return res.status(200).json({
        errCode: 0,
        message: "OK",
        UserDrivers
    });
    
}
let handleCreateNewUserDriver = async (req, res) => {
    let message = await userService.createNewUserDriver(req.body);
    return res.status(200).json(message);
}
let handleDeleteUserDriver = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameter!",
        });
    }
    let message = await userService.deleteUserDriver(req.body.id);
    return res.status(200).json(message);
}
let handleEditUserDriver = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserDriver(data);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUserDrivers: handleGetAllUserDrivers,
    handleCreateNewUserDriver: handleCreateNewUserDriver,
    handleEditUserDriver: handleEditUserDriver,
    handleDeleteUserDriver: handleDeleteUserDriver,
}