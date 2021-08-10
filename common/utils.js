module.exports = {
  debounce: (fn, time) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), time);
    };
  }
}
