import orderService from '../services/orderService';

let handleGetAllOrders = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameter!",
			Orders: []
		});
	}
	let Orders = await orderService.getAllOrders(id);
	return res.status(200).json({
		errCode: 0,
		message: "OK",
		Orders
	});
}


let handleCreateOrder = async (req, res) => {
    try {
        let message = await orderService.createNewOrder(req.body);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            console: error
        });
    }
};

let handleDeleteOrder = async (req, res) => {
    try {
        let id = req.body.id;
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!",
            });
        }
        let message = await orderService.deleteOrder(id);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            console: error
        });
    }
};

let handleUpdateOrder = async (req, res) => {
	try {
		let message = await orderService.updateOrder(req.body);
		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json({
			errCode: 1,
			message: "Error from server",
			console: error
		});
	}
}


module.exports = {
	handleGetAllOrders: handleGetAllOrders,
	handleCreateOrder: handleCreateOrder,
	handleDeleteOrder: handleDeleteOrder,
	handleUpdateOrder: handleUpdateOrder
}