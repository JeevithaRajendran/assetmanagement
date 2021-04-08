const {sequelize, Employee, Asset, Master, Report, History} = require('../models');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json());  
app.use(bodyParser.urlencoded({extended:false}));
// Routes for Employee
exports.create =   async(req,res) => {
    const {empId,empName,designation,department,branch,dateofjoin} = req.body;
    const status = true
    try {
        const employee = await Employee.create({empId,empName,designation,department,branch,dateofjoin,status});
        return res.json('Employee and their details are added successfully');
        
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Can't able to register the employee`, err);
    }
}

exports.findAll=  async(req,res) => {
    try{
        const query = await Employee.findAll();
        return res.render('index', {employees: query});
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Something went wrong`,err);
    }
}

exports.findById = async(req,res) => {

    const empId = req.body.id;
    try{
        const employee = await Employee.findOne({where : {empId}});
        if(!employee){
        return res.json('Enter a valid employee ID')
        }
        return res.render('singleEmployee', {employee});
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Can't able to find the mentioned employee`);
    }
} 

exports.findByStatus = async(req,res) => {
    const status = req.body.status;
    try{
        if(status==='Yes'){
            const employees = await Employee.findAll({where : {status:true}});
            return res.render('index', {employees: employees});
        }if(status==='No'){
            const employees = await Employee.findAll({where : {status:false}});
            return res.render('index', {employees: employees});
        }
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Can't able to find the mentioned asset`);
    }
}

exports.updateById = async(req,res) => {
    const empId = req.body.id;
    const {empName,designation,department,branch,dateofjoin,status} = req.body;
    try{
        const employee = await Employee.findOne({where : {empId}})

            employee.empName = empName,
            employee.designation =designation,
            employee.department = department,
            employee.branch = branch,
            employee.dateofjoin = dateofjoin,
            employee.status = status
    
        await employee.save();
        return res.render('singleEmployee', {employee});
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Can't able to find the mentioned employees`);
    }
}   

exports.deleteById = async(req,res) => {
    const empId = req.body.id;
    try{
        const employee = await Employee.findOne({where : {empId}});
        await employee.destroy();
        return res.json("Employee and their details are deleted successfully");
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Employee Id not found`);
    }
}  
// Routes for Asset
exports.assetcreate = async(req,res) => {
    const {assetId,name,model,dateofpurchase,serialnumber,branch} = req.body;
    const empId = 0
    const assigned = false
    const status = 'Available'
    try {
        await Asset.create({assetId,name,model,dateofpurchase,serialnumber,branch,assigned,status,empId});
        await History.create({assetId,name,model,serialnumber,dateofpurchase})
        const inUse = 0;
        await Master.create({name,inUse})
        return res.json('Asset and its details are added successfully');   
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Can't able to register the asset`, err);
    }
}

exports.assetfindAll = async(req,res) => {
    try{
        const assets = await Asset.findAll();
        return res.render('asset', {assets});
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Something went wrong`,err);
    }
}

exports.assetfindById = async(req,res) => {

    const assetId = req.body.id;
    try{
        const asset = await Asset.findOne({where : {assetId}});
        if(!asset){
        return res.json('Enter a valid asset ID')
        }
        return res.render('singleAsset', {asset});
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Can't able to find the mentioned asset`);
    }
}

exports.assetupdateById = async(req,res) => {
    const assetId = req.body.id;
    const {name,model,dateofpurchase,serialnumber} = req.body;
    try{
        const asset = await Asset.findOne({where : {assetId}})
        
            asset.name = name,
            asset.model =model,
            asset.dateofpurchase = dateofpurchase,
            asset.serialnumber = serialnumber
    
        await asset.save();
        return res.render('singleAsset', {asset});
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Can't able to find the mentioned assets`);
    }
}   

exports.assetdeleteById = async(req,res) => {
    const assetId = req.body.id;
    try{
        const asset = await Asset.findOne({where : {assetId}});
        await asset.destroy();
        return res.json(`Asset and it's details are deleted successfully`);
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Asset Id not found`);
    }
}   

// Routes for master
exports.masterfindAll = async(req,res) => {
    try{
        const query = await Master.findAll();
        return res.render('master',{masters: query});
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Something went wrong`,err);
    }
}

// Routes for checking stock availability

