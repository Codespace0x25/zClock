"use strict";
    const cx = 100, cy = 100;  // Radius
    const _clockstyle = "width: " + (2 * cx) + "px;  height: " + (2 * cy) + "px;"
      + "border: 7px solid #282828; background: #585858;"
      + "position: absolute; left:50%; top:50%; transform:translate(-50%, -50%);"
      + "box-shadow: -4px -4px 10px rgba(67,67,67,0.5), inset 4px 4px 10px rgba(0,0,0,0.5),"
      + "inset -4px -4px 10px rgba(67,67,67,0.5), 4px 4px 10px rgba(0,0,0,0.3);"

    sidiv("", _clockstyle)
    let c = canvas2D({ width: px(2 * cx), height: px(2 * cy) })
    c.ctx.lineCap = "round"
    unselectBase()

    // Paint anything radial
    function tick(color, width, angle, length, innerlength = 0) {
      function ls(length) { return length * Math.sin(angle / 180.0 * Math.PI) }
      function lc(length) { return -length * Math.cos(angle / 180.0 * Math.PI) }
      c.setLineType(width, color)
      c.line(cx + ls(innerlength), cy + lc(innerlength), cx + ls(length), cy + lc(length))
    }

    // Draw clock
    function drawClock() {
      c.clear()
      // Draw ticks
      for (let i = 0; i < 360; i += 30)
        if ((i % 90) == 0) tick("#1df52f", 5, i, 88, 70)
        else tick("#bdbdcb", 3, i, 88, 75)

      // draw hands
      let t = new Date();  // get time
      tick("#61afff", 5, t.getHours() * 30, 50)  // hour
      tick("#71afff", 2, t.getMinutes() * 6, 70)  // min
      tick("#ee791a", 2, t.getSeconds() * 6, 80)  // s

      // drwa center
      c.setFillStyle("#4d4b63")
      c.circle(cx, cy, 10, { fill: true })
    }
    drawClock()
    setInterval(drawClock, 1000)
