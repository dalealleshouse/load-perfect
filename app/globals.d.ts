/// <reference path="../typings/browser.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
declare const require: any;

type predicate<T> = (o: T) => boolean;

interface Array<T> {
    find(predicate: predicate<T>): TsMonad.Maybe<T>;
    findIndex(predicate: predicate<T>): TsMonad.Maybe<number>;
}