async function add(...nums) {
    let sum = 0;
    for (let num of nums) {
      sum = await asyncAdd(sum, num);
    }
    return sum;
  }

  function measureTime(fn, ...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    const timeTaken = end - start;
    const numAsyncOps = args.length - 1;
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = `Czas: ${timeTaken} ms<br>Liczba operacji: ${numAsyncOps}`;
  }

  const testData = new Array(101).fill().map(() => Math.floor(Math.random() * 10));
  measureTime(add, ...testData);

  function asyncAdd(a, b) {
    return new Promise(resolve => {
      setTimeout(() => resolve(a + b), Math.random() * 1000);
    });
  }