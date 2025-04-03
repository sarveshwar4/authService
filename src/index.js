const express = require("express");
const bodyParser = require('body-parser');
const {PORT} = require("./config/config-service");
const apiRoutes = require('./routes/index');
const setUpAndStartServer = () =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiRoutes);
    app.listen(PORT,() =>{
       console.log(`Server Start listning on: ${PORT}`);
    });
}

setUpAndStartServer();

