import 'phaser-ce';
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const TEXT_FONT = "65px Arial";
const TEXT_COLOR = "#ff0044";
const TEXT_ALIGNMENT = "center";

let _clickCount = 1;
var _counterText;
var _incrementBox;
var _decrementBox;
var _sprite;
var _style;
var _graphics;
var _graphics2;
var _graphics3;

const game = new Phaser.Game(
    GAME_WIDTH,
    GAME_HEIGHT,
    Phaser.AUTO,
    '',
    {
        preload: preload,
        create: create,
        update: update
    });

function preload() {
    game.load.image('ufo', '/src/assets/ufo.png');
}

function create() {

    _graphics = game.add.graphics();
    _graphics2 = game.add.graphics();
    _graphics3 = game.add.graphics();

    _graphics.inputEnabled = true;
    _graphics2.inputEnabled = true;
    _graphics.input.useHandCursor = true;
    _graphics2.input.useHandCursor = true;
    _style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };

    //draw rectangle counter
    _graphics3.lineStyle(2, 0x000000, 1);
    _graphics3.beginFill(0xFFFFFF, 1);
    _graphics3.drawRect(game.world.centerX, game.world.centerY, 150, 50);
    _graphics3.endFill();

    //draw rectangle increment
    _graphics.lineStyle(2, 0x000000, 1);
    _graphics.beginFill(0xFFFFFF, 1);
    _incrementBox = _graphics.drawRect(game.world.centerX, game.world.centerY + 75, 50, 50);
    _incrementBox.events.onInputDown.add(IncrementNumber);
    game.add.text(game.world.centerX + 15, game.world.centerY + 80, "+", _style);
    _graphics.endFill();

    //draw rectangle decrement
    _graphics2.lineStyle(2, 0x000000, 1);
    _graphics2.beginFill(0xFFFFFF, 1);
    _decrementBox = _graphics2.drawRect(game.world.centerX + 100, game.world.centerY + 75, 50, 50);
    _decrementBox.events.onInputDown.add(DecrementNumber);
    game.add.text(game.world.centerX + 120, game.world.centerY + 80, "-", _style);
    _graphics2.endFill();

    //counter text
    _counterText = game.add.text(game.world.centerX + 65, game.world.centerY + 10, _clickCount, _style);

    //sprite
    _sprite = game.add.sprite(game.world.centerX - 100, game.world.centerY + 50, 'ufo');
    _sprite.anchor.set(0.5);
}

function IncrementNumber() {

    _clickCount++;
   
    if (_clickCount >= 10) {
        _clickCount = 10;
        _counterText.destroy();
        _style = { font: "bold 32px Arial", fill: "#F00000", boundsAlignH: "center", boundsAlignV: "middle" };
        _counterText = game.add.text(game.world.centerX + 65, game.world.centerY + 10, _clickCount, _style);
        changeBoxColor(1);
    }
    else {
        changeBoxColor(4)
        _counterText.destroy();
        _counterText = game.add.text(game.world.centerX + 65, game.world.centerY + 10, _clickCount, _style);
        MoveUFO();
    }
}

function DecrementNumber() {

    _clickCount--;
    console.log(_clickCount);

    if (_clickCount <= 0) {
        _clickCount = 0;
        _counterText.destroy();
        _counterText = game.add.text(game.world.centerX + 65, game.world.centerY + 10, _clickCount, _style);
        changeBoxColor(2);
    }
    else {
        changeBoxColor(3)
        _counterText.destroy();
        _style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        _counterText = game.add.text(game.world.centerX + 65, game.world.centerY + 10, _clickCount, _style);
        MoveUFO();
    }
}

//move the ufo
function MoveUFO() {
    game.add.tween(_sprite).to({ y: game.rnd.integerInRange(0, game.world.centerY) }, game.rnd.integerInRange(0, game.world.centerY), Phaser.Easing.Bounce.Out, true);
}

function changeBoxColor(box) {

    console.log(box);

    if (box == 1) {
        _graphics.beginFill(0x666666, 1);
        _incrementBox = _graphics.drawRect(game.world.centerX, game.world.centerY + 75, 50, 50);
        _graphics.endFill();
    }
    if (box == 2){
        _graphics2.beginFill(0x666666, 1);
        _decrementBox = _graphics2.drawRect(game.world.centerX + 100, game.world.centerY + 75, 50, 50);
        _graphics2.endFill();
    }
    if (box == 3){
        _graphics.beginFill(0xFFFFFF, 1);    
        _incrementBox = _graphics.drawRect(game.world.centerX, game.world.centerY + 75, 50, 50);
        _graphics.endFill();        
    }
    if (box == 4) {
        _graphics2.beginFill(0xFFFFFF, 1);
        _decrementBox = _graphics2.drawRect(game.world.centerX + 100, game.world.centerY + 75, 50, 50);
        _graphics2.endFill();
    }

}

function update() {
  
}
