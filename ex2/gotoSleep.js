const sleep = (ms) => {
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};

process.on('message',()=>{
  console.log('Going to sleep')
  sleep(2000);
  process.send('good morning');
})
