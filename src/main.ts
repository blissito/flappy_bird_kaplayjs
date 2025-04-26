// import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
// import "./style.css"; si quisieras trabajar con CSS
import kaplay, { AudioPlay, GameObj } from "kaplay";

const MOVEMENT = 12;
let currentScene: string = "";
let score: GameObj;
let flappy: GameObj;
let lives = 3;
let pipes: GameObj[] = [];
let playback: AudioPlay;
// inicializando el canvas
const k = kaplay({
  global: false,
  width: innerWidth,
  height: innerHeight < 320 ? innerHeight : 320,
});

// Leting Vite to handle assets for GithubPages
import bgUrl from "../assets/bg.png";
import birdUrl from "../assets/bird.png";
import floorUrl from "../assets/floor.png";
import topPipeUrl from "../assets/pipe2.png";
import bottomPipeUrl from "../assets/pipe.png";
import charUrl from "../assets/characters.png";
import heartUrl from "../assets/heart.png";
import jumpUrl from "../assets/jump.mp3";
import punchUrl from "../assets/punch.mp3";
import gameOverUrl from "../assets/game_over.mp3";
import loopUrl from "../assets/loop.mp3";
import actionUrl from "../assets/action.mp3";

const onClick = () => {};

// carga de sprites
k.loadSprite("bg", bgUrl);
k.loadSprite("bird", birdUrl, {
  sliceX: 3,
  sliceY: 1,
  anims: {
    fly: { from: 0, to: 2, loop: true, speed: 6, pingpong: true },
  },
});
k.loadSprite("floor", floorUrl);
k.loadSprite("top-pipe", topPipeUrl);
k.loadSprite("bottom-pipe", bottomPipeUrl);
// yutu
k.loadSprite("char", charUrl, {
  sliceX: 23,
  sliceY: 4,
  anims: {
    walk: { from: 0, to: 22, loop: true, speed: 6, pingpong: false },
    green: { from: 46, to: 68, loop: true, speed: 6 },
  },
});
// ui
k.loadSprite("heart", heartUrl, {
  sliceX: 3,
  sliceY: 1,
  anims: {
    one: { from: 0, to: 0 },
  },
});
// sounds
k.loadSound("jump", jumpUrl);
k.loadSound("punch", punchUrl);
k.loadSound("game_over", gameOverUrl);
k.loadSound("loop", loopUrl);
k.loadSound("action", actionUrl);

// utils
const drawScore = (
  x: number = k.width() / 1.5,
  y: number = 24,
  lastScore: number = 0
) => {
  score = k.add([
    // k.stay(),
    k.text(`Tubos: ${lastScore}`, {
      size: 40,
    }),
    k.color(k.Color.BLACK),
    k.pos(x, y),
    { value: 0 },
  ]);
};

const drawInstructions = () => {
  k.add([
    k.text("Press the 'space-bar' to restart", { size: 24 }),
    k.pos(k.width() / 5, k.height() / 1.4),
    k.color(k.Color.BLACK),
  ]);

  k.onKeyPress("space", () => k.go("game"));
};

// Draw Score and Lives
let hearts: GameObj[] = [];

const drawUi = () => {
  // primero, eliminamos los dibujos anteriores
  hearts.map((h) => h.destroy());
  // después, añadimos los objetos
  // las vidas, tres corazones

  k.onDraw(() => {
    Array.from({ length: lives }).map((_, index) => {
      const h = k.add([
        k.sprite("heart", { anim: "one" }),
        k.pos(k.vec2(44 * (index + 1), 24)),
        k.scale(0.6),
      ]);
      hearts.push(h);
    });
  });

  // ahora los puntos ganados
  drawScore();
};
// Generación de tuberías: 🧪
const spawnPipes = () => {
  // la altura se obtiene aleatoriamente
  const y = k.rand(-120, 0);
  // mientras que la segunda altura depende de la primera
  const y2 = 260 + y;
  // agregamos el tubo de arriba usando y
  const tp = k.add([
    "pipe",
    // k.stay(), // permanece aún con el cambio de escena
    k.sprite("top-pipe", { width: 58 }),
    k.pos(k.width(), y), // la colocamos al final
    k.move(k.LEFT, MOVEMENT * 10), // la movemos
    k.area(), // pa que colisione
    k.offscreen({ destroy: true }), // limpiamos si sale de pantalla (cleanUp) 😌
  ]);

  // Añadimos la tubería de abajo usando y2
  const bp = k.add([
    "pipe",
    // k.stay(), // permanece aún con el cambio de escena
    k.sprite("bottom-pipe", { width: 58 }),
    k.pos(k.width(), y2),
    k.move(k.LEFT, MOVEMENT * 10),
    k.area(),
    k.offscreen({ destroy: true }),
    // @todo nos repetimos, esto podría ser un componente
  ]);
  // store'em
  pipes.push(tp);
  pipes.push(bp);

  // ponemos una plataforma como piso
  const floor = k.add([
    "floor",
    k.sprite("floor", { width: k.width(), height: 68 }),
    k.pos(0, k.height() - 34), // corregimos
    k.area(), // pa que choque el pajarito
    k.body({ isStatic: true }), // le quitamos la gravedad
    // move(k.LEFT, MOVEMENT + 50), // @todo animamos?
  ]);

  k.wait(k.rand(1.5, 3), () => {
    k.destroy(floor); // it solves an async bug
    spawnPipes(); // recursividad
  });
};

