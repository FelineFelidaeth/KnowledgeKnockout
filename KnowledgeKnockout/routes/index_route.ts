import { Request, Response } from "express";
import { render } from "../views/render";

export async function index_route_get(req: Request, res: Response) {
    res.send(await render(['index'], { title: 'welcome' }));
}