var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = canvas.height = 256;

function resize() {
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}
resize();
window.onresize = resize;

function noise(ctx) {

    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.getImageData(0, 0, w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length,
        i = 0,
        pr = 456 * Math.random(),
        prs = 716 * Math.random();

    for(; i < len;) {
        buffer32[i++] = ((pr % 255)|0) << 24;
        pr += prs * 1.2;
    }

    ctx.putImageData(idata, 0, 0);
}

var toggle = true;

// added toggle to get 30 FPS instead of 60 FPS
(function loop() {
    toggle = !toggle;
    if (toggle) {
        requestAnimationFrame(loop);
        return;
    }
    noise(ctx);
    requestAnimationFrame(loop);
})();
