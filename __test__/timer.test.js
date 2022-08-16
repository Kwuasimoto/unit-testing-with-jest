// Reset timers before each test.
const {timer} = require("../index");

beforeEach(() => {
    jest.useFakeTimers();
})

describe("Testing Timers with Jest", () => {
    /**
     * JEST TIMER EXAMPLE
     */

    it('setTimeout has been called, and with specific args.', () => {
        // Spy on the setTimeout function
        jest.spyOn(global, 'setTimeout', null);
        timer();

        // Test the function after running it
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
    })

    it('mockedFunction has been called, and waited for using jest runAllTimers utility.', () => {
        // Mock a dummy function
        const mockedFunction = jest.fn();
        timer(mockedFunction);

        // Check if the mock function was called (Should not be until after 1 second.)
        expect(mockedFunction).not.toBeCalled();

        // Waits until the next tick after all timers have run
        jest.runAllTimers();

        // Check now, if the mock function was called (Should be)
        expect(mockedFunction).toBeCalled();
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    })
})