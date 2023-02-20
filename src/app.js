//hoja de creacion del server con express
const express = require('express');
const cors = require('cors');
const engine = require('ejs-mate') 
const path = require('path')
const morgan = require('morgan')
//const csurf = require('csurf')
const cookieParser = require('cookie-parser')
const CSRFToken = require('./middlewares/auth')

const app = express();

//settings
app.set('views', path.join(__dirname,'views'))
app.engine('ejs',engine)
app.set('view engine','ejs')
app.set('port', process.env.PORT || 5000);


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(CSRFToken.CSRFMiddleware)
app.use(function(err,req,res,next){
    if(err.code !== 'EBADCSRFTOKEN')return next(err)
    res.status(403)
    res.json({'msg':'se ha producido un error'})
})
app.use((req,res,next)=>{
    res.cookie('XSRF-TOKEN',req.csrfToken())
    next()
})

//router
app.use('/api-ciudadania/', require('./routes/CiudadaniaRoutes'))
app.use('/api-funcionario/', require('./routes/FuncionarioRoutes'))


//router caracteristicas hoja de vida (estado laboral, programas de gobierno, idiomas, etc)
//para funcionario pero en ruta y hojas separadas
/*
app.use('/api-empleo/postuladoCaractHv', require('./routes/caracteristicasHV'))
//route "only-employee"
app.use('/api-empleo/funcionario', require('./routes/funcionario'))
*/
module.exports= app;