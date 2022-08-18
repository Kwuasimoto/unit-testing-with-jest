# **Writing simple testable operations using jest**

___

## **Getting Started - Setup**

___

### **- Start a new jest project**

    mkdir unit-testing-getting-started

### **- Create a new NodeJS Project**

*in new directory...*

    cd unit-testing-getting-started
    npm init

### **- Installing necessary packages**

*it's good to separate your dev dependencies from native to avoid slowing your build times.*

    npm i -D jest

**jest**: testing framework </br>

### **- Initialize jest config**

    jest --init

### **- Edit jest.config.js**
```javascript
module.exports = {
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",

    // Automatically reset mock state before every test
    resetMocks: true,

    // The root directory that Jest should scan for tests and modules within
    rootDir: "__test__",

    // Where coverage's will be outputted
    coverageReporters: ["text", "json", "html"]
};
```
___
### **- Running Tests file by file from the cli.**
Jest tests are meant to be run natively from the terminal. Jest provides a wide array of options you can supply to a cli
that help us for executing individual tests with different settings.

Today we will focus on **-t**, or **--textNamePattern={value}** that accepts a string or regex pattern for matching test names.</br>
We can use the command below with **-t** to run our tests with the same description provided in the first argument of the test() function.


```json
{
  "scripts": {
    "test:basic": "jest -t=\"Testing Math Operations and Basic Mocks with Jest\"",
    "test:math": "jest -t=\"Test addition result to be as expected\"",
    "test:errors": "jest -t=\"Tests that throw errors\"",
    "test:services": "jest -t=\"Test simple math operation with a mock\"",
    "test:mocks": "jest -t=\"Spy on throwError-like mock with similar implementation\"",
    "test:timers": "jest -t=\"Testing Timers with Jest\"",
    "test:async1": "jest -t=\"SetTimeout has been called, and with specific args\"",
    "test:async2": "jest -t=\"MockedFunction has been called, and waited for using jest runAllTimers utility\"",
    "test:all": "jest"
  }
}
```

### **- Create test directory**

Create a directory with a suitable name for running simple tests:

    mkdir __test__

### **- Create test files and require our non-existent code**

    type nil > __test__/basic.test.js
    type nil > __test__/timer.test.js

*note: Will throw an error but will create file from terminal.*
*or manually create file*

___

## **[WRITING] logic for the tests**
### **- Create an index.js and write the functions required for the tests.**

    type nil > index.js

*note: Will throw an error but will create file from terminal.*
*or manually create file*

---
Here we are creating 3 functions, and a classless object with a function that we can use for spying on.

```javascript
// Used for spy
// Used in basic.test.js
const mathService = {
    getAdditionResult: function (a, b, callback) {
        console.log(`Using advanced technology to find the sum of: [ ${a} + ${b} ]`)
        return callback(a, b);
    }
}

// Used in basic.test.js
function throwError() {
    throw new Error("Error!")
}

// Used in basic.test.js
function errorHandler(callback) {
    try {
        callback && callback()
    } catch (e) {
        return e;
    }
}

// Used in timer.test.js
function timer(callback) {
    console.log("New timer game starting!")
    setTimeout(() => {
        callback && callback()
    }, 1000)
}
```

*Now that our code implementation is complete, it's time to get started...*

___
## **Getting Started - Setup**


### **- [WRITING] tests for raw code testing**
---
In this example we're testing the raw functionality of Jest.</br>
commonly used to see if your framework is recognized and running.

```javascript
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
```

    npm run test:math

___
### **- Running our first test from the cli**.

    jest -t="Test addition result to be as expected"

*note: for this Demo, the commands are provided in package.json*

### **- [WRITING] tests that throw errors (very basic implementation)**
---

Testing a function that is throwing an error, whether its intentionally or something is wrong with existing code!

```javascript
test('Test errors being thrown', () => {
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
```

    npm run test:errors

---
### **- [WRITING] our first mocks using mathService classless object**

Here we are testing the business logic of a service that is already/could be waiting to be implemented.

```javascript
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
```

    npm run test:services

___
### **- [WRITING] a mocked implementation of our throwError function**

In this example, we took our throwError functions implementation out of its original function and created a mock.</br>
This allows us to run the mock with a fresh instance every test iteration and develop until the implementation is worked
as expected.

```javascript
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
```

    npm run test:mocks

### **Running a whole Test Suite at once (describe)...**

    npm run test:basic

# End of basic!

___
## **Getting Started - Timers**

In jest, we can test asynchronous behavior such as api calls with services or a runnable callback.</br>
Today we will use a pseudo asynchronous example using a timer and a blank callback function mocked using jest.fn().</br>
Similar testing for real case scenarios can be achieved using the same logic.</br>

### **- setTimeout is a function on the global scope**

In javascript we have access to a ***global*** object at all times. </br>
This global object does not have to be explicitly called for us to use its functions, ex setTimeout. </br>
We can take advantage of Jests utilities to observe what is happening to the properties of an instantiated object. </br>
In this case... ***global***.

### **- Using spyOn on global instance to observe setTimeout**

Jest borrowed some of its functionality from Jasmine and gave us a spyOn function. </br>
The spyOn function allows us to transform instantiated methods on objects into spies. </br>
Spies, or "Spied Methods" allow us to track when functions are called, and with what arguments. </br>

___
### **- [WRITING] Tests to spy on services [insert hackerman meme]**

*We want to see whats happening to global.setTimeout, so lets create a spy!*

Writing tests to spy on the global javascript object is way easier than it sounds.</br>
We simply inject the global variable in to the jest.spyOn(global, 'methodName') function </br>
and provide a method name to tell jest which function we want to create a spy of.

```javascript
test('SetTimeout has been called, and with specific args', () => {
    // SPY CREATION: Spy on the setTimeout function
    jest.spyOn(global, 'setTimeout', null);
    timer();

    // Test the function after running it
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
})
```

    npm run test:async1

*note: You will not have to import jest or global, they're both available on the global level*
___
### **- [WRITING] a mock with our pseudo asynchronous code**

Here we are doing something very similar in base.test.js where we are providing a mocked function to</br>
our testable service as a callback.

```javascript
test('MockedFunction has been called, and waited for using jest runAllTimers utility', () => {
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
```

    npm run test:async2

Enter the command below to run your new tests

    npm run test:timers

Something failed? Why!?

In jest, timers are a bit funky and don't execute as expected when they run in a test suite where multiple instances
of timer is being used. From the jest documentation, it is recommended that you use a cleanup function, namely - beforeEach(); that </br>
that resets the state of your test Suite or global test scope before every test. Adding this function within a describe()
callback block will cause the function to only be run for the tests within that suite, defined by test().

We need to add this to the top of timer.test.js describe block.
```javascript
beforeEach(() => {
    jest.useFakeTimers()
})
```

run the npm command for the timers suite again, and all will check out!

*In this demo it is already added, just uncomment it*

## **End of Timers!**
___

# *You are now a Jest Noob! Congratulations!*
