const MOVEMENT = 12;
let bgPos;
// import "./style.css";
import kaplay from "kaplay";

// inicializando el canvas
kaplay({
  width: innerWidth,
  height: innerHeight < 320 ? innerHeight : 320,
});

// sprite loaders
loadSprite("bg", "/assets/bg.png");
loadSprite("bird", "/assets/bird.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    fly: { from: 0, to: 2, loop: true, speed: 6, pingpong: true },
  },
});
loadSprite("floor", "/assets/floor.png");
loadSprite("top-pipe", "/assets/pipe2.png");
loadSprite("bottom-pipe", "/assets/pipe.png");

const spawnPipes = () => {
  // const y = rand(-height() + 40, 0);
  const y = rand(-120, 0);
  const y2 = 260 + y;
  // const h1 = rand(-30, total);
  // const h2 = total - maxH - 60;
  add([
    "pipe",
    sprite("top-pipe", { width: 58 }),
    // scale(0.24),
    pos(width(), y),
    move(LEFT, MOVEMENT * 10),
    area(),
    offscreen({ destroy: true }),
    // body(),
  ]);

  add([
    "pipe",
    sprite("bottom-pipe", { width: 58 }),
    pos(width(), y2),
    move(LEFT, MOVEMENT * 10),
    area(),
    offscreen({ destroy: true }),
    // body(),
  ]);

  const floor = add([
    "floor",
    sprite("floor", { width: width(), height: 68 }),
    pos(0, height() - 34),
    area(),
    body({ isStatic: true }),
    // move(LEFT, MOVEMENT + 50),
  ]);

  wait(rand(1.5, 3), () => {
    destroy(floor);
    spawnPipes();
    // readd(floor);
  });
};

// escena inicial
scene("idle", () => {
  bgEffect();
  add([
    "bird",
    scale(0.2),
    sprite("bird", {
      anim: "fly",
    }),
    pos(140, height() / 2),
  ]);

  // acción del usuario
  onKeyDown("space", () => {
    go("game");
  });

  // readd floor
  // piso
  add([
    "floor",
    sprite("floor", { width: width(), height: 68 }),
    pos(0, height() - 34),
    area(),
    body({ isStatic: true }),
    // move(LEFT, MOVEMENT + 50),
  ]);

  //
});

const bgEffect = (posX) => {
  onUpdate("bg", (bg) => {
    if (bg.pos.x < -innerWidth) {
      console.log("reseting bg");
      bg.pos.x = 0;
      bg2.pos.x = innerWidth;
    }
    bgPos = bg.pos.x;
  });
  // dibujando el bg
  add([
    "bg",
    sprite("bg", { width: innerWidth, height: height() }),
    pos(bgPos || 0, -32),
    move(LEFT, MOVEMENT),
  ]);

  const bg2 = add([
    "bg2",
    sprite("bg", { width: innerWidth, height: height() }),
    pos(innerWidth + (bgPos || 0), -32),
    move(LEFT, MOVEMENT),
  ]);
};

// escena para jugar
scene("game", () => {
  setGravity(1000);

  bgEffect(bgPos);

  // GameObjects
  const flappy = add([
    "bird",
    scale(0.2),
    sprite("bird", {
      anim: "fly",
    }),
    pos(140, height() / 2),
    area(),
    body(),
    rotate(0),
    anchor("center"),
  ]);

  // listeners
  flappy.onUpdate(() => {
    if (flappy.angle < 90) {
      flappy.angle += 120 * dt();
    }
  });

  flappy.onCollide("pipe", () => {
    addKaboom(flappy.pos, { scale: 0.5, speed: 1.5 });
    shake(4);
  });

  // acción del usuario
  onKeyDown("space", () => {
    flappy.jump(220);
    flappy.angle = -45;
  });

  spawnPipes();
  //
});

// escena para perder

// init
go("idle");
