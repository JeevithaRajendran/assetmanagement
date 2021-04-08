const {sequelize, User, Asset, Report} = require('./models');
const Routes = require('./routes/routes');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('./routes/validation');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

// Routes for accessing pug files
app.set('view engine','pug');
app.set('views','./views');

// Routes for rendering front-end pages
app.get('/', async(req,res) => res.render(`login`));
app.get('/index', (req,res) => res.render("index"));
app.get('/stock', (req,res) => res.render("stock"));
app.get('/master', (req,res) => res.render("master"));
app.get('/history', (req,res) => res.render("history"));
app.get('/singleHistory', (req,res) => res.render("singleHistory"));
app.get('/asset', (req,res) => res.render("asset"));
app.get('/report', (req,res) => res.render("report"));
app.get('/issue', (req,res) => res.render("issue"));
app.get('/return', (req,res) => res.render("return"));
app.get('/scrap', (req,res) => res.render("scrap"));
app.get("/register", (req, res) => res.render("register"));
app.get("/addEmployee", (req, res) => res.render("addEmployee"));
app.get("/updateEmployee", (req, res) => res.render("updateEmployee"));
app.get("/dashboard", (req, res) => res.render("dashboard"));
app.get("/empMaster", (req, res) => res.render("empMaster"));
app.get("/assetMaster", (req, res) => res.render("assetMaster"));
app.get("/addAsset", (req, res) => res.render("addAsset"));
app.get("/singleAsset", (req, res) => res.render("singleAsset"));
app.get("/assetupdate", (req, res) => res.render("assetupdate"));

// User login
app.post('/', async(req,res) => {
    // Login validation
    const {error} = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    // Email validation
    const user = await User.findOne({where:{email: req.body.email}});
    if(!user){
        return res.status(400).send("Email or password is not valid");
    }
    // Password validation
    const validPwd = await bcrypt.compare(req.body.password,user.password);
    if(!validPwd){
        return res.status(400).send("Email or password is not valid");
    }
    res.render("dashboard");
})
// User registration   
app.post('/register', async(req,res) => {
    // Register validation
    const {error} = registerValidation(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
    // Check if email exist already
    const emailExsist = await User.findOne({where:{email: req.body.email}});
        if(emailExsist){
            return res.status(400).send("Email already exsist");
        }
    // Bcrypting the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt);
        try{
            const user = await User.create({
                name:req.body.name,
                email:req.body.email,
                password: hash
            });
            return res.render("login");    
        }catch(err){
            console.log(err)
            return res.status(400).send(`Can't able to register`);
        }
})
// Routes for Employee Master
    app.post('/employees', [Routes.create]);
    app.get('/employees', [Routes.findAll ]);
    app.post('/employees/id', [Routes.findById]);
    app.post('/employees/status', [Routes.findByStatus]);
    app.post('/update', [Routes.updateById]);
    app.post('/delete', [Routes.deleteById]);

// Routes for Asset Master
    app.post('/assets', [Routes.assetcreate]);
    app.get('/assets', [Routes.assetfindAll ]);
    app.post('/assetfind', [Routes.assetfindById]);
    app.post('/assetupdate', [Routes.assetupdateById]);
    app.post('/assetdelete', [Routes.assetdeleteById]);

// Routes for Asset Category Master
    app.get('/masters', [Routes.masterfindAll ]);

// Routes for Stock view 
    app.get('/stocks', [Routes.stocksAvailable]);

// Routes for Issue Asset
    app.post('/issueAsset', [Routes.issueAsset]);

// Routes for Return Asset
    app.post('/returnAsset', [Routes.returnAsset]);

// Routes for Scrap Asset
    app.post('/scrapAsset', [Routes.scrapAsset]);

// Routes for Asset Category Master
app.post('/scrapfindAll', [Routes.scrapfindAll ]);

// Routes for Asset Histroy
    app.post('/historyfindbyId', [Routes.historyfindbyId ]);
    
    






// Port for viewing front-end
const port = process.env.PORT || 3000;
app.listen(port, async() => {
    console.log(`Listening on port ${port}`);
    await sequelize.authenticate();
    console.log(`Database connected...`);
})

   


