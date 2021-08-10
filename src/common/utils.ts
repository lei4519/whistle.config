export function debounce(fn: Function, time: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), time);
  };
}

export function noOp() {}
