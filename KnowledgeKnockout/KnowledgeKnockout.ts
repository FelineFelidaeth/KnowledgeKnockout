import * as compression from 'compression';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { add_question_route_get, add_question_route_post } from './routes/add_question_route';
import { any_route_get } from './routes/any_route';
import { index_route_get } from './routes/index_route';
import { login_route_get, login_route_post } from './routes/login_route';
import { logout_route_get } from './routes/logout_route';
import { registration_route_get, registration_route_post } from './routes/registration_route';
import { socketiotest_get_route } from './routes/socketiotest_get_route';
import { training_route_get, training_route_post } from './routes/training_route';
import { SocketConnection } from './socket_connection/SocketConnection';


const app = express();

const server = app.listen(80);

SocketConnection.initialize(server);

app.use(helmet());
app.use(compression());
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: String(process.env.SESSION_SECRET),
    //store: MySQL.sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
    name: process.env.SESSIONID
}));

// initialize session variables
app.use((req, res, next) => {
    if (req.session && !req.session.initialized) {
        //req.session.user = new User();

        req.session.initialized = true;
    }

    next();
});


app.get('/', index_route_get);

app.get('/socketiotest', socketiotest_get_route);

app.get('/add-question', add_question_route_get).post('/add-question', add_question_route_post);

app.get('/register', registration_route_get).post('/register', registration_route_post);

app.get('/login', login_route_get).post('/login', login_route_post);
app.get('/logout', logout_route_get);

app.get('/training', training_route_get).post('/training', training_route_post);

app.get('*', any_route_get);