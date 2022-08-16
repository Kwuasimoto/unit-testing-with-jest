const {mathService} = require('../index.js')

describe('Testing Math Operations with Jest', () => {
    /**
     * JEST MATH SERVICE EXAMPLE
     */

    it('test simple math operation', () => {
        // spy on math service
        jest.spyOn(mathService, 'getAdditionResult', null)
        // could be a function that adds user to a session
        const mockCallback = jest.fn((a, b) => a + b)
        // could be a function that parses session information to prepare to the mock function above.
        const result = mathService.getAdditionResult(5, 5, mockCallback)

        expect(mockCallback).toHaveBeenCalledTimes(1)
        expect(mockCallback).toHaveBeenCalledWith(5, 5)

        expect(mathService.getAdditionResult).toHaveBeenCalledTimes(1)
        expect(mathService.getAdditionResult).toHaveBeenCalledWith(5, 5, expect.any(Function))

        expect(result).toEqual(10);
    })
})