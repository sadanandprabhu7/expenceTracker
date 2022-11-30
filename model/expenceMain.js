

const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const Expence = sequelize.define('expence',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    expence:{
        type:Sequelize.INTEGER,
        allowNull:false

    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
})

module.exports=Expence;