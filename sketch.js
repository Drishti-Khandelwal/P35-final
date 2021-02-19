
var balloonImage;
var balloon, database;
var position;
var bg;
var banimation;
function preload(){
 bg = loadImage("/p5.play-boilerplate-master/pro-C35 images/Hot Air Ballon-01.png");
banimation= loadAnimation("/p5.play-boilerplate-master/pro-C35 images/Hot Air Ballon-02.png", "/p5.play-boilerplate-master/pro-C35 images/Hot Air Ballon-03.png", "/p5.play-boilerplate-master/pro-C35 images/Hot Air Ballon-04.png")
}

function setup(){
  database = firebase.database();
  
  createCanvas(1500,700);

  balloon = createSprite(250,650,150,150);
  balloon.shapeColor = "red";
  balloon.addAnimation("animation", banimation)


  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw(){
  background(bg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

