export {};

/* tslint:disable */
declare global {
    interface Array<T> {
        contains(o: T): boolean;
        remove(o: T): T[];
    }
}
/* tslint:enable */