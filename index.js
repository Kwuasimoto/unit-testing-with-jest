/**
 * Classless object that provides a simple function that can be used to create spies with jest.spyOn().
 * The actual implementation of this object could be anything from an auth service to an error handler.
 * @type {{getAdditionResult: (function(number, number, (a: number, b: number) => void): void)}}
 */
const mathService = {
    getAdditionResult: function (a, b, callback) {
        console.log(`Using advanced technology to find the sum of: [ ${a} + ${b} ]`)
        return callback(a, b);
    }
}

/**
 * Function that throws an error.
 * @throws e - Generic Error
 */
function throwError() {
    throw new Error("Error!")
}

/**
 * Runs the provided callback and handles its error
 * @param callback - a callback that intentionally throws an error.
 * @returns {Error} - error returned to the catch block.
 */
function errorHandler(callback) {
    try {
        callback && callback()
    } catch (e) {
        return e;
    }
}

/**
 * A simple timer function that accepts a blank function and executes it after a 1 second delay.
 * @param callback - a function to be executed after the amount of time in setTimeout [1000 ms]
 */
function timer(callback) {
    console.log("New timer game starting!")
    setTimeout(() => {
        callback && callback()
    }, 1000)
}

module.exports = {
    mathService,
    errorHandler,
    throwError,
    timer
}
