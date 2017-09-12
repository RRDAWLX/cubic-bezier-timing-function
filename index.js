let quadrate2 = document.querySelector('.quadrate2');

let f = cubicBezierTiming(0.17, 0.61, 0, 0.93),
    startTime = Date.now();
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

animate();
