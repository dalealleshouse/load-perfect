type listener = () => void;

export class EventEmitter {
    private _events: { [type: string]: listener[] } = {};

    on(type: string, listener: listener) {
        this._events[type] = this._events[type] || [];
        this._events[type].push(listener);
    }

    emit(type: string) {
        if (this._events[type]) {
            this._events[type].forEach(l => l());
        }
    }

    addChangeListner(listener: listener) {
        this.on("change", listener);
    }

    emitChange() {
        this.emit("change");
    }

    remove(type: string, listener: listener) {
        if (this._events[type]) {
            this._events[type].splice(this._events[type].indexOf(listener), 1);
        }
    }
};