exports.stocksAvailable = async(req,res) => {
    try{
        const stock = await Asset.findAll({where : {assigned:false,empId:0,status:'Available'}});
        const cbe_branch = await Asset.findAll({where : {branch:'CBE',assigned:false,empId:0,status:'Available'}});
        const asset = cbe_branch.length;
        const san_branch = await Asset.findAll({where : {branch:'Sankari',assigned:false,empId:0,status:'Available'}});
        const assets = san_branch.length;
        const total = assets + asset;
    return res.render('stock',{stocks:stock,asset:asset,assets:assets,total:total})
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Something went wrong`,err);
    }
} 

// Routes for issue asset to an employee

exports.issueAsset = async(req,res) => {
    const {assetId,name,empId,empName} = req.body;
    try{
        const asset = await Asset.findOne({where : {assetId,name,assigned:false}})
        if(!asset){
            return res.status(400).json(`Enter a valid asset Id and name`); 
        }
            asset.empId = empId,
            asset.empName = empName,
            asset.assigned = true,
            asset.status = 'with employee'
        await asset.save();
        // For updating the asset category mater
        const assets = await Asset.findAll({where : {name,assigned:true}});
            if(!asset){
                const master = await Master.findOne({where : {name}})
                if(!master){
                    const inUse = 1;
                    await Master.create({name,inUse});
                }  
            }
            const inUse = assets.length
            const master = await Master.findOne({where : {name}})
            if(!master){
                const inUse = 1;
                await Master.create({name,inUse});
            }
                master.inUse = inUse;
            await master.save();
        // For updating the asset history
            let today = new Date().toISOString().slice(0, 10)
            const issuedate = today
            await History.create({assetId,name,empId,empName,issuedate})
        return res.json('Asset has been successfully assigned');
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Can't able to find the mentioned assets`);
    }
}

// Routes for Return Asset
exports.returnAsset = async(req,res) => {
    const {name,empId,branch,status} = req.body;
    try{
        const asset = await Asset.findOne({where : {name,empId}})
        const assetId = asset.assetId;
            // For updating the Asset history
            const today = new Date().toISOString().slice(0, 10)
            const returndate = today
            const history = await History.findOne(({where : {name,empId,assetId,returndate:null}}))
            history.returndate = returndate,   
            await history.save();
        if(!asset){
            return res.status(400).json(`Enter valid Name,Id and asset name`); 
        }
            asset.status = status,
            asset.assigned = false,
            asset.empId = 0,
            asset.empName = '',
            asset.branch = branch
            await asset.save();
             // For updating the asset category mater
            const assets = await Asset.findAll({where : {name,assigned:true}});
            const use = assets.length;
            const master = await Master.findOne({where : {name}})
            if(!master){
                const inUse = 1;
                await Master.create({name,inUse});
            }
                master.inUse = use;
            await master.save();

        return res.json('Asset has been successfully returned');
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Can't able to find the mentioned assets`);
    }
}

// Routes for Marking an asset as scrap

exports.scrapAsset = async(req,res) => {
    const {assetId,name,status} = req.body;
    try{
        // For updating the Asset history
        const today = new Date().toISOString().slice(0, 10)
        const scrapdate = today
        const history = await History.findOne(({where : {name,assetId,empId:null}}))
        history.scrapdate = scrapdate,   
        await history.save();

        const asset = await Asset.findOne({where : {assetId,name}});
        asset.status = status
        await asset.save();
            
        const report = asset
        await asset.destroy();
        // For adding scrap asset to reports table
            const {model,dateofpurchase,serialnumber,branch} = report;
            await Report.create({assetId,name,model,dateofpurchase,serialnumber,branch,status})
   
        return res.json('Asset has been marked as scrap');    
        }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Asset not found`);
    }
}

// Routes for Asset History
exports.historyfindbyId = async(req,res) => {
    const assetId = req.body.id;
    try{
        const history = await History.findAll({where : {assetId}});
            if(!history){
            return res.json('Enter a valid asset ID')
            }
        return res.render('singleHistory',{histories : history});
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Something went wrong`,err);
    }
}


// Routes for Scrap Assets 
exports.scrapfindAll = async(req,res) => {
    
    try{
        const reports = await Report.findAll();
        return res.render('report',{reports});
    }catch(err){
        console.log("Error",err);
        return res.status(400).json(`Something went wrong`,err);
    }
}
