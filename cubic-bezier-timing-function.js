/**
 * @function cubicBezierTimingFunction 三次贝塞尔曲线函数生成器，根据点 P1，P2 以及精度 z，生成一条三次贝塞尔曲线的对应函数。
 * @param {number} x1 三次贝塞尔曲线中点 P1 的横坐标
 * @param {number} y1 三次贝塞尔曲线中点 P1 的纵坐标
 * @param {number} x2 三次贝塞尔曲线中点 P2 的横坐标
 * @param {number} y2 三次贝塞尔曲线中点 P2 的纵坐标
 * @param {nubmer} z 牛顿法求方程近似解的精度，默认值为 0.001
 * @return {function} 三次贝塞尔曲线对应的函数
 */

function cubicBezierTimingFunction(x1, y1, x2, y2, z = 0.001) {

    /**
     * @function yFn 三次贝塞尔曲线 y 坐标的函数。
     * @param {number} t 贝塞尔曲线的绘制比例，t ∈ [0, 1]。
     * @param {number} 贝塞尔曲线上 t 对应的点的 y 坐标。
     */
    function yFn(t) {
        return (3 * y1 - 3 * y2 + 1) * Math.pow(t, 3) + (3 * y2 - 6 * y1) * Math.pow(t, 2) + 3 * y1 * t;
        // return 3 * Math.pow(1 - t, 2) * t * y1 + 3 * (1 - t) * Math.pow(t, 2) * y2 + Math.pow(t, 3);
    }

    /**
     * @function xFn 三次贝塞尔曲线 x 坐标的函数。
     * @param {number} t 贝塞尔曲线的绘制比例，t ∈ [0, 1]。
     * @param {number} 贝塞尔曲线上 t 对应的点的 x 坐标。
     */
    function xFn(t) {
        return (3 * x1 - 3 * x2 + 1) * Math.pow(t, 3) + (3 * x2 - 6 * x1) * Math.pow(t, 2) + 3 * x1 * t;
        // return 3 * Math.pow(1 - t, 2) * t * x1 + 3 * (1 - t) * Math.pow(t, 2) * x2 + Math.pow(t, 3);
    }

    /**
     * @function derivativeXFn 三次贝塞尔曲线 x 坐标的函数的导函数。
     * @param {number} t 贝塞尔曲线的绘制比例，t ∈ [0, 1]。
     * @return {number} 贝塞尔曲线上 t 对应的点上的切线的斜率。
     */
    function derivativeXFn(t) {
        return (9 * x1 - 9 * x2 + 3) * Math.pow(t, 2) + (6 * x2 - 12 * x1) * t + 3 * x1;
        // return 3 * Math.pow(1 - t, 2) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * Math.pow(t, 2) * (1 - x2);
    }

    /**
     * @function resolveT 根据给定的横坐标 x，求相应的三次贝塞尔曲线的绘制比例 t。
     * @param {number} x 横坐标，x ∈ [0, 1]。
     * @return {number} 贝塞尔曲线的绘制比例 t。
     */
    function resolveT(x) {
        // 用牛顿法求函数的近似解，可参考《人教版高中数学选修2-2》1.2导数的计算中的探究与发现“牛顿法——用导数方法求方程的近似解”
        let x0, x1 = x,
            i = 0;

        do {
            x0 = x1;
            x1 = x0 - (xFn(x0) - x) / derivativeXFn(x0);
        } while (Math.abs((x1 - x0) / x0 > z));

        return x1;
    }

    /**
     * 三次贝塞尔曲线的函数，可根据给定的横坐标 x 求对应的纵坐标 y。
     */
    return function (x) {
        return yFn(resolveT(x));
    };
}
