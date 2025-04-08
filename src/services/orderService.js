import { up } from "../migrations/migrations-create-driver-profile.js";
import db from "../models/index.js";

let getAllOrders = (OrderId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let Orders = "";
			if (OrderId === "ALL") {
				Orders = await db.Order.findAll();
			}
			if (OrderId && OrderId !== "ALL") {
				Orders = await db.Order.findOne({
					where: { id: OrderId },
				});
			}
			resolve(Orders);
		} catch (error) {
			reject(error);
		}
	});
};


let createNewOrder = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			await db.Order.create({
				user_id: data.user_id,
				driver_id: data.driver_id,
				from_address: data.from_address,
				to_address: data.to_address,
				//shipping_cost: data.shipping_cost,
				//discount: data.discount,
				status_code: data.status_code,
				//completed_at: data.completed_at,
				//driver_accept_at: data.driver_accept_at,
				//  user_note: data.user_note,
				//  driver_note: data.driver_note,
				//  driver_rate: data.driver_rate,
				//distance: data.distance,
				// except_drivers: data.except_drivers,
			});

			resolve({
				errCode: 0,
				errMessage: "Order created successfully!",
			});
		} catch (error) {
			reject({
				errCode: -1,
				errMessage: "Failed to create order.",
				error: error.message,
			});
		}
	});
};


let deleteOrder = async (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: { id: orderId },
            });
            if (!order) {
                resolve({
                    errCode: 1,
                    errMessage: "The order isn't exist!",
                });
            }
            await db.Order.destroy({
                where: { id: orderId },
            });
            resolve({
                errCode: 0,
                errMessage: "The order is deleted!",
            });
        } catch (error) {
            reject(error);
        }
    });
};


let updateOrder = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let order = await db.Order.findOne({
				where: { id: data.id },
			});
			if (!order) {
				resolve({
					errCode: 1,
					errMessage: "The order isn't exist!",
				});
			}
			await db.Order.update(
				{
					user_id: data.user_id,
					driver_id: data.driver_id,
					from_address: data.from_address,
					to_address: data.to_address,
					shipping_cost: data.shipping_cost,
					discount: data.discount,
					status_code: data.status_code,
					completed_at: data.completed_at,
					driver_accept_at: data.driver_accept_at,
					user_note: data.user_note,
					driver_note: data.driver_note,
					driver_rate: data.driver_rate,
					distance: data.distance,
					except_drivers: data.except_drivers,
				},
				{
					where: { id: data.id },
				}
			);
			resolve({
				errCode: 0,
				errMessage: "Order updated successfully!",
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	getAllOrders: getAllOrders,
	createNewOrder: createNewOrder,
	deleteOrder: deleteOrder,
	updateOrder: updateOrder,
};