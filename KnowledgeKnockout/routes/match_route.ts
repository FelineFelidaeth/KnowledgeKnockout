import { Request, Response } from 'express';
import { FightManager } from '../Fight/FightManager';
import { render } from '../views/render';

export async function match_route_get(req: Request, res: Response) {
    res.send(await render(['match'], {
        title: 'match'
    }));
}

export async function match_route_post(req: Request, res: Response) {
    if (req.session?.user && typeof req.body.isSearchingMatch === 'boolean') {
        req.session.user.isSearchingMatch = req.body.isSearchingMatch;
    }

    res.send({ isInMatch: !!req.session?.user?.isInMatch, isSearchingMatch: !!req.session?.user?.isSearchingMatch });
}