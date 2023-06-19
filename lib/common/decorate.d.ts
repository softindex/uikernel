declare function decorate<T extends object>(obj: T, decor: Partial<T>): T;
export default decorate;
