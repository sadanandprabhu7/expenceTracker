// step 1
const express = require("express");

// step 2
const expenceApp = express();

const Expence = require("./model/expenceMain");
const routesAdmin = require("./routes/router");
const sequelize = require("./util/database");

// step 3
const cors = require("cors");

// step 4
const bodyParser = require("body-parser");

expenceApp.use(cors());

// step 5
expenceApp.use(bodyParser.json({ extended: false }));

expenceApp.use(routesAdmin);

// expenceApp.post('/save',async (req,res,next)=>{
//     const expence=req.body.expence;
//     const description=req.body.description;
//     const category=req.body.category;
//    const data = await Expence.create({expence:expence,description:description,category:category})
//     res.status(201).json({newUserDetails:data})

// })
// expenceApp.get('/',(res,req,next)=>{
//     Expence.findAll().then(data =>{
//         req.json({newUserDetails:data})

//     })
// })
// expenceApp.delete('/:id',(req,res,next)=>{
//     const prodId = req.params.id;
//     Expence.findByPk(prodId)
//     .then((user)=>{
//           return user.destroy();

//     })
//     .then(()=>{
//       console.log('product destroyed')

//     })
//     .catch((err)=>{
//       console.log(err)
//     });
// }
// )

sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    //console.log(result);

    expenceApp.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
