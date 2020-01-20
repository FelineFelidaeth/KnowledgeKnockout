export const randStr = (length: number): string => [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
export const randomizeArray = <T>(arr: T[]): T[] => {
    let copy = arr.slice();
    let newArray = [];
    while (copy.length > 0) {
        newArray.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return newArray;
};
export const asyncTimeout = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
export const asyncTimeoutWithCondition = (ms: number, conditions: { reference: any, propertyName: string, value: any }[], checkInterval: number = 100): Promise<void> => new Promise(resolve => {
    const timeout = setTimeout(resolve, ms);
    const interval = setInterval(() => {
        if (conditions.every(c => c.reference[c.propertyName] === c.value)) {
            clearTimeout(timeout);
            clearInterval(interval);
            resolve();
        }
    }, checkInterval);
});