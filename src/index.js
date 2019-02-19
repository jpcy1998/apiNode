const express = require('express')
const app = express()
const morgan = require('morgan')

//settings
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes
app.use('/api', require('./routes/clientes'))


//starting the server
app.listen(app.get('port'), () => {
    console.log('Server en el puerto ', app.get('port'))
})