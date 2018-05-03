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
}

function cubicBezierTimingFunction(x1, y1, x2, y2, z) {
    z = z || 0.00001;

    var pow = Math.pow,
        abs = Math.abs;

    /**
     * @function yFn 三次贝塞尔曲线 y 坐标的函数。
     * @param {number} t 贝塞尔曲线的绘制比例，t ∈ [0, 1]。
     * @return {number} 贝塞尔曲线上 t 对应的点的 y 坐标。
     */
    function yFn(t) {
        // 3 * (1 - t) ^ 2 * t * y1 + 3 * (1 - t) * t ^ 2 * y2 + t ^ 3
        // 3 * pow(1 - t, 2) * t * y1 + 3 * (1 - t) * pow(t, 2) * y2 + pow(t, 3);
        return (3 * y1 - 3 * y2 + 1) * pow(t, 3) + (3 * y2 - 6 * y1) * pow(t, 2) + 3 * y1 * t;
    }

    /**
     * @function xFn 三次贝塞尔曲线 x 坐标的函数。
     * @param {number} t 贝塞尔曲线的绘制比例，t ∈ [0, 1]。
     * @return {number} 贝塞尔曲线上 t 对应的点的 x 坐标。
     */
    function xFn(t) {
        // 3 * (1 - t) ^ 2 * t * x1 + 3 * (1 - t) * t ^ 2 * x2 + t ^ 3
        // 3 * pow(1 - t, 2) * t * x1 + 3 * (1 - t) * pow(t, 2) * x2 + pow(t, 3);
        return (3 * x1 - 3 * x2 + 1) * pow(t, 3) + (3 * x2 - 6 * x1) * pow(t, 2) + 3 * x1 * t;
    }

    /**
     * @function resolveT 根据给定的横坐标 x，求相应的三次贝塞尔曲线的绘制比例 t（近似解）。
     * @param {number} x 横坐标，x ∈ [0, 1]。
     * @return {number} 贝塞尔曲线的绘制比例 t。
     */
    function resolveT(x) {
      var left = 0,
          right = 1,
          t,
          approximateX;
      // 夹逼法求t的近似解
      while (left < right) {
        t = (left + right) / 2;
        approximateX = xFn(t);
        if (abs(x - approximateX) < z) {
          return t;
        } else if (x < approximateX) {
          right = t;
        } else {
          left = t;
        }
      }

      return t;
    }

    /**
     * 三次贝塞尔曲线的函数，可根据给定的横坐标 x 求对应的纵坐标 y。
     */
    return function (x) {
        if (x <= 0) {
          return 0;
        }

        if (x >= 1) {
          return 1;
        }

        return yFn(resolveT(x));
    };
}