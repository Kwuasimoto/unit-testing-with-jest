module.exports = function timerGame(callback) {
    console.log("New timer game starting!")
    setTimeout(() => {
        callback && callback()
    }, 1000)
}
