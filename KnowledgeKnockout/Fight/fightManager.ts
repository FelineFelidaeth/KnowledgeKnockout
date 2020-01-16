import { asyncTimeout } from '../helpers';
import { Users } from '../user/Users';
import { Fight } from './Fight';

export class FightManager {
    public static async start(): Promise<void> {
        let users = Users.values.filter(user => user.isSearchingMatch).sort((a, b) => a.avatarTotalLevel - b.avatarTotalLevel);

        for (let i = users.length - 1; i > 0; i -= 2) {
            if (i - 1 >= 0) {
                console.log('creating match');
                new Fight([users[i], users[i - 1]]);
                users[i].isSearchingMatch = users[i - 1].isSearchingMatch = false;
            }
        }

        await asyncTimeout(5000);

        FightManager.start();
    }
}