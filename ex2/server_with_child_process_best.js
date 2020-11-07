const http = require("http");
const child_process = require("child_process");

let requestNumber = 1;

http
	.Server((req, res) => {
		const forked = child_process.fork(__dirname+'/' +'gotoSleep.js');
		forked.on("message", (msg) => {
			res.statusCode = 200;
			const date = new Date();
			res.write(
				`[Server]: Responding to request ${requestNumber}  with worker: ${
					process.env.workerId
				}  Time is : ${date.getMinutes()}:${date.getSeconds()}`
			);
			console.log(
				`[Server] Good Morning !!  Did some called? it is ${date.getMinutes()}:${date.getSeconds()}`
			);
			res.end();
			requestNumber++;
			forked.removeAllListeners();
			forked.kill("SIGINT");
		});
		forked.send('gotoSleep');
	})
	.listen(8080);


console.log("server running on port 8080");
