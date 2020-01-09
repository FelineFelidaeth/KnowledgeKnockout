import { Request, Response } from 'express';
import { Authentication } from '../user/Authentication';
import { resolve } from 'path';

export async function login_route_get(req: Request, res: Response) {
    res.sendFile(resolve('./public/HMTL_CSS/html/login.html'));
}

export async function login_route_post(req: Request, res: Response) {
    if (req.body.name && req.body.password && req.session && !req.session.user) {
        req.session.user = await Authentication.login(req.body.name, req.body.password);
        if (req.session.user) req.session.user.sessionID = req.session.id;
    }

    res.send(!!req.session?.user);
}