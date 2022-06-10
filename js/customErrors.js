export {NoMessageError, SocketClosedError};

class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class NoMessageError extends MyError {
    constructor(message) {
        super('Error: ' + message);
    }
}

class SocketClosedError extends MyError {
    constructor(message) {
        super('Error: ' + message);
    }
}
