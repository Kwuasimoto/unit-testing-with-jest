
# Writing simple testable operations with express and jest
___

## Getting Started!
___

### - Start a new jest project

    mkdir unit-testing-getting-started

### - Create a new NodeJS Project
*in new directory...*

    cd unit-testing-getting-started
    npm init

### - Installing necessary packages
*it's good to separate your dev dependencies from native to avoid slowing your build times.*

    npm i -D jest

**jest**: testing framework </br>

### - Initialize jest config

    jest --init

### - Create test directory

Create a directory with a suitable name for running simple tests:

    mkdir __test__

### - Create test file and require our non-existent code

    type nil > __test__/index.test.js
*note: Will throw an error but will create file from terminal.*
*or manually create file*

## Testing the *global* instance
___


### - Create an index.js and write a timer function

    type nil > index.js
*note: Will throw an error but will create file from terminal.*
*or manually create file*

```javascript
module.exports = function timerGame(callback) {
    console.log("New timer game starting!")
    setTimeout(() => {
        callback && callback()
    }, 1000)
}
```

### - Describe how setTimeout is a function on global scale

In javascript we have access to a ***global*** object at all times. </br>
This global object does not have to be explicitly called for us to use its functions, ex setTimeout. </br> 
We can take advantage of Jests utilities to observe what is happening to the properties of an instantiated object. </br>
In this case... ***global***.

### - Use spyOn on global instance to observe setTimeout

Jest borrowed some of its functionality from Jasmine and gave us a spyOn function. </br>
The spyOn function allows us to transform instantiated methods on objects into spies. </br>
Spies, or "Spied Methods" allow us to track when functions are called, and with what arguments. </br>

*We want to see whats happening to global.setTimeout, so lets create a spy!* 

```javascript
jest.spyOn(global, 'setTimeout');
```
*! You wont have to import jest or global, they're both available on the global level*

### - Write setup and teardown functions
```javascript
// Clean up timers before each set of tests.
beforeEach(() => {
    jest.useFakeTimers();
})

// Clean up mocks after each set of tests.
afterEach(() => {
    jest.resetAllMocks();
})
```

### - Write tests for setTimeout

```javascript
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
```

___

## Testing the *local* instance

### - Writing a localized test using a mock
```javascript
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
```

### Running Tests file by file from the cli.

*If you haven't installed jest globally, you will need to install it locally*
    
    npm i -D jest

```json
{"": ""}
```
