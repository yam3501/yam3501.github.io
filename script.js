const terminal = document.getElementById("terminal");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, baseSpeed = 40) {
    for (let char of text) {
        terminal.innerHTML += char;
        let randomSpeed = baseSpeed + Math.random() * 20;
        await sleep(randomSpeed);
    }
}

async function typeLine(text, speed = 40) {
    await typeText(text, speed);
    terminal.innerHTML += "\n";
}

function addCursor() {
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    terminal.appendChild(cursor);
}

function removeCursor() {
    const cursor = document.querySelector(".cursor");
    if (cursor) cursor.remove();
}

async function bootSequence() {

    // Step 0 — Blinking cursor
    addCursor();
    await sleep(2000);
    removeCursor();
    terminal.innerHTML = "";

    // Step 1 — Kernel loading
    await typeLine("Loading Linux linux ...", 10);
    await typeLine("Loading initial ramdisk ...", 10);
    await sleep(1500);

    terminal.innerHTML = "";

    // Step 2 — Filesystem check
    await typeLine("/dev/nvme0n1p5: clean, 33856/19189848 files, 456682/8761344 blocks", 5);
    await sleep(2000);

    terminal.innerHTML = "";

    // Step 3 — Login screen
    await typeLine("Arch Linux 6.18.9-arch1-2 (tty1)", 20);
    await sleep(800);

    await typeText("cli login: ");
    await sleep(500);

    await typeLine("m4lwhere", 120);

    await sleep(500);

    await typeText("Password: ");
    await sleep(500);

    for (let i = 0; i < 8; i++) {
        terminal.innerHTML += "*";
        await sleep(120);
    }

    terminal.innerHTML += "\n";
    await sleep(800);

    terminal.innerHTML += "\n";

    // X.Org multi-line log block
    terminal.innerHTML += `
X.Org X Server 1.21.1.21
X Protocol Version 11, Revision 0
Current Operating System: Linux 6.18.9-arch1-2
Kernel command line: BOOT_IMAGE=/vmlinuz-linux root=UUID=37338970-fc66-4c77-9f85-f2e71bcd798 rw

Current version of pixman: 0.46.4
Before reporting problems, check http://wiki.x.org
to make sure that you have the latest version.

Markers: (--) probed, (**) from config file, (==) default setting,
(++) from command line, (!!) notice, (II) informational,
(WW) warning, (EE) error, (NI) not implemented, (??) unknown.

Log file: "/home/m4lwhere/.local/share/xorg/Xorg.0.log"
Using config directory: "/etc/X11/xorg.conf.d"
Using system config directory: "/usr/share/X11/xorg.conf.d"
`;
}

bootSequence();
