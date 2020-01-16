import { Request, Response } from 'express';
import { Authentication } from '../user/Authentication';
import { render } from '../views/render';
import { User } from '../user/User';
import { Users } from '../user/Users';

export async function registration_route_get(req: Request, res: Response) {
    res.send(await render(['registration'], {
        title: 'Registrieren'
    }));
}

export async function registration_route_post(req: Request, res: Response) {
    if (req.body.name && req.body.password && req.body.email && req.session && !req.session.user) {
        Users.set(req.session.id, <User>await Authentication.register(req.body.name, req.body.password, req.body.email));
        req.session.user = Users.get(req.session.id);
    }

    res.send(!!req.session?.user);
}