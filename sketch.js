var towerImg, tower;
var door,doorImg,doorG
var climber,climberImg,climberG
var ghost,ghostImg
var invisibleblock,invisibleblockG
var gamestate="PLAY"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg=loadImage("door.png")
  climberImg=loadImage("climber.png")
  ghostImg=loadImage("ghost-standing.png")
}

function setup(){
  createCanvas(600,600);
 
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorG=new Group()
  climberG=new Group()
  invisibleblockG= new Group()

  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
 
}

function draw(){
  background(0);
  if(gamestate==="PLAY"){

  
  if (tower.y>400){
    tower.y=300
  }

  if(keyDown("left")){
    ghost.x-=3
  }
  if(keyDown("right")){
    ghost.x+=3
  }
  if(keyDown("space")){
    ghost.velocityY=-5
  }
  ghost.velocityY+=0.8
  if(climberG.isTouching(ghost)){
    ghost.velocityY=0
  }
  if(invisibleblockG.isTouching(ghost)||ghost.y>600){
    ghost.destroy()
    gamestate="END"
  }

  
    spawndoors()
    drawSprites();
}
if(gamestate==="END"){
  stroke("yellow")
  fill("blue")
  textSize(30)
  text("game over",230,250)
}
}
function spawndoors(){
if(frameCount%250===0){
  door=createSprite(200,-50)
  door.addImage(doorImg)
  climber=createSprite(200,10)
  climber.addImage(climberImg)
  invisibleblock=createSprite(200,15)
  invisibleblock.visible=false
  invisibleblock.width=climber.width
  invisibleblock.height=2
  door.x=Math.round(random(120,400))
  climber.x=door.x
  climber.velocityY=1
  invisibleblock.x=door.x
  invisibleblock.velocityY=1
  door.velocityY=1
  door.lifetime=800
  climber.lifetime=800
  doorG.add(door)
  climberG.add(climber)
  invisibleblock.lifetime=800
  invisibleblockG.add(invisibleblock)
  ghost.depth=door.depth
  ghost.depth+=1

}
}
