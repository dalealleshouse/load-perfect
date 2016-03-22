/// <reference path="../typings/browser.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

type predicate<T> = (o: T) => boolean;

interface Array<T> {
    find(predicate: predicate<T>): TsMonad.Maybe<T>;
    findIndex(predicate: predicate<T>): TsMonad.Maybe<number>;
}