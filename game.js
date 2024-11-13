function setup() {
    createCanvas(1000, 1000);
  }
//counter
var stage =0;
//stage 0 =splash
//stage 1 =game
//stage 2 =win


function draw (){
    if(stage==0){
        splash();
    }
    
    if(stage==1){
        game ();
    }
    if(stage==2){
        win ();
    }
    
}

//Splash screen
function splash(){
    background(6,66,115);
    fill(238,210,2);
    textSize(80);
    text("GORL DIGGER",220,350);
    fill(194,24,7);
    rect (310,650,400,100);
    fill(238,210,2);
    text("Start",410,730);

    if(mouseIsPressed == true){
        stage =2;
    }
}
//win screem
function win(){
    background(6,66,115);
    fill(238,210,2);
    textSize(80);
    text("You win",350,350);
    fill(194,24,7);
    rect (310,650,400,100);
    fill(238,210,2);
    text("try again",360,730);

    
}
