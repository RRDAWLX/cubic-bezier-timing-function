# cubic-bezier-timing-function
三次贝塞尔计时函数

# Usage
创建一条三次贝塞尔曲线，需要提供4个点P0、P1、P2、P3。计时函数所对应的贝塞尔曲线的P0和P3是确定的，分别为P0(0, 0)和P3(1, 1),我们只需提供P1(x1, y1)和P2(x2, y2)。  
We need 4 points to create a bezier curve. The bezier curve corresponding to the timing function has established P0(0, 0) and P3(1, 1). We need to provide the other 2 points P1(x1, y1) and P2(x2, y2).

```
// @param {number} x1  
// @param {number} y1  
// @param {number} x2  
// @param {number} y2  
// @param {number} precision 近似解的精度，默认值为 0.00001。
// The precision of the calculation. It is not necessary and has a default value 0.00001.  
cubicBezierTimingFunction(x1, y1, x2, y2, precision)

// cubicBezierTimingFunction(0.4, 0.3, 0.9, 1.2)  
// cubicBezierTimingFunction(0.4, 0.3, 0.9, 1.2, 0.0001)    



// @param {string} presetName 预设方案名称。  
// 'linear': [0, 0, 1, 1],  
// 'ease': [0.25, 0.1, 0.25, 1],  
// 'ease-in': [0.42, 0, 1, 1],  
// 'ease-out': [0, 0, 0.58, 1],  
// 'ease-in-out': [0.42, 0, 0.58, 1]  
// @param {number} precision 近似解的精度，默认值为 0.00001。
// The precision of the calculation. It is not necessary and has a default value 0.00001.  
cubicBezierTimingFunction(presetName, precision)

// cubicBezierTimingFunction('linear')  
// cubicBezierTimingFunction('linear', 0.000001)  
```


```
import cubicBezierTimingFunction from 'cubic-bezier-timing-function'

let timingFn = cubicBezierTimingFunction('ease')

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