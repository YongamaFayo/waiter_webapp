const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Route = require('./routes')
const routes = Route()

const app = express()

const session = require('express-session')
const flash = require('express-flash')
const e = require('express')

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.engine('handlebars', exphbs({ layoutsDir: "views/layouts/" }));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", routes.home)

app.post("/waiters/:user", routes.selectDays)

app.get("/waiters/:user", routes.getUserInfo)

app.get("/days", routes.postDays)

app.get("/reset", routes.reset_waiters)

const PORT = process.env.PORT || 3091;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})