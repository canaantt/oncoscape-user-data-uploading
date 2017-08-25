const longComputation = (n) => {
  let sum = n;
  for (let i = 0; i < 10; i++) {
    sum += i;
  };
  return sum;
};

process.on('message', (msg) => {
  console.log('msg is:', msg);
  const sum = longComputation(msg);
  process.send(sum);
});
