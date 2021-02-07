var backgroundImage, goonImage, knightImage, motorcycle_img;
var ground, roof
var motorcycle, motorcycleGroup;
var goon, goonGroup; 
var score=0;
var survivaltime=0;
var gameState="play";



function preload() {
    backgroundImage = loadImage("images/back.png");
    goonImage = loadImage("images/goon.png");
    knightImage = loadImage("images/Knight.png");
    motorcycle_img = loadImage("images/motorcycle.png");

    gameOverSound = loadSound(".wav");
    scoreSound = loadSound("l.wav");

}

function setup() {
    canvas = createCanvas(windowWidth,windowHeight);

    backgr = createSprite(950,500,10,10);
    backgr.addImage(backgroundImage);
    backgr.scale=2;

    knight = createSprite(300,700,10,10);
    knight.debug=false;
    knight.setCollider("rectangle",0,0,300,300);
    knight.addImage(knightImage);
    knight.scale=0.8;

    ground = createSprite(950,1000,windowWidth,10);
    ground.visible = false;

    motorcycleGroup= new Group();
    goonGroup = new Group();

    
 

}

function draw() {
 background("white");

 backgr.velocityX=-3;
    if(backgr.x<200) {
    backgr.x=800;
    }

 if(gameState==="play") {

    console.log(knight.y);
    if(keyWentDown(UP_ARROW)&& knight.y>=607) {
        knight.velocityY=-8;
    }
    if(keyWentUp(UP_ARROW)&& knight.y>=607) {
        knight.velocityY=0;
    }
    if(keyWentDown(DOWN_ARROW)) {
        knight.velocityY=8;
    }
    if(keyWentUp(DOWN_ARROW)) {
        knight.velocityY=0;
    }
    knight.collide(ground);

    if(knight.isTouching(motorcycleGroup)) {
        knight.destroy();
        gameState="end";
    }
    if(keyWentDown("A") && knight.isTouching(goonGroup)) {
        goonGroup.destroyEach();
        score++;
        scoreSound.play();
    }else if(knight.isTouching(goonGroup)) {
        knight.destroy();
        gameOverSound.play();
        gameState="end";
    }
    survivalTime = Math.ceil(frameCount/frameRate());
 }

    
    spawnMotorcycle();
    spawnGoons();
   

    drawSprites();

    textSize(20);
    stroke("white");
    text("Survival Time: "+survivalTime,20,20);
    text("Score: "+score,1750,20);
    text("Press A at the same time you are touching the goon to gain score", 750,20);
    

    if(gameState==="end") {
        textSize(50);
        stroke("white");
        text("Game Over", windowWidth/2, windowHeight/2);
        textSize(20);
        stroke("white");
        text("Survival Time: "+survivalTime,20,20);
   
    }

  

}

function spawnMotorcycle() {
    if(frameCount%300===0) {
        motorcycle = createSprite(windowWidth-15, Math.round(random(610,950)),10,10);
        motorcycle.debug=false;
        motorcycle.setCollider("rectangle",0,0,500,400);
        motorcycle.addImage(motorcycle_img);
        motorcycle.scale=0.37;
        motorcycle.velocityX=-25;
        motorcycle.lifetime=windowWidth/25;
        motorcycleGroup.add(motorcycle);
    }
}

function spawnGoons() {
    if(frameCount%150===0) {
        goon = createSprite(windowWidth-15, Math.round(random(610,950)),10,10);
        goon.debug=false;
        goon.setCollider("rectangle",0,0,320,320);
        goon.addImage(goonImage);
        goon.scale=0.4;
        goon.velocityX=-10;
        goon.lifetime=windowWidth/10;
        goonGroup.add(goon);
        
    }
}


