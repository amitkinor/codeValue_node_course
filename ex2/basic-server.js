const http = require("http");

const sleep = (ms) => {
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};

let requestNumber = 1;

http
	.createServer((req, res) => {
		sleep(2000);
		res.statusCode = 200;
		const date = new Date();
		res.write(
			`[Server]: Responding to request ${requestNumber}. Time is : ${date.getMinutes()}:${date.getSeconds()}`
		);
		console.log(`[Server] Did some called? it is ${date.getMinutes()}:${date.getSeconds()}`);
		res.end();
		requestNumber++;
	})
	.listen(8080);

console.log("server running on port 8080");
