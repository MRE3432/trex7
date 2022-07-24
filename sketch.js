var gameover,gameoverimg,restart,restartimg;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1, obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloud, cloudsgroup, cloudImage;
var score = 0;
var obstaclesgroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jumpsound,diesound,checkpointsound;
//var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  jumpsound = loadSound ("jump.mp3");
  diesound = loadSound ("die.mp3");
  checkpointsound = loadSound ("checkpoint.mp3");

}

function setup() {
  createCanvas(600, 200);
  gameover = createSprite(250,50,40,40);
  gameover.addImage(gameoverimg);
  restart = createSprite(250,100,40,40);
  restart.addImage(restartimg)
  restart.scale = 0.7
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
 obstaclesgroup = new Group();
 cloudsgroup = new Group();
  trex.debug = false;
  trex.setCollider ("rectangle",0,0,40 ,trex.height);
} 

function draw() {
  background("lightpink");
  text ("SCORE: "+ score,520,15);
  
    if (gameState === PLAY) {
      gameover.visible = false;
       restart.visible = false;
      ground.velocityX = -(6+3*score/100);
      score = score + Math.round (frameCount / 60);
          if (score>0 && score% 100 === 0){
          checkpointsound.play();
          }
       if (ground.x < 0){
       ground.x = ground.width/2;
       
        }
     spawnClouds();
     spawnObstacles();
       if(keyDown("space")&& trex.y >= 100) {
       trex.velocityY = -10;
       jumpsound.play();
       }
     trex.velocityY = trex.velocityY + 0.8
       if (obstaclesgroup.isTouching(trex)){
       diesound.play();
        gameState = END;
        trex.velocityY = 0;
       
       
      } 
      
    } 
    else if (gameState === END){
      gameover.visible = true;
      restart.visible = true;
      trex.changeAnimation("collided",trex_collided);
     ground.velocityX = 0;
     trex.velocityX = 0;
     cloudsgroup.setLifetimeEach (-5);
     obstaclesgroup.setLifetimeEach(-5);
     obstaclesgroup.setVelocityXEach(0);
     cloudsgroup.setVelocityXEach(0);
     trex.velocityX=0;
     /*if (mousePressedOver(restartimg)){
     console.log ("perdiste")
    } */
    } 
     
  
  
  

  
  trex.collide(invisibleGround);
  
  //aparecer nubes

  drawSprites();
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60));
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //asignar tiempo de vida a una variable
    cloud.lifetime = 205;
    
    //ajustar la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsgroup.add(cloud);  
    }
 
}
   function spawnObstacles() {
      if (frameCount % 60 === 0){
        var obstacle = createSprite(600,165,10,40);
        obstacle.velocityX = -(6+score/100); 
        var rand = Math.round(random(1,6));
          switch (rand){
          case 1 : obstacle.addImage(obstacle1);
          break;
          case 2 : obstacle.addImage(obstacle2);
          break;
          case 3 : obstacle.addImage(obstacle3);
          break;
          case 4 : obstacle.addImage(obstacle4);
          break;
          case 5 : obstacle.addImage(obstacle5);
          break;
          case 6 : obstacle.addImage(obstacle6);
          break;
          default: break; 
         } 
        obstacle.scale = 0.6;
        obstacle.lifetime = 160;
        obstaclesgroup.add(obstacle);
        }

    
   }