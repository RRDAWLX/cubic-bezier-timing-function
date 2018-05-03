# cubic-bezier-timing-function
三次贝塞尔计时函数

# Usage
```
import cubicBezierTimingFunction from 'cubic-bezier-timing-function'

let timingFn = cubicBezierTimingFunction('linear')
// let timingFn = cubicBezierTimingFunction('linear', null, null, null, 0.000001)
// let timingFn = cubicBezierTimingFunction(0.4, 0.3, 0.9, 1.2)
// let timingFn = cubicBezierTimingFunction(0.4, 0.3, 0.9, 1.2, 0.0001)

let duration = 2000   // 动画时长，单位ms。 animation duration in milliseconds.
let startTime

function update() {
  if (!startTime) {
    startTime = Date.now()
  }

  let x = (Date.now() - startTime) / duration
  let y = timingFn(x)

  // 使用 y 值去更新其他值或视图
  // update something with y

  if (x < 1) {
    requestAnimationFrame(update)
  }
}

update()
```