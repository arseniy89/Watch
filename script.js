onload = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    function drawWatchFace() {
        ctx.setTransform()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 10
        ctx.beginPath()
        ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 10, 0, Math.PI*2)
        ctx.fill()
        ctx.stroke()

        for (let i = 0; i < 60; i++) {
            const ang = (360/60) * i * (Math.PI/180)
            const sin = Math.sin(ang)
            const cos = Math.cos(ang)
            ctx.setTransform(cos, sin, -sin, cos, canvas.width/2, canvas.height/2)
            ctx.lineWidth = (i % 5 != 0) ? 2:10
            ctx.beginPath()
            ctx.moveTo(0, canvas.height/2 - 20)
            ctx.lineTo(0, canvas.height/2 - 10)
            ctx.stroke()
        }
    }

    function drawHand(hand, time, color, size, len) {
        let ang = time * Math.PI / 30
        if (hand == 'h') {ang = ang*5 + new Date().getMinutes() * Math.PI / 360}
        if (hand == 'm') {ang += new Date().getSeconds() * Math.PI / 1800}
        const sin = Math.sin(ang)
        const cos = Math.cos(ang)
        ctx.setTransform(cos, sin, -sin, cos, canvas.width/2, canvas.height/2)
        ctx.lineCap = 'round'
        ctx.strokeStyle = color
        ctx.lineWidth = size
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 50 - len)
        ctx.stroke()
    }

    const Watch = t => {
        if (t > 2160000) {t -= 2160000}

        drawWatchFace()

        drawHand('h', new Date().getHours(), 'black', 15, canvas.width/2 - 45)

        drawHand('m', new Date().getMinutes(), 'black', 12, canvas.width/2 - 20)

        drawHand('s', new Date().getSeconds(), 'red', 10, canvas.width/2 - 10)

        requestAnimationFrame(Watch)
    }
    requestAnimationFrame(Watch)
}

