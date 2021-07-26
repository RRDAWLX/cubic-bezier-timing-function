let duration = 1;   // 动画时长，单位 s。
let quadrate1 = document.querySelector('.quadrate1');
let quadrate2 = document.querySelector('.quadrate2');

// 方案一：随机生成点数据
let p = 4
let x1 = +Math.random().toFixed(p);
let y1 = +(Math.random() * 3 - 1).toFixed(p);
let x2 = +Math.random().toFixed(p);
let y2 = +(Math.random() * 3 - 1).toFixed(p);
let f = cubicBezierTimingFunction(x1, y1, x2, y2);
quadrate1.style.animation = `trans ${duration}s cubic-bezier(${x1}, ${y1}, ${x2}, ${y2}) forwards`;
coefficients(x1, y1, x2, y2);

// 方案二：使用预定义数据
/* let predefine = Object.keys(presets).sort(() => Math.random() > 0.5 ? 1 : -1).pop();
console.log(`predefine: ${predefine}`);
let f = cubicBezierTimingFunction(predefine, 0.00001);
quadrate1.style.animation = `trans ${duration}s ${predefine} forwards`; */

console.log(`f(0): ${f(0)}, f(1): ${f(1)}`);

let startTime = Date.now();
animate();

function animate() {
  let x = (Date.now() - startTime) / (duration * 1000);

  if (x > 1) {
    x = 1;
  }

  let y = f(x);
  console.log(x, y);
  quadrate2.style = `transform: translate3d(${1000 * y}px, 0, 0);`;

  if (x < 1) {
    requestAnimationFrame(animate);
  }
}

/**
 * @desc
 */
function coefficients(x1, y1, x2, y2) {
  console.log(`x1: ${x1}, y1: ${y1}, x2: ${x2}, y2: ${y2}`);
  console.log(`x函数系数\n a: ${3 * x1 - 3 * x2 + 1}, b: ${3 * x2 - 6 * x1}, c: ${3 * x1}`);
}
