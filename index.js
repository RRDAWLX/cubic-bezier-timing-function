let quadrate2 = document.querySelector('.quadrate2');

let f = cubicBezierTimingFunction(0.38, 0.13, 0, 0.57),
    startTime = Date.now();
// coefficients(0.1, 0.43, 0.14, 0.65);
console.log(`f(0): ${f(0)}, f(1): ${f(1)}`);

function animate () {
    let x = (Date.now() - startTime) / 1000;
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

function coefficients(x1, y1, x2, y2) {
    console.log(`a: ${3 * x1 - 3 * x2 + 1}, b: ${3 * x2 - 6 * x1}, c: ${3 * x1}`);
    console.log(`a: ${3 * (3 * x1 - 3 * x2 + 1)}, b: ${2 * (3 * x2 - 6 * x1)}, c: ${3 * x1}`);
    console.log(`delta: ${x1 * x1 + x2 * x2 - x1 * x2 - x1}`);
}

animate();
