const { sum } = require("./app");
const constants = require("./constants");
const { eventEmitter, init } = require("./source");

let counter = 1;

eventEmitter.on(constants.SHOOT_NUMBERS, (data) => {
	counter++;

	sum(data.num1, data.num2)
		.then((result) => console.log(`Calculation number ${counter} : ${result}`))
		.catch((err) => {
			console.log(err);
		});
});

init();
