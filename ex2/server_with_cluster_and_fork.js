const http = require("http");
const cluster = require("cluster");

const sleep = (ms) => {
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};

if (cluster.isMaster) {
	const numOfWorkers = 4;
	for (let workerInd = 0; workerInd < numOfWorkers; workerInd++) {
		cluster.fork({ workerId: workerInd });
	}
	console.log(`Created ${numOfWorkers} workers`);
} else {
	let requestNumber = 1;

	http
		.Server((req, res) => {
			sleep(2000);
			res.statusCode = 200;
			const date = new Date();
			res.write(
				`[Server]: Responding to request ${requestNumber}  with worker: ${process.env.workerId}  Time is : ${date.getMinutes()}:${date.getSeconds()}`
			);
			console.log(
				`[Server] Did some called? it is ${date.getMinutes()}:${date.getSeconds()}`
			);
			res.end();
			requestNumber++;
		})
		.listen(8080);
}

console.log("server running on port 8080");
