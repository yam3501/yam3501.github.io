const bootContainer = document.getElementById("boot-sequence");
const fastfetch = document.getElementById("fastfetch");
const prompt = document.getElementById("prompt");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(text, speed = 20) {
    for (let char of text) {
        bootContainer.innerHTML += char;
        await sleep(speed);
    }
    bootContainer.innerHTML += "<br>";
}

async function runBoot() {

    // Kernel lines
    await typeLine("Loading Linux linux ...", 10);
    await typeLine("Loading initial ramdisk ...", 10);
    await sleep(1000);

    bootContainer.innerHTML = "";

    await typeLine("/dev/nvme0n1p5: clean, 33856/19189848 files, 456682/8761344 blocks", 5);
    await sleep(1200);

    bootContainer.innerHTML = "";

    // Login
    await typeLine("Arch Linux 6.18.9-arch1-2 (tty1)", 15);
    await sleep(500);

    bootContainer.innerHTML += "login: ";
    await sleep(400);

    await typeLine("m4lwhere", 120);

    bootContainer.innerHTML += "Password: ";
    await sleep(500);

    for (let i = 0; i < 8; i++) {
        bootContainer.innerHTML += "*";
        await sleep(100);
    }

    bootContainer.innerHTML += "<br>";
    await sleep(700);

    await typeLine("Login successful.", 20);
    await sleep(1000);

    // Transition
    bootContainer.innerHTML = "";
    fastfetch.style.display = "block";
    prompt.style.display = "block";
}

document.addEventListener("DOMContentLoaded", runBoot);
