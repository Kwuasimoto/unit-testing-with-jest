const {timer} = require("../index");

/**
 * beforeEach(callback: () => {})
 * 
 * callback: a method that gets ran before every test case.
 *  In this case we are resetting the timers so our tests run as expected.
 *  with jest, using the global timers can cause unexpected results and its recommended
 *  by documentation to use their built in timers.
 */
beforeEach(() => {
    jest.useFakeTimers();
})

/**
 * (suiteName: string, callback: () => {})
 * 
 * suiteName: The base level descriptor for the suite and the tests defined within the callback.
 * callback: A enclosed set of test functions() that validate the test suite using except() conditions.
 */
describe("Testing Timers with Jest", () => {
    /**
     * --- Testing asyncronous mocks --- 
     */

    /**
     * 
     * (testName: string, callback: () => {})
     * 
     * testName: the descriptor used to identify a specific test case.
     * callback: executes code and validates the state using except() functions.
     * 
     * Create a spy for the global instance variable
     */
    test('SetTimeout has been called, and with specific args.', () => {
        // Spy on the setTimeout function
        jest.spyOn(global, 'setTimeout', null);
        timer();

        // Test the function after running it
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
    })

    /**
     * 
     * (testName: string, callback: () => {})
     * 
     * testName: the descriptor used to identify a specific test case.
     * callback: executes code and validates the state using except() functions.
     * 
     * create a mock of a function using jest.fn() for testing logic before implementation.
     */
    test('MockedFunction has been called, and waited for using jest runAllTimers utility.', () => {
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