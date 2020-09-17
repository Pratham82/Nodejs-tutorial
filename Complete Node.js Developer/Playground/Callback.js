const doWorkCallback = (callback) => {
	setTimeout(() => {
		// callback("This is my error", "This is result");
		callback(undefined, "This is result");
	}, 1000);
};

doWorkCallback((err, res) => (err ? console.log(err) : console.log(res)));
