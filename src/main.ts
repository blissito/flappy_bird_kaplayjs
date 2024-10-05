const MOVEMENT = 12;
// import "./style.css";
import kaplay from "kaplay";

// inicializando el canvas
kaplay({
  width: innerWidth,
  height: innerHeight,
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

// dibujando el bg
add([
  "bg",
  sprite("bg", { width: innerWidth, height: innerHeight }),
  pos(0, 0),
  move(LEFT, MOVEMENT),
]);

const bg2 = add([
  "bg2",
  sprite("bg", { width: innerWidth, height: innerHeight }),
  pos(innerWidth, 0),
  move(LEFT, MOVEMENT),
]);

onUpdate("bg1", (bg) => {
  if (bg.pos.x < -innerWidth) {
    console.log("out");
    bg.pos.x = 0;
    bg2.pos.x = innerWidth;
  }
});

// GameObjects
add([
  "bird",
  scale(0.2),
  sprite("bird", {
    anim: "fly",
  }),
  pos(80, innerHeight / 2),
]);
