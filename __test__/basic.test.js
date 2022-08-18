const {
    mathService,
    errorHandler,
    throwError,
} = require("../index");

/**
 * (suiteName: string, callback: () => {})
 *
 * suiteName: The base level descriptor for the suite and the tests defined within the callback.
 * callback: A enclosed set of test functions() that validate the test suite using except() conditions.
 */
describe('Testing Math Operations and Basic Mocks with Jest', () => {
    /**
     * --- Testing variables and classes ---
     */

    /**
     * (testName: string, callback: () => {})
     *
     * testName: the descriptor used to identify a specific test case.
     * callback: executes code and validates the state using except() functions.
     *
     * Common expect() functions
     */
    test('Test addition result to be as expected', () => {
        const result = 15 * 2;

        // !!result
        expect(result).toBeDefined();
        // ===
        expect(result).toEqual(30);
        // ==
        expect(result).toBe(30);
        // >
        expect(result).toBeGreaterThan(29);
        // <
        expect(result).toBeLessThan(31);
        // true
        expect(result).toBeTruthy();
    })

    /**
     * (testName: string, callback: () => {})
     *
     * testName: the descriptor used to identify a specific test case.
     * callback: executes code and validates the state using except() functions.
     *
     * Testing class types and object properties using an intentionally thrown Error.
     */
    test('Tests that throw errors', () => {
        try {
            // Throw an intentional error!
            throwError();
        } catch (e) {
            // e.message exists
            expect(e).toHaveProperty("message")
            // e is type of Error
            expect(e).toBeInstanceOf(Error)
            // e.message equals the provided message above.
            expect(e.message).toEqual("Error!")
        }
    })

    /**
     * (testName: string, callback: () => {})
     *
     * testName: the descriptor used to identify a specific test case.
     * callback: executes code and validates the state using except() functions.
     *
     * Testing mocks of functions and classes
     */
    test('Test simple math operation with a mock', () => {
        // spy on math service
        jest.spyOn(mathService, 'getAdditionResult', null)
        // could be a function that adds user to a session
        const mockCallback = jest.fn((a, b) => a + b)
        // could be a function that parses session information to prepare to the mock function above.
        const result = mathService.getAdditionResult(5, 5, mockCallback)

        // did the mocked function get called within the getAdditionResult function?
        expect(mockCallback).toHaveBeenCalledTimes(1)
        // what the mocked function provided the correct variables?
        expect(mockCallback).toHaveBeenCalledWith(5, 5)

        // did the mathService.getAdditionResult function get called?
        expect(mathService.getAdditionResult).toHaveBeenCalledTimes(1)
        // did the mathService.getAdditionResult get provided the same arguments as the mocked called back?
        expect(mathService.getAdditionResult).toHaveBeenCalledWith(5, 5, expect.any(Function))

        // Are we sane?
        expect(result).toEqual(10);
    })

    /**
     * (testName: string, callback: () => {})
     *
     * testName: the descriptor used to identify a specific test case.
     * callback: executes code and validates the state using except() functions.
     *
     * Testing mocks of logic implementation before
     */
    test('Spy on throwError-like mock with similar implementation', () => {
        const mockThrowErrorFn = jest.fn(() => {
            // Erase message for demo.
            // Logic implementation would go here.
            throw new Error("Error!")
        })
        const handledError = errorHandler(mockThrowErrorFn)

        expect(handledError).toBeInstanceOf(Error)
        expect(handledError.message).toEqual("Error!")
        // Check to ensure the mock function has been called.
        expect(mockThrowErrorFn.mock.calls.length).toBeGreaterThan(0)

        /*
         Giving a param to the mock function's implementation will cause this case to fail.
            indexer A [0]{First Function Call}
            indexer B [0]{First Argument (Error)}
            ->                             A  B */
        expect(mockThrowErrorFn.mock.calls[0][0]).toBeUndefined()
        expect(mockThrowErrorFn.mock.results[0].type).toEqual('throw')
        expect(mockThrowErrorFn.mock.results[0].value).toBeInstanceOf(Error)
    })
})

