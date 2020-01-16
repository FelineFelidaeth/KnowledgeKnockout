import { Request, Response } from 'express';

export async function userinfo_route_post(req: Request, res: Response) {
    if (req.session) res.send({ avatars: req.session.user.avatars, userLevel: req.session.user.progress });
}