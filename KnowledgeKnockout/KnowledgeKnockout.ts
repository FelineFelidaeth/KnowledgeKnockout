// initialize env variables
import { config } from 'dotenv';

for (const [key, val] of Object.entries(<any>config().parsed)) {
    process.env[key] = <string>val;
}

import * as compression from 'compression';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { FightManager } from './Fight/fightManager';
import { add_question_route_get, add_question_route_post } from './routes/add_question_route';
import { any_route_get } from './routes/any_route';
import { userinfo_route_post } from './routes/userinfo_route';
import { index_route_get } from './routes/index_route';
import { login_route_get, login_route_post } from './routes/login_route';
import { logout_route_get } from './routes/logout_route';
import { mainpage_route_get } from './routes/mainpage_route';
import { match_route_get, match_route_post } from './routes/match_route';
import { registration_route_get, registration_route_post } from './routes/registration_route';
import { training_route_get, training_route_post } from './routes/training_route';
import { SocketConnection } from './socket_connection/SocketConnection';
import { Authentication } from './user/Authentication';
import { Users } from './user/Users';
import { monster_route_get } from './routes/monster_route';


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

app.use((req, res, next) => {
    if (req.session?.id) req.session.user = Users.get(req.session.id);

    next();
});


app.get('/', index_route_get);

app.get('/add-question', Authentication.loginCheck, add_question_route_get).post('/add-question', Authentication.loginCheck, add_question_route_post);

app.get('/register', registration_route_get).post('/register', registration_route_post);

app.get('/login', login_route_get).post('/login', login_route_post);
app.get('/logout', logout_route_get);

app.get('/mainpage', Authentication.loginCheck, mainpage_route_get);

app.get('/training', Authentication.loginCheck, training_route_get).post('/training', Authentication.loginCheck, training_route_post);

app.get('/match', Authentication.loginCheck, match_route_get).post('/match', Authentication.loginCheck, match_route_post);

app.post('/userinfo', Authentication.loginCheck, userinfo_route_post);

app.get('/monster', Authentication.loginCheck, monster_route_get);

app.get('*', any_route_get);

FightManager.start();