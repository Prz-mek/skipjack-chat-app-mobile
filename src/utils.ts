function copyListOfObiects(list: any[]): any[] {
    let copy: any[] = [];
    list.forEach(e => copy.push({...e}));
    return copy;
}