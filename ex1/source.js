const constants = require("./constants");
const EventEmitter = require("events");

eventEmitter = new EventEmitter();

const generateNumbers = () => {
	const num1 = Math.floor(Math.random() * 100);
	const num2 = Math.floor(Math.random() * 100);
	return { num1, num2 };
};

const init = () => setInterval(() => {
	eventEmitter.emit(constants.SHOOT_NUMBERS, generateNumbers());
}, 1000);

module.exports = { eventEmitter, init };
