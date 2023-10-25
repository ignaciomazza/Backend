import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import connectToDB from "./config/configServer.js"
import { __dirname } from "./utils.js"

import routerP from './routers/products.router.js';
import routerC from './routers/carts.router.js';
import routerV from './routers/views.router.js';
import routerU from './routers/user.router.js';

import socketProducts from "./listeners/socketProducts.js"
import socketChat from './listeners/socketChat.js';

import MongoStore from 'connect-mongo';
import session from 'express-session';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080

app.use(cookieParser());

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine())
app.set('view engine', 'handlebars');
app.set("views", __dirname + "/views")

app.use(
    session({
        store: MongoStore.create({
            mongoUrl:
                'mongodb+srv://juanignaciomazza470:i99kg3OtkqdpNEuy@cluster0.mqbg9qp.mongodb.net/ecommerce?retryWrites=true&w=majority',
            ttl: 15,
        }),
        secret: '$sic290weDS;aksd',
        resave: false,
        saveUninitialized: false,
    })
);
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use('/api/user', routerU);
app.use('/', routerV);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

connectToDB()

const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`);
        console.log(`\t1). http://localhost:${PORT}/login`)
    }
    catch (err) {
        console.log(err);
    }
});

const socketServer = new Server(httpServer)

socketProducts(socketServer)
socketChat(socketServer)