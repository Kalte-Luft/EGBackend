import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import driverProfileController from '../controllers/driverProfileController';
import orderController from '../controllers/orderController';

let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/",homeController.getHomePage );
    router.get("/test",homeController.getTestPage );
    router.get("/displayCRUD",homeController.displayGetCRUD );
    
    //api user
    router.post("/api/login",userController.handleLogin);
    router.get("/api/get-all-user",userController.handleGetAllUserDrivers);
    router.post("/api/create-new-user",userController.handleCreateNewUserDriver);
    router.put("/api/edit-user",userController.handleEditUserDriver);
    router.delete("/api/delete-user",userController.handleDeleteUserDriver);
    
    //api driver
    router.post("/api/create-new-driver",driverProfileController.handleCreateDriver);
    router.delete("/api/delete-driver",driverProfileController.handleDeleteDriver);
    router.put("/api/edit-driver",driverProfileController.handleUpdateDriver);
    router.get("/api/get-all-driver",driverProfileController.handleGetAllDrivers);

    //api order 
    router.get("/api/get-all-order",orderController.handleGetAllOrders);
    router.post("/api/create-new-order",orderController.handleCreateOrder);
    router.delete("/api/delete-order",orderController.handleDeleteOrder);
    router.put("/api/update-order",orderController.handleUpdateOrder);
    
    
    return app.use("/", router);

    
};
module.exports = initWebRoutes;
