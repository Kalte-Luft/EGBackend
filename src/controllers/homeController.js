import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";

let getHomePage = async(reg,res) =>{
    try {
        let data = await db.UserDriver.findAll();//truy vấn tất cả dữ liệu trong bảng User
        return res.render("home.ejs",{
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}
let getTestPage = (req,res) =>{
    return res.render("test.ejs");
}
let displayGetCRUD = async(req,res) =>{
    let data = await CRUDService.getAllUser();
    console.log(data);
    return res.render("test.ejs",{
        dataTable: data
    });
}

module.exports = {
    getHomePage: getHomePage,
    getTestPage: getTestPage,
    displayGetCRUD: displayGetCRUD
}
