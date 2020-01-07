export const randStr = (length: number): string => [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
export const randomizeArray = (arr: any[]): any[] => {
    let copy = arr.slice();
    let newArray = [];
    while (copy.length > 0) {
        newArray.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return newArray;
};