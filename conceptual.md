### Conceptual Exercise

Answer the following questions below:

-   What are some ways of managing asynchronous code in JavaScript?

You can use promises, timeouts, or the async/await keywords (which are syntactical sugar built upon promises).

-   What is a Promise?

A promise is an object that stands in for a future value - you would use a promise for an operation such as an API call that won't immediately return a value.

-   What are the differences between an async function and a regular function?

An async function allows you to await resolution of a promise before continuing to the next codeblock.

-   What is the difference between Node.js and Express.js?

Node.js is a back-end implementation of JavaScript that runs outside of a web browser. Express.js is a framework comparable to Flask that allows you to create web app applications with Node.js - Node.js on its own does not necessarily need to be used with a server-side application (you could use it simply to create command-line tools, for example).

-   What is the error-first callback pattern?

The error-first callback pattern is a key feature of the Node.js implementation; Node functions will frequently take a callback handling potential errors as one of the first arguments.

-   What is middleware?

Middleware is code that runs inbetween route functions; they would commonly manage operations such as error handling and logging data. They have acess to the request and response, and can call the next function.

-   What does the `next` function do?

The `next` function tells Express to continue to the next route function. Alternatively, if you pass an argument into next, Express will throw an error.

-   What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
	const elie = await $.getJSON('https://api.github.com/users/elie');
	const joel = await $.getJSON('https://api.github.com/users/joelburton');
	const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

	return [elie, matt, joel];
}
```

The code above is making consecutive asynchronous calls, then returning all three at once. It'd be more efficient to make all the API calls without the `await` keyword, then use `Promise.all` to track when all three promises have been resolved.

The function should be re-factored so it's re-usable for other users. It could, for example, take an argument with an array of usernames, then loop through those usernames and dynamically make API calls for their GitHub profile.

Lastly, instead of using specific variable names, the function should create an array and dynamically return data about all users.
