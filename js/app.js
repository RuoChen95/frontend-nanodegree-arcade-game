// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 170*Math.random() + 60;
    this.random = Math.random() * 120 + 60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //汽车横穿屏幕
    this.x = this.x + this.random*dt;
    if(this.x>=400){
        this.x = 0;
        this.y = 170*Math.random() + 60;
        this.random = Math.random() * 120 + 60;
    } 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};
//实现玩家到达终点后表明玩家胜利以及撞车后游戏重新开始
Player.prototype.update = function(){
    if(this.y==0){
        alert("you win!");
    }
    for(i=0; i<4; i++){
        if(allEnemies[i].x-60<this.x && this.x<allEnemies[i].x+60 && allEnemies[i].y-50<this.y && this.y<allEnemies[i].y+70){
            location.reload();
    }}
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(e){ //e代表了用户输入的值
    if(e == 'left'){
        this.x -=30;
    }
    else if(e == 'up'){
        this.y -=30;
    }
    else if(e == 'right'){
        this.x +=30;
    }
    else if(e == 'down'){
        this.y +=30;
    }
    //玩家无法移动至屏幕外
    if(this.x<=0) this.x = 0;
    if(this.x>=400) this.x =400;
    if(this.y<=0) this.y = 0;
    if(this.y>=400) this.y =400;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(var i=0; i<4;i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
};
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});