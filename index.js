const mathService = {
    getAdditionResult: function performAddition(a, b, callback) {
        console.log(`Using advanced technology to find the sum of: [ ${a} + ${b} ]`)
        return callback(a, b);
    }
}

function timer(callback) {
    console.log("New timer game starting!")
    setTimeout(() => {
        callback && callback()
    }, 1000)
}

module.exports = {
    mathService,
    timer
}
