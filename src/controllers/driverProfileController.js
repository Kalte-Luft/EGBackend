import driverProfileService from "../services/driverProfileService";

let handleGetAllDrivers = async (req, res) => {
    try {
        let id = req.query.id; // Lấy id từ query params
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!",
                driverProfiles: []
            });
        }
        let drivers = await driverProfileService.getAllDrivers(id);
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            drivers
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            console: error
        });
    }
};



let handleCreateDriver = async (req, res) => {
    try {
        let message = await driverProfileService.createDriver(req.body);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            console: error
        });
    }
};

let handleUpdateDriver = async (req, res) => {
    try {
        let message = await driverProfileService.updateDriver(req.body);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            console: error
        });
    }
};

let handleDeleteDriver = async (req, res) => {
    try {
        let id = req.body.id;
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!",
            });
        }
        let message = await driverProfileService.deleteDriver(id);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            console: error
        });
    }
};

module.exports = {
    handleGetAllDrivers: handleGetAllDrivers,
    handleCreateDriver: handleCreateDriver,
    handleUpdateDriver: handleUpdateDriver,
    handleDeleteDriver: handleDeleteDriver,
};