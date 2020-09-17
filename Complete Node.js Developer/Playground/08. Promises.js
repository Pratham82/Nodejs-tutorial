const doWorkPromise = new Promise((resolve, reject) =>
	setTimeout(() => {
		resolve("Task completed");
		reject("Task not completed");
	}, 2000)
);

doWorkPromise
	.then((res) => console.log("Success 😄", res))
	.catch((err) => console.log("Error 😢", err));
