var presets = {
  'linear': [0, 0, 1, 1],
  'ease': [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1]
};

/**
 * @function cubicBezierTimingFunction 三次贝塞尔曲线函数生成器，根据点 P1，P2 以及精度 precision，生成一条三次贝塞尔曲线的对应函数。
 * @param {string} x1 三次贝塞尔曲线预设值名，未匹配到则默认为 'linear'
 * @param {number} x1 三次贝塞尔曲线中点 P1 的横坐标
 * @param {number} y1 三次贝塞尔曲线中点 P1 的纵坐标
 * @param {number} x2 三次贝塞尔曲线中点 P2 的横坐标
 * @param {number} y2 三次贝塞尔曲线中点 P2 的纵坐标
 * @param {number} precision 近似解的精度，默认值为 0.00001
 * @return {function} 三次贝塞尔曲线对应的函数
 */

function cubicBezierTimingFunction(x1, y1, x2, y2, precision) {
  var preset;
  if (typeof x1 === 'string') {
    precision = y1;
    preset = presets[x1] || presets.linear;
    x1 = preset[0];
    y1 = preset[1];
    x2 = preset[2];
    y2 = preset[3];
  } else if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) {
    x1 = presets.linear[0];
    y1 = presets.linear[1];
    x2 = presets.linear[2];
    y2 = presets.linear[3];

    if (console && console.warn) {
      console.warn('x1、x2应该在闭区间[0, 1]中取值');
    }
  }

  precision = precision || 0.00001;

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
      if (abs(x - approximateX) < precision) {
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

module.exports = cubicBezierTimingFunction;