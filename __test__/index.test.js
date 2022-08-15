const timerGame = require('../index.js')

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('Test Global Scope', () => {
    it('setTimeout has been called, and with specific args.', () => {
        timerGame();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
    })
})

describe("Test Local Scope", () => {
    it('mockedFunction has been called, and waited for using jest runAllTimers utility.', () => {
        const mockedFunction = jest.fn();
        timerGame(mockedFunction);

        expect(mockedFunction).not.toBeCalled();

        // Waits until the next tick after all timers have run 
        jest.runAllTimers();

        expect(mockedFunction).toBeCalled();
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    })
})