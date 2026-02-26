const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");
const fontSize = 14;
let columns = 0;
let drops = [];
let interval;

function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops.push(-Math.random() * canvas.height);
    }
}

function randomChar() {
    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff00";
    ctx.font = `${fontSize}px matrix`;

    for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i];
        ctx.fillText(randomChar(), x, y);
        
        if (y > canvas.height && Math.random() > 0.92) {
            drops[i] = 0;
        } else {
            drops[i] += fontSize * 0.4;
        }
    }
}

document.fonts.ready.then(() => {
    resize();
    interval = setInterval(draw, 70);
});

window.addEventListener("resize", resize);
