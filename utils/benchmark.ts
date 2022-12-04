export function benchmarkFunction(f: () => void, repetitions: number) {
  const startTime = performance.now();
  for (let i = 0; i < repetitions; i++) {
    f();
  }
  const completeDuration = performance.now() - startTime;
  console.log('mean duration ms = ', completeDuration / repetitions);
}
