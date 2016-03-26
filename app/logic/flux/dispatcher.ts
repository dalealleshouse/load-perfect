export interface IAction {
    actionType: string;
    [x: string]: any;
}

export class Dispatcher {
    private lastId: number = 0;
    private callbacks: { [id: string]: (action: IAction) => void } = {};

    register(callback: (action: IAction) => void) {
        let id = `CID_${this.lastId++}`;
        this.callbacks[id] = callback;
        return this.lastId;
    }

    dispatch(action: IAction) {
        for (let cb in this.callbacks) {
            this.callbacks[cb](action);
        }
    }
}