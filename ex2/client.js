const http = require("http");

let requestCounter = 1;

const myInterval = setInterval(() => {
	const date = new Date();
	console.log(
		`[Client] Init Call number ${requestCounter} : ${date.getMinutes()}:${date.getSeconds()}`
	);
	requestCounter++;
	requestCounter === 11 && clearBeforeYouGo();
	let data = "";

	http.get("http://localhost:8080", (res) => {
		res.on("data", (chunk) => {
			data += chunk;
		});
		res.on("end", () => {
			console.log(data);
		});
	});
});

const clearBeforeYouGo = () => {
	console.log("cleaning");
	clearInterval(myInterval);
};