//Quitar corazones
const removeHearts = () => {
  hearts.map((h) => h.destroy());
};

// evaluar si el juego acabó
const handleIsGameOverOrReduceHearts = () => {
  lives -= 1;
  removeHearts();
  if (lives < 0) {
    // console.log("Score? ", score.value);
    k.go("game_over", { lastScore: score.value });
  }
};

const drawFloor = () => {
  // piso
  k.add([
    "floor",
    // k.stay(), // stay in game over
    k.sprite("floor", { width: k.width(), height: 68 }),
    k.pos(0, k.height() - 34),
    k.area(),
    k.body({ isStatic: true }),
    // move(k.LEFT, MOVEMENT + 50), @todo animar?
  ]);
};

// escena inicial
k.scene("idle", () => {
  // music
  playback = k.play("loop", { volume: 0.2 });
  // initializers
  bgEffect();
  drawUi(); // después del bg pa que no lo tape

  // agregamos el personaje principal
  k.add([
    "bird",
    k.scale(3),
    k.sprite("char", {
      anim: "green",
    }),
    k.pos(140, k.height() / 1.7),
  ]);

  // acción del usuario
  k.onKeyDown("space", () => {
    if (currentScene !== "game") {
      // avoiding unnecesary calls
      k.go("game");
      currentScene = "game";
    }
  });
  // mobile
  k.onClick(() => {
    k.go("game");
    currentScene = "game";
  });
});

// GameOver scene
k.scene("game_over", ({ lastScore = 0 }: { lastScore: number }) => {
  // stop music
  playback && playback.stop();
  // gamObjs
  bgEffect();
  k.add([
    k.text("GAME OVER", {
      size: 80,
      font: "san-serif",
    }),
    k.color(k.Color.BLACK), // cambiamos el color
    k.pos(k.width() / 2 - 240, k.height() / 6),
  ]);
  drawScore(k.width() / 2 - 100, k.height() / 2, lastScore);
  drawInstructions();
  drawFloor();
  // reset
  lives = 4;
  // sound
  k.play("game_over");
});

// Efecto de background
let bgPosX = 0; // used as memory
// incuye el piso
const bgEffect = () => {
  k.onUpdate("bg", (bg) => {
    // aquí reseteamos
    if (bg.pos.x < -k.width()) {
      bg.pos.x = 0;
      bg2.pos.x = k.width();
    }
    // actualizamos x
    bgPosX = bg.pos.x;
  });
  // añadimos el primer bg al juego
  k.add([
    "bg",
    // k.stay(), // stay for game over
    k.sprite("bg", { width: k.width(), height: k.height() }),
    k.pos(bgPosX, -32),
    k.move(k.LEFT, MOVEMENT),
  ]);
  // agregamos el segundo bg al juego
  const bg2 = k.add([
    "bg2",
    // k.stay(), // stay for game over
    k.sprite("bg", { width: k.width(), height: k.height() }),
    k.pos(k.width() + bgPosX, -32),
    k.move(k.LEFT, MOVEMENT),
  ]);
  drawFloor();
};

// escena para jugar
k.scene("game", () => {
  // change music
  playback && playback.stop();
  playback = k.play("action", { volume: 0.3 });
  // initials
  bgEffect();

  k.setGravity(1000);
  // GameObjects
  // pajaro
  flappy && flappy.destroy();
  flappy = k.add([
    "bird",
    k.stay(), // se queda para el GameOver
    k.scale(0.2),
    k.sprite("bird", {
      anim: "fly",
    }),
    k.pos(140, k.height() / 2),
    k.area(),
    k.body(),
    k.rotate(0),
    k.anchor("center"),
  ]);
  // tubos
  spawnPipes();
  // UI
  drawUi();

  // listeners
  flappy.onUpdate(() => {
    if (flappy.angle < 90) {
      flappy.angle += 120 * k.dt(); // ?? @todo move to a function
    }
    // check if pass pair of pipes
    const limit = flappy.pos.x;
    pipes = pipes.filter((pipe) => {
      if (pipe.pos.x < limit) {
        score.value += 0.5;
        score.text = "Tubos: " + score.value;
        return false;
      }
      return true;
    });
  });

  // Colisiones
  flappy.onCollide("pipe", () => {
    k.addKaboom(flappy.pos, { scale: 0.5, speed: 1.5 });
    k.shake(4);
    // restar vidas
    handleIsGameOverOrReduceHearts();
    // sound
    k.play("punch");
  });

  // acción del usuario
  k.onKeyDown("space", () => {
    flappy.jump(220);
    flappy.angle = -45;
    // sound
    k.play("jump", { volume: 0.1 });
  });
  k.onClick(() => {
    flappy.jump(220);
    flappy.angle = -45;
    k.play("jump", { volume: 0.1 });
  });

  //
});

// iniciamos con la escena de espera
k.go("idle");
