declare var require: any;

interface Array<T> {
    contains(o: T): boolean;
    remove(o: T): T[];
}