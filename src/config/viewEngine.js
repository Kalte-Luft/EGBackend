
//file này dùng để cấu hình view engine cho ứng dụng
//view engine là công cụ giúp chúng ta render ra html
//ở đây chúng ta sử dụng ejs là view engine


import express from "express"; //import express

let configViewEngine = (app) =>{
    //arrow function
    app.use(express.static("./src/public")); //use static file
    app.set("view engine", "ejs"); //set view engine is ejs
    app.set("views", "./src/views"); //set views is src/views
}
module.exports = configViewEngine; //export module
