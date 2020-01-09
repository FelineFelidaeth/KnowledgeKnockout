import { Request, Response } from 'express';

export async function logout_route_get(req: Request, res: Response) {
    if (req.session) req.session.user = undefined;
    res.redirect('/login');
}