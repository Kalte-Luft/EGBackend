import db from '../models/index';


let getAllUser = async () => {
    try {
        let users = await db.User.findAll();
        return users;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        throw error;
    }
}
module.exports = {
    getAllUser: getAllUser,
};
