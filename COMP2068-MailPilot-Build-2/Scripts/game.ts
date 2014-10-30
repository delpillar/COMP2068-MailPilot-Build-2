var stage: createjs.Stage;
var queue;

// Preload function
function preload(): void {
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", init);
    queue.loadManifest([
        { id: "loading", src: "images/loading.jpg" },
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

function gameLoop(event):void {
    stage.update();
}

function gameStart(): void {

}