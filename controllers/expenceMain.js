
const Expence = require('../model/expenceMain')

exports.addDetails= async (req,res,next)=>{
    const expence=req.body.expence;
    const description=req.body.description;
    const category=req.body.category;
   const data = await Expence.create({expence:expence,description:description,category:category})
    res.status(201).json({newUserDetails:data})
  
}

exports.showDeails=(res,req,next)=>{
    Expence.findAll().then(data =>{
        req.json({newUserDetails:data})
       
    })
}


exports.deleteDeails=(req,res,next)=>{
    const prodId = req.params.id;
    Expence.findByPk(prodId)
    .then((user)=>{
          return user.destroy();
     
    })
    .then(()=>{
      console.log('product destroyed')
     
    })
    .catch((err)=>{
      console.log(err)
    }); 
}
