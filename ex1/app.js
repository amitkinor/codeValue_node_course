const sum = (num1, num2) => {
	return new Promise((resolve, reject) => {
		num1 !== null && num2 !== null
			? resolve(num1 + num2)
			: reject("cant calculate null values");
	});
};

module.exports = {
	sum,
};
