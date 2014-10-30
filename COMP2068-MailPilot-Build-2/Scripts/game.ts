var stage: createjs.Stage;
var queue;

// game objects
var plane: Plane;
var island: Island;
var clouds = [];
var ocean: Ocean;

// game constants
var CLOUD_NUM: number = 3;



// Preload function
function preload(): void {
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", init);
    queue.loadManifest([
        { id: "plane", src: "images/plane.png" },
        { id: "island", src: "images/island.png" },
        { id: "cloud", src: "images/cloud.png" },
        { id: "ocean", src: "images/ocean.gif" },
        { id: "yay", src: "sounds/yay.ogg" }
    ]);
}

function init(): void {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
    gameStart();
}

// Game Loop
function gameLoop(event): void {
    ocean.update();
    island.update();
    plane.update();

    for (var count = 0; count < CLOUD_NUM; count++) {
        clouds[count].update();
    }

    stage.update();
}

// Plane Class
class Plane {
    image: createjs.Bitmap;
    width: number;
    height: number;
    constructor() {
        this.image = new createjs.Bitmap(queue.getResult("plane"));
        this.width = this.image.getBounds().width;
        this.height = this.image.getBounds().height;
        this.image.regX = this.width * 0.5;
        this.image.regY = this.height * 0.5;
        this.image.y = 430;

        stage.addChild(this.image);
    }

    update() {
        this.image.x = stage.mouseX;
    }
}

// Island Class
class Island {
    image: createjs.Bitmap;
    width: number;
    height: number;
    dy: number;
    constructor() {
        this.image = new createjs.Bitmap(queue.getResult("island"));
        this.width = this.image.getBounds().width;
        this.height = this.image.getBounds().height;
        this.image.regX = this.width * 0.5;
        this.image.regY = this.height * 0.5;
        this.dy = 5;
        stage.addChild(this.image);
        this.reset();
    }

    reset() {
        this.image.y = -this.height;
        this.image.x = Math.floor(Math.random() * stage.canvas.width);
    }

    update() {
        this.image.y += this.dy;
        if (this.image.y > (this.height + stage.canvas.height)) {
            this.reset();
        }
       
    }
}

// Island Class
class Cloud {
    image: createjs.Bitmap;
    width: number;
    height: number;
    dy: number;
    dx: number;
    constructor() {
        this.image = new createjs.Bitmap(queue.getResult("cloud"));
        this.width = this.image.getBounds().width;
        this.height = this.image.getBounds().height;
        this.image.regX = this.width * 0.5;
        this.image.regY = this.height * 0.5;

        stage.addChild(this.image);
        this.reset();
    }

    reset() {
        this.image.y = -this.height;
        this.image.x = Math.floor(Math.random() * stage.canvas.width);
        this.dy = Math.floor(Math.random() * 5 + 5);
        this.dx = Math.floor(Math.random() * 4 - 2);
    }

    update() {
        this.image.y += this.dy;
        this.image.x += this.dx;
        if (this.image.y > (this.height + stage.canvas.height)) {
            this.reset();
        }

    }
}

// Ocean Class
class Ocean {
    image: createjs.Bitmap;
    width: number;
    height: number;
    dy: number;
    constructor() {
        this.image = new createjs.Bitmap(queue.getResult("ocean"));
        this.width = this.image.getBounds().width;
        this.height = this.image.getBounds().height;
        this.dy = 5;
        stage.addChild(this.image);
        this.reset();
    }

    reset() {
        this.image.y = -this.height + stage.canvas.height;
    }

    update() {
        this.image.y += this.dy;
        if (this.image.y >= 0) {
            this.reset();
        }

    }
}

function gameStart(): void {
    ocean = new Ocean();
    island = new Island();
    plane = new Plane();

    for (var count = 0; count < CLOUD_NUM; count++) {
        clouds[count] = new Cloud();
    }
}