const STICKER_COUNT = 85;
const STICKER_SIZE = 80; // px

const stickers = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for(let i=0; i<STICKER_COUNT; i++) {
  const el = document.getElementById('sticker'+i);
  stickers.push({
    el,
    x: rand(0, window.innerWidth - STICKER_SIZE),
    y: rand(0, window.innerHeight - STICKER_SIZE),
    angle: rand(0, 360),
    speedX: rand(-2, 2) || 1,    // Avoid 0 speed
    speedY: rand(-2, 2) || -1,
    rotationSpeed: rand(0.8, 3.6) * (Math.random() > 0.5 ? 1 : -1)
  });
}

window.addEventListener('resize', () => {
  for (const sticker of stickers) {
    sticker.x = Math.min(sticker.x, window.innerWidth - STICKER_SIZE);
    sticker.y = Math.min(sticker.y, window.innerHeight - STICKER_SIZE);
  }
});

function animate() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (const sticker of stickers) {
    sticker.x += sticker.speedX;
    sticker.y += sticker.speedY;
    sticker.angle += sticker.rotationSpeed;

    // Bounce horizontally
    if (sticker.x < 0) { sticker.x = 0; sticker.speedX *= -1; }
    if (sticker.x > w - STICKER_SIZE) { sticker.x = w - STICKER_SIZE; sticker.speedX *= -1; }

    // Bounce vertically
    if (sticker.y < 0) { sticker.y = 0; sticker.speedY *= -1; }
    if (sticker.y > h - STICKER_SIZE) { sticker.y = h - STICKER_SIZE; sticker.speedY *= -1; }

    sticker.el.style.transform =
      `translate(${sticker.x}px,${sticker.y}px) rotate(${sticker.angle}deg)`;
  }
  requestAnimationFrame(animate);
}
animate();