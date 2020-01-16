import { Request, Response } from 'express';
import { Questions } from '../questions/Questions';
import { User } from '../user/User';
import { render } from '../views/render';

export async function training_route_get(req: Request, res: Response) {
    res.send(await render(['training'], {
        title: 'training'
    }));
}

export async function training_route_post(req: Request, res: Response) {
    console.log(req.body);
    if (req.body.topic) {
        const question = await Questions.getRandomQuestion(req.body.topic);
        const answers = await Questions.getAnswers(question.id);
        console.log({ qId: question.id, q: question.content, answers: answers.map(a => [a.content, a.id]) });
        res.send({ qId: question.id, q: question.content, answers: answers.map(a => [a.content, a.id]) });
    } else if (req.body.answer && req.body.qId) {
        const correct = await Questions.test(req.body.answer, req.body.qId);

        if (req.session?.user) {
            const question = await Questions.getQuestion(req.body.qId);
            const avatar = (<User>req.session.user).avatars.find(a => a.topicId === question.topicId);
            if (avatar) avatar.level += 0.001 * question.secondsToSolve;
            console.log(avatar?.level, req.session?.user);
        }

        res.send(correct);
    }
}