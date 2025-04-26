## Flappy Bird Simple Kaplay Web Version Just For Fun

This is the repo for the flappy bird project of the Fixtergeek course.
Made by [@Héctorbliss](https://hectorbliss.com) at [Fixtergeek](https://www.fixtergeek.com)

### Juegalo [aquí](https://blissito.github.io/flappy_bird_kaplayjs/)

### Descarga el e-book [aquí](flappy.epub)

![blissito's flappy bird game](https://i.imgur.com/MT37bLN.png)

# Construye tu propio Flappy-Bird con KaPlay

Es importante decir que para aumentar las probabilidades de que este tutorial sea completado con moderado éxito, se espera que el lector posea conocimientos básicos de la sintaxis de **ECMAScript6 (ES2015/ES6)** al que nos referiremos solo como **JS**. Y haber practicado un poquito con el lenguaje también nos vendría bien para disfrutar un poco más este tutorial. Te dejo un link donde podrías comenzar, más despacio y en un nivel más básico. Luego vuelves a este, no te preocupes, no se va a ir a ninguna parte. 🏃🏻💨

Vamos a iniciar el proyecto con Vite, que es una manera moderna y de alta calidad de comenzar un proyecto JS hoy en día. De esta forma podremos crear una versión final _publicable,_ bien optimizada para producción y sin invertir mucho tiempo en ello. 🤩 Así que abre tu terminal favorita. La mía es [iTerm2](https://iterm2.com/) con [zsh](https://es.wikipedia.org/wiki/Zsh) y el _very_ _tiny_ _robbyrussell_. 🤴🏻

## 1. Iniciando el proyecto con Vite

Para eso necesitas tener instalado Node.js en tu equipo. Una vez que tengas una versión superior a la `20.8.0`, correremos el siguiente comando:

```jsx
npm create vite flappy
```

Seleccionaremos _Vanilla_ y luego TypeScript. No temas, TS nos será muy útil y si fuere necesario aprender un poco sobre tipos, lo haremos sin miedo. 😎

Ahora que el proyecto se ha creado, entraremos a él y abriremos nuestro editor de código para comenzar a trabajar. Ora sí, ya viene lo bueno. 👨🏻‍💻

```jsx
cd flappy
code .
```

Para que este comando funcione, necesitas tener instalado VSCode. Tú siempre puedes usar el editor de código de tu preferencia. ✅

Modificamos el archivo `main.ts` donde colocaremos la mayoría de nuestro código.

> 👀 Gracias a Vite, podremos escribir JS moderno y utilizar `import` para trabajar con módulos. 🥳

## 2. Agregando el módulo KaPlay

Para que la construcción de nuestro juego sea mucho más sencilla lo basaremos en componentes; usaremos el módulo KaPlay (antes conocido como Kaboom.js).

![Captura de pantalla 2024-11-03 a la(s) 9.49.15 a.m..png](<https://prod-files-secure.s3.us-west-2.amazonaws.com/1b74ff86-1c1c-4120-8a1f-f09957148199/877a856a-36cb-4c05-87a1-b2c4476efb79/Captura_de_pantalla_2024-11-03_a_la(s)_9.49.15_a.m..png>)

```jsx
npm i kaplay
```

Puedes abrir la terminal de VSCode con `cntrl + ^`.

Ahora vamos a iniciar el `canvas` de nuestro juego. Nuestro archivo `main.ts` debería verse así, por el momento:

```jsx
import "./style.css";
import kaplay from "kaplay";

// inicializando el canvas y el objeto k
// de donde sacaremos todos los bloques
// y componentes. 🎩
const k = kaplay({
  width: innerWidth, // dimensiones del viewport
  height: innerHeight,
});
```

A mi me gusta usar el puerto 3000 por eso prefiero agregar mi archivo `vite.config.js` para que use este puerto.

```jsx
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
});
```

Y probaremos que todo funciona levantando el servidor de desarrollo que Vite nos incluye.

```jsx
npm run dev
```

¡Perfecto! 🥂

Deberías ver la cuadrícula del _canvas_ y ninguna excepción en la consola. ✅

## 3. Assets

Vamos a agregar una carpeta para todos nuestros `assets`, el pajarito, el fondo y las tuberías.

> 👀 Todos los _assets_ están en este [link](https://github.com/HectorBlisS/flappyBird2/tree/master/assets). Descárgalos y colócalos en tu proyecto.

Ya existe una carpeta `public`, vamos a cambiarle el nombre por `assets` y utilizarla para almacenar todas las imágenes.

Bueno, ahora entonces, vamos a colocar nuestro fondo.

```jsx
// sprite loaders
k.loadSprite("bg", "/assets/bg.png");
```

El método `loadSprite`, carga un _sprite_ en el asset _manager,_ con nombre y _url_ del recurso, además de poder incluir configuraciones extra.

Primero hemos cargado el _asset_ (la imagen de fondo png) con `loadSprite`, y ahora lo colocamos.

```jsx
// añadiendo el bg
k.add([
  k.sprite("bg", {
    width: innerWidth,
    height: innerHeight,
  }),
]);
```

¡Genial! Tenemos un fondo. Pues hemos cubierto todo el _viewport_ con este _sprite_ al que llamamos `‘bg’`. ✅

## 4. Animando el fondo

Vamos a mover el fondo para crear el efecto de que avanzamos infinitamente, sin llegar a ningún lado, como en tu empleo. 🏃🏻💼

```jsx
const MOVEMENT = 12;

const bgEffect = () => {
  k.onUpdate("bg", (bg) => {
    if (bg.pos.x < -innerWidth) {
      console.log("reseting bg");
      bg.pos.x = 0;
      bg2.pos.x = innerWidth;
    }
    bgPosX = bg.pos.x;
  });
  // dibujando el bg
  k.add([
    "bg",
    k.sprite("bg", { width: innerWidth, height: k.height() }),
    k.pos(bgPosX, -32),
    k.move(k.LEFT, MOVEMENT),
  ]);

  const bg2 = k.add([
    "bg2",
    k.sprite("bg", { width: innerWidth, height: k.height() }),
    k.pos(innerWidth + bgPosX, -32),
    k.move(k.LEFT, MOVEMENT),
  ]);
};
```

El truco aquí es agregar dos veces el fondo, uno después del otro y moverlos juntos, para cuando el primero salga de la pantalla por completo, resetear las posiciones y conseguir el efecto de infinito. Genial ¿no? 😎

> 😉 Tomate el tiempo de leer con calma el código y entender el algoritmo, una vez que creas entenderlo, ve y escríbelo tú mismo con tu propia lógica, reinvéntalo. Así lo entenderás por completo. 💪🏼

### Nota sobre el método `onUpdate`, para entenderlo mejor

El método `onUpdate`, registra un evento que corre cada _frame_ (~60 veces por segundo). Se puede seleccionar objetos por su `tag`.

Por eso, nosotros usamos: `k.onUpdate("bg", (bg) =>{})` Así no solo nos montamos en el ciclo del juego, también solicitamos el objeto que queremos modificar. ¡Un método super útil! 🤖

## 5. Agregando a Flappy

De forma similar a como hemos agregado los fondos, vamos a añadir el _sprite_ del pajarito. 🪶 Para eso vamos a crear nuestro primer `GameObject`, pues necesitaremos transformarlo y moverlo conforme jugamos, así que, guardarlo en una variable, viene bien. 👍🏻

```jsx
// cargamos el sprite y definimos animaciones
k.loadSprite("bird", "/assets/bird.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    fly: { from: 0, to: 2, loop: true, speed: 6, pingpong: true },
  },
});
```

Es importante observar que este _asset_ contiene 3 pajaritos, porque representa una animación que hemos llamado _fly_. Por eso se debe especificar los _slices_ de “X” y “Y”. Esta es una manera muy sencilla de usar _sprites_ profesionales que ya incluyen las animaciones. 🤛🏼

```jsx
// GameObjects
k.add([
  "bird",
  k.scale(0.2),
  k.sprite("bird", {
    anim: "fly",
  }),
  k.pos(120, k.height() / 2),
]);
```

Así, cuando agregamos el pajarito a nuestro _canvas_, este debe especificar su animación. 👍🏼

Bueno, pues, con nuestro pajarito en mano, es hora de ponerlo a bailar… 💃🏻🪿

## 6. Detectando la tecla espacio

Ahora que nuestro _flappy_ está volando, es hora de controlarlo.

```jsx
// agregamos gravedad
setGravity(1000); // juega con este valor, experimenta.

// agregamos area y body (física) al flappy
const flappy = k.add([
  "bird",
  k.scale(0.2),
  k.sprite("bird", {
    anim: "fly",
  }),
  k.pos(120, k.height() / 2),
  k.area(),
  k.body(),
]);

// y agregamos el listener para la tecla
k.onKeyDown("space", () => {
  flappy.jump(240);
});
```

Esta es la manera de agregar un **GameObject** a la escena donde es llamado el método `add()`. Ensamblar tú mismo tus **GameObjects** desde una lista de componentes y agregarlos al juego es super intuitivo con el método `add()`. 🤩

Además, gracias al componente `body()` que hemos agregado a flappy, ahora podemos brincar con `flappy.jump()`.

Para terminar con el brinco de flappy (nuestro personaje), hagamos que mire hacia el cielo cuando se presiona la tecla espacio, y que gire para mirar hacia el piso cuando la gravedad lo empuje hacia abajo. 👆🏻 👉🏻 👇🏻

```jsx
//  primero agregamos el componente para rotar
const flappy = add([
  "bird",
  scale(0.2),
  sprite("bird", {
    anim: "fly",
  }),
  pos(120, innerHeight / 2),
  area(),
  body(),
  rotate(0),
  anchor("center"),
]);

// Agregamos un listener para corregir el giro
flappy.onUpdate(() => {
  if (flappy.angle < 90) {
    flappy.angle += 120 * dt(); // suavizamos
  }
});

// y cambiamos el angulo al presionar espacio
onKeyDown("space", () => {
  flappy.jump(240);
  flappy.angle = -45;
});
```

Observa que, de paso, hemos agregado el punto de giro en el centro (`anchor('center')`). Por eso pudimos jugar con los grados. 🐦‍⬛

## 7. Añadiendo el piso

Queremos que flappy no se hunda. Pero se nos va a lo profundo, de donde luego ya no quiere salir. Nosotros queremos que choque con el piso. Así que vamos a arreglarlo añadiendo un lindo piso. 🛣️

```jsx
// primero cargamos el sprite
loadSprite("floor", "/assets/floor.png");

// luego, añadimos el piso
k.add([
  "floor",
  k.sprite("floor", { width: k.width(), height: 68 }),
  k.pos(0, k.height() - 34), // solo usamos la mitad
  k.area(),
  k.body({ isStatic: true }), // con esto evitamos que caiga
]);
```

Observa que también le damos `area()` y `body()` para que _flappy_ pueda chocar con él. Además, indicamos que es estático, así la gravedad no le afectará y funcionará perfectamente como una plataforma. 👡

> 👀 Aquí podrías añadir dos pisos, como hicimos con el fondo y crear el mismo truco de movimiento, incluso más rápido, para crear un efecto de _parallax_ con el fondo. ¿Podrías? `*move(LEFT, MOVEMENT + 50)*`

## 8. Añadiendo escenas

Antes de ir a las tuberías, vamos a hacer que flappy solo sea afectado por la gravedad cuando se presiona la tecla espacio por primera vez. Así tendremos una escena como pantalla de inicio, donde podremos poner información sobre los juegos pasados. 🤯

Para lograrlo, crearemos dos escena y meteremos ahí lo que ya tenemos. Primero escribimos la escena inicial:

```jsx
// escena inicial
k.scene("idle", () => {
  bgEffect();
  k.add([
    "bird",
    k.scale(3),
    k.sprite("char", {
      anim: "green",
    }),
    k.pos(140, k.height() / 2),
  ]);

  // acción del usuario
  k.onKeyDown("space", () => {
    if (currentScene !== "game") {
      // avoiding unnecesary calls
      k.go("game");
      currentScene = "game";
    }
  });

  // readd floor
  // piso
  k.add([
    "floor",
    k.sprite("floor", { width: k.width(), height: 68 }),
    k.pos(0, k.height() - 34),
    k.area(),
    k.body({ isStatic: true }),
    // move(k.LEFT, MOVEMENT + 50),
  ]);

  //
});
```

Luego, esta otra, es la escena principal; la `escene` para jugar. 🎮

```jsx
// escena para jugar
k.scene("game", () => {
  k.setGravity(1000);
  bgEffect();
  // GameObjects
  const flappy = k.add([
    "bird",
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
  // listeners
  flappy.onUpdate(() => {
    if (flappy.angle < 90) {
      flappy.angle += 120 * k.dt(); // ?? @todo move to a function
    }
  });

  // Colisiones
  flappy.onCollide("pipe", () => {
    k.addKaboom(flappy.pos, { scale: 0.5, speed: 1.5 });
    k.shake(4);
  });

  // acción del usuario
  k.onKeyDown("space", () => {
    flappy.jump(220);
    flappy.angle = -45;
  });

  spawnPipes();
  //
});
```

También colocaremos el efecto del fondo en una función para poder reciclarlo. Esta función no solo agregará los GameObjects del fondo, también el listener para moverlo.

```tsx
// Efecto de background
let bgPosX = 0; // se usa como memoria
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
    k.sprite("bg", { width: k.width(), height: k.height() }),
    k.pos(bgPosX, -32),
    k.move(k.LEFT, MOVEMENT),
  ]);
  // agregamos el segundo bg al juego
  const bg2 = k.add([
    "bg2",
    k.sprite("bg", { width: k.width(), height: k.height() }),
    k.pos(k.width() + bgPosX, -32),
    k.move(k.LEFT, MOVEMENT),
  ]);
};
```

Bueno, así también queda claro lo que llevamos y está todo más ordenado.

¡Muy bien, podemos avanzar con confianza! 😇

## 9. Agregando las tuberías automáticamente

Vamos a agregar una función que nos servirá para crear las tuberías automáticamente, con el tiempo. ⏱️

```jsx
// primero cargamos las imagenes
loadSprite("top-pipe", "/assets/pipe2.png");
loadSprite("bottom-pipe", "/assets/pipe.png");

// Generación de tuberías: 🧪
const spawnPipes = () => {
  // la altura se obtiene aleatoriamente
  const y = k.rand(-120, 0);
  // mientras que la segunda altura depende de la primera
  const y2 = 260 + y;
  // agregamos el tubo de arriba usando y
  k.add([
    "pipe",
    k.sprite("top-pipe", { width: 58 }),
    k.pos(k.width(), y), // la colocamos al final
    k.move(k.LEFT, MOVEMENT * 10), // la movemos
    k.area(), // pa que colisione
    k.offscreen({ destroy: true }), // limpiamos si sale de pantalla (cleanUp) 😌
  ]);

  // Añadimos la tubería de abajo usando y2
  k.add([
    "pipe",
    k.sprite("bottom-pipe", { width: 58 }),
    k.pos(k.width(), y2),
    k.move(k.LEFT, MOVEMENT * 10),
    k.area(),
    k.offscreen({ destroy: true }),
    // @todo nos repetimos, esto podría ser un componente
  ]);

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
```

Observa que destruimos el piso dentro de `wait()`, pues queremos que tape la tubería de abajo y requerimos colocarlo después de que creamos más. 🤓 Osea queremos primero poner las tuberías y luego encima el piso, pues. 🪄 🎴

## 10. Vamos con lo más complejo ahora sí, añadiendo las colisiones

Nuestro juego será igual de difícil que el original pero le daremos algunas oportunidades o “vidas” a nuestros jugadores, por eso, por ahora vamos a agregar un “kaboom!” cuando el pajarillo colisione con cualquiera de los tubos. 🧪

Usaremos para esto, el maravilloso método de Kaplay llamado: `onCollide`.

```jsx
// esto va dentro de la escena "game"

flappy.onCollide("pipe", () => {
  // añadimos el respectivo homenaje a esta increíble herramienta
  k.addKaboom(flappy.pos, { scale: 0.5, speed: 1.5 });
  k.shake(4);
});
```

Esto funciona porque las tuberías comparten la etiqueta “pipe” así podemos detectar si _flappy_ colisiona con cualquiera de ellas. ¡Super, apoco no! 🥳

¡No resulto nada complejo después de todo! 😱

## 11. Mostrando vidas y puntos

Antes de ir a crear la escena para nuestro épico **GameOver**, 😁 necesitamos algunas variables para contabilizar los puntos y las vidas.

Vamos a mostrar texto en pantalla empleando un componente muy útil que **KaPlay** nos pone a la mano: `text()`.

```jsx
// Draw Score and Lives
let hearts: GameObj[] = [];
const drawUi = () => {
  // primero, eliminamos los dibujos anteriores
  hearts.map((h) => h.destroy());
  // después, añadimos los objetos,
  // las vidas: tres corazones.

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
  k.add([
    k.text(`Puntos: ${score}`, {
      size: 40,
    }),
    k.pos(k.width() / 1.5, 24),
  ]);
};
```

Pondremos la llamada de nuestra función hasta abajo en la escena, después de dibujar todo el GamePlay. 🎃

```jsx
  ... /
	  spawnPipes();
	  drawUi();
  });
```

Observa que controlaremos lo que se muestra quitando elementos del array `lives` y sumando puntos en la variable `score`. Fácil ¿no? 🤓

Por ahora, echaremos a andar la perdida de vidas. Restaremos un elemento al array `lives` cuando flappy choque.

```jsx
//Quitar corazones
const removeHearts = () => {
  hearts.map((h) => h.destroy());
};

// Colisiones
flappy.onCollide("pipe", () => {
  k.addKaboom(flappy.pos, { scale: 0.5, speed: 1.5 });
  k.shake(4);
  // restar vida:
  lives -= 1;
  removeHearts(); // forzar update
});
```

Bueno, pues creo que ahora necesitamos la escena final, nuestro gameOver, para mostrar un botón de reinicio y los puntos acumulados (todavía nos falta trabajar con la acumulación de puntos).

## 12. Game Over

Necesitamos construir una escena para terminar el juego.

```jsx
// GameOver scene
k.scene("game_over", (pipes) => {
  bgEffect();
  drawFloor();
  // text
  k.add([
    k.text("GAME OVER", {
      size: 80,
      font: "san-serif",
    }),
    k.color(k.Color.BLACK), // cambiamos el color
    k.pos(k.width() / 2 - 240, k.height() / 6),
  ]);
  // points
  drawScore(k.width() / 2 - 100, k.height() / 2);
  // restart
  drawInstructions();
});
```

Hemos creado también dos funciones auxiliares para añadir el _score_ en el centro y las instrucciones para reiniciar.

```jsx
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
  const button = k.add([
    k.text("Press the 'space-bar' to restart", { size: 24 }),
    k.pos(k.width() / 5, k.height() / 1.4),
    k.color(k.Color.BLACK),
  ]);

  // listener para ir de vuelta a la acción
  button.onKeyDown("space", () => {
    k.go("game");
  });
};
```

Finalmente debemos llamar a la _escene_ `game_over` cuando los corazones se acaben.

```jsx
// evaluar si el juego acabó
const handleIsGameOverOrReduceHearts = () => {
  lives -= 1;
  removeHearts();
  if (lives < 0) {
    // pasamos el último score
    k.go("game_over", { lastScore: score.value });
  }
};
```

## 13. Sumando puntos al pasar los tubos

Para sumar puntos vamos a controlar un array de _pipes_ que vamos colectando conforme las creamos.

```jsx
// ...
const tp = k.add...
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

  // ..
```

Ahora vamos a comprobar si el tubo ya pasó la x de flappy y sumar puntos, para luego deshacernos de los tubos ya contabilizados.

```jsx
// esto dentro de la escena 'game'

flappy.onUpdate(() => {
  if (flappy.angle < 90) {
    flappy.angle += 120 * k.dt(); // ?? @todo move to a function
  }
  // checamos si sumamos puntos
  const limit = flappy.pos.x;
  pipes = pipes.filter((pipe) => {
    if (pipe.pos.x < limit) {
      score.value += 50;
      score.text = "Tubos: " + score.value;
      return false; // quitamos del array
    }
    return true;
  });
});
```

¡Muy bien! En este punto, podemos decir que el juego está prácticamente completo, lo único que nos faltaría sería añadirle sonidos para que cobre toda su vida. 🕹️ 😍

## 14. Añadiendo los sonidos

Ya casi terminamos ¡ya solo nos falta lo más divertido! Añadirle soniditos a nuestro juego. 🔊 Vamos a cargar cinco _assets_ de audio que reproduciremos en varias de nuestras funciones.

```jsx
// sounds
k.loadSound("jump", "/assets/jump.mp3");
k.loadSound("punch", "/assets/punch.mp3");
k.loadSound("game_over", "/assets/game_over.mp3");
k.loadSound("loop", "/assets/loop.mp3");
k.loadSound("action", "/assets/action.mp3");
```

A `jump` lo haremos sonar cuando presionen la tecla espacio, `punch` al golpear tubos, `game_over` en el cambio de escena, `loop` como música de fondo de espera y `action` para la acción del juego. ✅

También crearemos una variable _playback_ para guardar el objeto `AudioPlay` que nos permite detener el sonido.

```jsx
let playback: AudioPlay;

// escena inicial
k.scene("idle", () => {
  // music
  playback = k.play("loop", { volume: 0.2 });

   // ...

// GameOver scene
k.scene("game_over", ({ lastScore = 0 }: { lastScore: number }) => {
  // stop music
  playback && playback.stop();

   // ....

// escena para jugar
k.scene("game", () => {
  // change music
  playback && playback.stop();
  playback = k.play("action", { volume: 0.3 });

  // ...
```

Veamos si eres capaz de añadir los sonidos donde hacen falta (al golpear tubos por ejemplo). Inténtalo, yo creo que ya estás listo(a). 🤓

## Publicación en Github Pages

Es momento de compartir tu creación con el mundo entero, y bueno, también con tus amigos y familiares. 👨‍👩‍👧‍👦

```yaml
# Sample workflow for building and deploying a Jekyll site to GitHub Pages
name: Deploy Jekyll with GitHub Pages dependencies preinstalled

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup up Node
        uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Dist forlder upload
          path: "./dist"
      - name: Deploy to Github Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Usaremos estos steps para ayudarnos a crear el build de estáticos y hacer deploy a Github pages. Este archivo vivirá dentro de tu proyecto en `/.github/workflows/jekyl-gh-pages.yml`.

> 👀 Toma nota de que nuestros assets deben importarse dentro de nuestros archivos `.ts` para que Vite se encargue de ellos.

```jsx
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
```

Finalmente, para que el deploy a Github pages funcione, debemos agregar el nombre del repositorio a la propiedad base de la configuración de Vite.

```jsx
import { defineConfig } from "vite";

export default defineConfig({
  base: "/flappy_bird_kaplayjs", // El nombre de tu repo
  server: {
    port: 3000,
  },
});
```

Eso es todo, `git push` y ya estamos. 🍩

¡Ahora puedes [jugar online](https://blissito.github.io/flappy_bird_kaplayjs/)!

## Conclusión

Seguro que ahora puedes añadir acciones o controles, modificar las velocidades o los intervalos de aparición de los pipes para hacerlo cada vez más difícil. O, tal vez eres capaz de imaginarte power-ups para que el pajarito se vuelva a levantar, 😳 vidas extra, puntos dobles, lo que sea que tu quieras agregar será con lo que concluirás este juego y ahora estarás listo para crear cualquier otro. 🎮

Abrazo. Bliss. 🤓

## Enlaces relacionados

[Assets](https://github.com/blissito/flappy_bird_kaplayjs/tree/main/assets)

[Repositorio en Github](https://github.com/blissito/flappy_bird_kaplayjs)

[¿Qué es zsh?](https://es.wikipedia.org/wiki/Zsh)

[Juega online](https://blissito.github.io/flappy_bird_kaplayjs/)
