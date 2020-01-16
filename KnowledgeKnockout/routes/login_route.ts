import { Request, Response } from 'express';
import { Authentication } from '../user/Authentication';
import { User } from '../user/User';
import { Users } from '../user/Users';
import { render } from '../views/render';

export async function login_route_get(req: Request, res: Response) {
    res.send(await render(['login'], {
        title: 'Login'
    }));
}

export async function login_route_post(req: Request, res: Response) {
    if (req.body.name && req.body.password && req.session && !req.session.user) {
        Users.set(req.session.id, <User>await Authentication.login(req.body.name, req.body.password));
        req.session.user = Users.get(req.session.id);
    }

    res.send(!!req.session?.user);
}