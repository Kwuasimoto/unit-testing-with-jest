const timerGame = require('../index.js')

// Clean up timers before each set of tests.
// [Replaced by fakeTimers in jest.config.js]
// beforeEach(() => {
//     jest.useFakeTimers();
// })

// Clean up mocks after each set of tests.
// [Replaced by resetMocks in jest.config.js]
// afterEach(() => {
//     jest.resetAllMocks();
// })

describe('Test Global Scope', () => {
    it('setTimeout has been called, and with specific args.', () => {
        // Spy on the setTimeout function
        jest.spyOn(global, 'setTimeout', null);
        timerGame();

        // Test the function after running it
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
    })
})

describe("Test Local Scope", () => {
    it('mockedFunction has been called, and waited for using jest runAllTimers utility.', () => {
        // Mock a dummy function
        const mockedFunction = jest.fn();
        timerGame(mockedFunction);

        // Check if the mock function was called (Should not be until after 1 second.)
        expect(mockedFunction).not.toBeCalled();

        // Waits until the next tick after all timers have run
        jest.runAllTimers();

        // Check now, if the mock function was called (Should be)
        expect(mockedFunction).toBeCalled();
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    })
})