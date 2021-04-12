let rover; // the camera
let music; //the  music
let togglemusicBtn; // toggle the music

// 3d obj files
let angel;
let demon;
let celling;
let floor;
let door;
let rails;

let rotX = 0; // control element X rotation
let angel_ = true; // Is this angel side?
let brightness = 100; // control brightside.


function preload() {
  angel = loadModel('asset/angel_statue.obj');
  celling = loadModel('asset/celling.obj');
  floor = loadModel('asset/floor.obj');
  door = loadModel('asset/door.obj');
  demon = loadModel('asset/demon.obj');
  rails = loadModel('asset/rails.obj');
  music = loadSound('asset/Requiem.mp3');
}
function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  //create buttons.
  togglemusicBtn = createButton('Music');
  filpBtn = createButton('Filp');
  
  //create camera with p5.rovercam.js
  rover = createRoverCam();
  rover.usePointerLock();
  rover.setState({
    position: [-1005,-48,-683],
    rotation: [0.98,0,-0.27],
    sensitivity: 0.1,
    speed: 1
  });
  music.loop();
  music.rate(1.5);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);

}

function draw() {
  
  colorMode(HSB, 360, 100, 100, 100);
  background(222,51, brightness);
  
  togglemusicBtn.show();
  togglemusicBtn.position(width-150, 60);
  togglemusicBtn.mousePressed(togglemusic);

  filpBtn.show();
  filpBtn.position(width-150, 120);
  filpBtn.mousePressed(flip);

  push();
  noStroke();
  rotateX(PI+rotX);
  smooth();
  directionalLight(50,28,brightness+10, 0, 1, 0);
  ambientLight(50,28,brightness/2);
  translate(0,0,0);
  specularMaterial(222,51,77);
  model(door);
  model(celling);
  model(rails);
  translate(0,0,-700);
  model(rails);
  translate(0,0,700);
  shininess(100);
  specularMaterial(295,51,77);
  translate(0,3,0);
  model(angel);
  pop();
  

  
  push();
  noStroke();
  rotateX(PI+rotX);
  directionalLight(50,28,brightness+10, 0, map(brightness,0,90,0,1), 0);
  specularMaterial(222,51,brightness+10);
  model(floor);
  pop();

  push();
  noStroke();
  rotateX(PI+rotX);
  translate(0,-10,0);
  directionalLight(50,28,100, 0, 1, 0);
  ambientLight(50,28,50-brightness/2);
  fill(360,100,100-brightness,100);
  model(floor);
  pop();


  push();
  noStroke();
  smooth();
  rotateX(rotX);
  translate(0,10,0);
  directionalLight(50,28,100, 0, 1, 0);
  ambientLight(50,28,50-brightness/2);
  fill(360,100,100-brightness,100);
  model(door);
  model(celling);
  translate(0,0,-115);
  model(rails);
  translate(0,0,115);
  translate(0,0,-815);
  model(rails);
  translate(0,0,815);
  model(demon);
  pop();
    
  brightness = map(rotX,0,PI,90,0);
  sound_speed = map(rotX,0,PI,1.5,0.5);
  music.rate(sound_speed);

  if (angel_) {
    while(rotX > 0){
      rotX -= 0.025;
      break;
    }
  } else {
    while(rotX < PI){
      rotX += 0.025;
      break;
    }
  }



}

function togglemusic() { 
  if (music.isPlaying()){
    music.pause();
    togglemusicBtn.style('color', '#ffffff');
    togglemusicBtn.style('background-color', '#000000');
  } else {
    music.loop();
    togglemusicBtn.style('color', '#000000');
    togglemusicBtn.style('background-color', '#ffffff');
  }
}

function flip(){
  if(angel_ == true) {
    angel_ = false;
    filpBtn.style('color', '#ffffff');
    filpBtn.style('background-color', '#000000');

  } else {
      angel_ = true;
      filpBtn.style('color', '#000000');
      filpBtn.style('background-color', '#ffffff');
    }
}

function mouseWheel(e) {
  console.log(e);
  if (e.deltaY>0) {
    angel_ = true;
  } else {
    angel_ = false;
  }
}

