/*
* 防抖函数debounce/节流函数throttle
* 如果直接执行refresh，将会执行30次
* 可以将refresh函数传入debounce函数中，生成一个新的函数
*/
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
