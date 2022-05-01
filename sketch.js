var tobigroup;
//Não consegui exibir o score
var invisivel;
var score=0;
var tobivida = 150;
var narutovida = 300;

//GAMESTATES
var start = 0;
var play = 1;
var play2 = 4;

// LOGOS 
var narutologo;
var narutologoo;

//SONS
var startsound;
var tobisound;

//BOTÕES
var bstart,bstartimg;
var music;
var musicspriteon;

//SCORE WIN LOSE
var slose, swin, spoint;

//PROTAGONISTA
var narutobrinks;

var narutoan;
var naruto;
var narutoawk;

//PERSONAGEM
var narutoreal;
var narreals;

//ANTAGONISTA
var itachibrinks;
var tobian;

var itachian;


//INIMIGOS

//SPRITES
var spritestart;

var musicsprite;

//GAMESTATE INICIAL
var gamestate = start;

//FUNDOS
var flose, fplay, fstart,fwin,ff2;
var spriteplayf2;


function preload(){

    narutologo = loadImage("narutologo.png")

    //FUNDO TIPOS

    flose = loadImage("lose.jpg");
    fplay = loadImage("fundo.png");
    fstart = loadImage("play.png");
    fwin = loadImage("win.jpg");
    ff2 = loadImage("newfase.jpg");

    //BOTAO LOAD
    bstartimg = loadImage("startbutton.png");
    music = loadImage("musicof.png");
    musicon = loadImage("musicon.png");

    //PROTAGONISTA
    narutoawk = loadImage("narutob.png");
    naruto = loadAnimation("naruto_0-1.png");
    narutoan = loadAnimation("naruto_4-1.png","naruto_4-2.png","naruto_4-1.png","naruto_4-2.png");

    narreals = loadAnimation("naruto_20-0.png","naruto_20-1.png","naruto_20-2.png","naruto_20-3.png","naruto_20-4.png","naruto_20-5.png")

    //ANTAGONISTA
    itachian = loadAnimation("itaci_20-0.png","itaci_20-1.png","itaci_20-2.png","itaci_20-3.png","itaci_20-4.png","itaci_20-5.png")

    tobian = loadAnimation("tobi_30020-0.png","tobi_30020-1.png","tobi_30020-2.png","tobi_30020-3.png","tobi_30020-4.png","tobi_30020-5.png");


    //INIMIGOS



    //###################
    //   SONS
    //###################

    startsound = loadSound("TRACKNARUTO.mp3");
    tobisound = loadSound("tobi.mp3");

    
}

function setup() {
    createCanvas(790, 450);


    spritestart = createSprite(200, 200);
    spritestart.addImage(fstart);
    spritestart.scale = 0.62;
    spritestart.visible = false;

    spriteplay = createSprite(430, 200);
    spriteplay.addImage(fplay);
    spriteplay.visible = false;
    spriteplay.scale = 1.24; 
    spriteplay.velocityX = -1.5; 

    spriteplayf2 = createSprite(430, 200);
    spriteplayf2.addImage(ff2);
    spriteplayf2.visible = false;
    spriteplayf2.scale = 0.49;
    spriteplayf2.velocityX = -1.5;

    bstart = createSprite(359, 230);
    bstart.addImage(bstartimg);
    bstart.visible = false;
    bstart.scale = 0.05;

    narutobrinks = createSprite(200, 350);
    narutobrinks.visible = false;
    narutobrinks.addAnimation("naruto",narutoan);
    narutobrinks.velocityX = 3;
    narutobrinks.scale = 1.5;



    itachibrinks = createSprite(350, 355);
    itachibrinks.visible = false;
    itachibrinks.addAnimation("itachi",itachian);
    itachibrinks.velocityX = 3;
    itachibrinks.scale = 1.5;


    narutologoo = createSprite(370,120);
    narutologoo.addImage(narutologo);
    narutologoo.scale = 0.2;
    narutologoo.visible = false;


    musicsprite = createSprite(700, 50);
    musicsprite.addImage(music);
    musicsprite.scale = 0.2;

    musicspriteon = createSprite(630,50);
    musicspriteon.addImage(musicon);
    musicspriteon.scale = 0.059;

    narutoreal = createSprite(200, 385)
    narutoreal.addAnimation("narreal",narreals);
    narutoreal.scale = 1.9;
    narutoreal.visible = false;

    invisivel = createSprite(400, 430,1000,20);
    invisivel.visible = false;


    tobigroup = createGroup();

    narutoreal.setCollider("circle", 0,0,15)

}

function draw() { 
    drawSprites();
    if(spriteplay.x < 300){
        spriteplay.x = 430;
    }

    if(gamestate === start){
        spritestart.visible = true;
        narutologoo.visible = true;
        narutobrinks.visible = true;
        itachibrinks.visible = true;
        bstart.visible = true;
        narutoreal.visible = false;
        spriteplay.visible = false;
        
        tobigroup.destroyEach();

        if(narutobrinks.x >= 725){
            narutobrinks.x = -250;
        }

        if(itachibrinks.x >= 723){
            itachibrinks.x = -90;

        }

        



        if(mousePressedOver(bstart)){
            score = 0;
            gamestate = play;
        
        }


        
    }
 

    
    if(gamestate === play){
        
        score = score + Math.round(getFrameRate()/59);
         
         textSize(30);
        
        
         text("Pontuação:"+ score, 90,50)

        spriteplay.visible = true;
        spritestart.visible = false;
        bstart.visible = false;
        narutologoo.visible = false;
        narutoreal.visible = true;
        narutobrinks.visible = false;
        itachibrinks.visible = false;
        narutobrinks.setLifetime=0;
        itachibrinks.setLifetime=0;

        narutoreal.x = 200;


        if(keyWentDown("space")){
            narutoreal.velocityY = -10;
            invisivel.destroy();

        }
        
        if((narutoreal.y < 190)){
            narutoreal.velocityY = +7
            invisivel = createSprite(400, 430,1000,20);
            invisivel.visible = false;


        }

        if(narutoreal.isTouching(invisivel)){
            narutoreal.velocityY = 0
        }

        if(narutoreal.x > 599){
            gamestate = play;
        }

        if(narutoreal.isTouching(tobigroup)){
            narutoreal.velocityX = 0;
            narutoreal.velocityY = 0;

            gamestate = start;
        }
        
        
        tobi();
    


    }

    if(mousePressedOver(musicsprite)) {
        startsound.stop();
        }

    if(mousePressedOver(musicspriteon)){
        startsound.play();
        }


    
}

function tobi(){
    
    
    if (frameCount % 150 === 0){
        
        var tobi = createSprite(700,370); 
        tobi.addAnimation("tobi",tobian);
        tobi.velocityX = -7;
        tobi.setLifetime=400;
        tobi.scale = 1.59;
        tobisound.play();

        tobigroup.add(tobi);


    }
}
