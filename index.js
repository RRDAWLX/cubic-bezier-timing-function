let quadrate1 = document.querySelector('.quadrate1'),
  quadrate2 = document.querySelector('.quadrate2'),
  x1 = Math.random().toPrecision(3),
  y1 = Math.random().toPrecision(3),
  x2 = Math.random().toPrecision(3),
  y2 = Math.random().toPrecision(3),
  duration = 1;   // 动画时长，单位 s。

let f = cubicBezierTimingFunction(x1, y1, x2, y2),
    startTime = Date.now();
coefficients(x1, y1, x2, y2);
console.log(`f(0): ${f(0)}, f(1): ${f(1)}`);

quadrate1.style.animation = `trans ${duration}s cubic-bezier(${x1}, ${y1}, ${x2}, ${y2}) forwards`;
animate();

function animate () {
    let x = (Date.now() - startTime) / (duration * 1000);
    if (x > 1) {
        x = 1;
    }
    let y = f(x);
    console.log(x, y);
    quadrate2.style = `transform: translate3d(${600 * y}px, 0, 0);`;

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
    console.log(`x函数导函数系数\n a: ${3 * (3 * x1 - 3 * x2 + 1)}, b: ${2 * (3 * x2 - 6 * x1)}, c: ${3 * x1}`);
    // console.log(`delta: ${x1 * x1 + x2 * x2 - x1 * x2 - x1}`);
}