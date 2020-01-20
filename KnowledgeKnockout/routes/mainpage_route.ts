import { Request, Response } from 'express';
import { render } from '../views/render';

export async function mainpage_route_get(req: Request, res: Response) {
    res.send(await render(['mainpage'], {
        title: 'mainpage',
        userName: req.session?.user.name
    }));
}
