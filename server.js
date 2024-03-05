// required packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const expHbs = require('express-handlebars'); // expHb >>> expressHandlebars
const routes = require('./controllers');

//sequelize and session imported
const sequelize = require('./config/connection');
const sessionStore = require('connect-session-sequelize')(session.Store);

//allows express to be used by server
const app = express();
const PORT = process.env.PORT || 3001;


const sess = { 
    secret: 'secret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new sessionStore({
        db: sequelize
    })

};

//allows session to be used by server
app.use(session(sess));

//allows handlebars for use by server
const hbs = expHbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//app middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});



