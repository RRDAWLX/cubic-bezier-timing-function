function cubicBezierTiming(x1, y1, x2, y2, epsilon = 0.0001) {

    function y(t) {
        return (3 * y1 - 3 * y2 + 1) * Math.pow(t, 3) + (3 * y2 - 6 * y1) * Math.pow(t, 2) + 3 * y1 * t;
    }

    function tGenerator(x) {
        return function (t) {
            return (3 * x1 - 3 * x2 + 1) * Math.pow(t, 3) + (3 * x2 - 6 * x1) * Math.pow(t, 2) + 3 * x1 * t - x;
        };
    }

    function derivativeT(t) {
        return (9 * x1 - 9 * x2 + 3) * Math.pow(t, 2) + (6 * x2 - 12 * x1) * t + 3 * x1;
    }

    function resolveT(t, x) {
        let x0 = 0.5, x1 = 0.5, i = 0;

        do {
            x0 = x1;
            x1 = x0 - t(x0) / derivativeT(x0);
            if (x1 === 0) {
                console.error('zero');
                break;
            }
        } while (Math.abs((x1 - x0) / x0 > epsilon));

        return x1;
    }

    return function (x) {
        if (x === 0) {
            return 0;
        } else if (x === 1) {
            return 1;
        } else{
            let t = tGenerator(x);
            return y(resolveT(t, x));
        }
    };
}
