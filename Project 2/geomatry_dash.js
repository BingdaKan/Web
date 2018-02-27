

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    var screen = "mainMenu";
    var reduceLag = false; // if the game is laggy, set this to true
    var gravity = 0.5;
    var timer = 0;
    var lose = false;
    var keys = [];

    var obstacles = {

        x: 0,
        speed: 4
    };

    var grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 3, 2, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    var Player = function(x, y, w, h, sy, numJumps, jumping, angle) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sy = sy;
        this.numJumps = numJumps;
        this.jumping = jumping;
        this.angle = angle;
    };

    Player.prototype.draw = function() {

        if (this.jumping === true) {
            this.angle += 4.6165;
        }

        pushMatrix();
        translate(this.x, this.y);
        rotate(this.angle);
        strokeWeight(2);
        rectMode(CENTER);
        stroke(0);
        fill(0, 255, 0);
        rect(0, 0, this.w, this.h);
        fill(0, 50, 125);
        rect(0, 0, 22, 22);
        fill(0, 255, 255);
        rect(0, 0, 12, 12);
        rectMode(CORNER);
        popMatrix();
    };

    Player.prototype.jump = function() {

        if (this.numJumps < 1 && ((timer > 15 && mouseIsPressed) || (keys[32]))) {
            this.sy = -10;
            this.numJumps++;
            this.jumping = true;
        }

        this.sy += gravity;
        this.y += this.sy;

        if (this.y + this.h > 310) {
            this.y = 310 - this.h;
            this.sy = 0;
            this.numJumps = 0;
            this.jumping = false;
            this.angle = 0;
        }
    };

    var player = new Player(100, 240, 35, 35, 0, 0, false, 0);

    var button = function(x, y, label, nextScreen) {

        stroke(0);
        strokeWeight(3);

        if (mouseX > x && mouseX < x + 150 && mouseY > y && mouseY < y + 50) {
            fill(245);
            cursor(HAND);

            if (mouseIsPressed) {
                screen = nextScreen;
            }

        } else {
            fill(255);
        }

        rect(x, y, 150, 50);

        fill(0);
        textSize(25);
        text(label, x + 75, y + 25);
    };

    var pattern = function(c1, c2, s) {

        background(c1);

        fill(c2);
        stroke(s);
        strokeWeight(3);
        rect(5, 5, 150, 100);
        rect(165, 5, 75, 35);
        rect(255, 5, 50, 35);
        rect(315, 5, 80, 100);
        rect(5, 115, 85, 225);
        rect(100, 115, 55, 50);
        rect(100, 175, 55, 50);
        rect(165, 50, 140, 175);
        rect(315, 115, 80, 65);
        rect(315, 190, 80, 205);
        rect(100, 235, 205, 50);
        rect(100, 295, 45, 45);
        rect(155, 295, 95, 45);
        rect(260, 295, 45, 45);
        rect(5, 350, 300, 45);
    };

    var mainMenu = function() {

        pattern(color(0, 50, 135), color(0, 50, 125), color(0, 0, 100));
        fill(0, 255, 0);
        textSize(50);
        text("Geometry Dash", 200, 75);

        button(125, 165, "Play", "play");
        button(125, 245, "Instructions", "instructions");
        
        fill(255);
        textSize(25);
        text("Made by Kevin23", 200, 350);
    };

    var instructions = function() {

        pattern(color(185, 15, 185), color(255, 0, 255), color(165, 15, 165));
        fill(255);
        textSize(50);
        text("Instructions", 200, 50);
        textSize(20);
        textAlign(LEFT, CENTER);
        text("1) Press the space key or click the\nmouse to jump\n2) Don't land on the spikes\n3) Have fun!", 35, 200);
        textAlign(CENTER, CENTER);
        button(125, 325, "Back", "mainMenu");
    };

    var spike = function(x, y, w, h) {
        
        strokeWeight(2);
        triangle(x + 3, y + h, x + w / 2, y, x + w - 3, y + h);

        if (player.x + player.w / 2 > x && player.x - player.w / 2 < x + w && player.y + player.h / 3 > y && player.y - player.h / 3 < y + h) {
            lose = true;
        }
    };

    var platform1 = function(x, y, w, h) {

        strokeWeight(2);
        rect(x, y, w, h);

        if (player.x + player.w / 2 > x && player.x - player.w / 2 < x + w && player.y + player.h / 2 > y && player.y + player.h / 2 < y + 15) {
            player.y = y - player.h / 2;
            player.sy = 0;
            player.numJumps = 0;
            player.jumping = false;
            player.angle = 0;
        }

        if (player.x + player.w / 2 > x && player.x - player.w / 2 < x + w && player.y + player.h / 2 > y && player.y - player.h / 2 < y + h) {
            lose = true;
        }
    };

    var platform2 = function(x, y, w, h) {
        
        strokeWeight(2);
        rect(x, y, w, h);

        if (player.x + player.w / 2 > x && player.x - player.w / 2 < x + w && player.y + player.h / 2 > y && player.y + player.h / 2 < y + 15) {

            player.y = y - player.h / 2;
            player.sy = 0;
            player.numJumps = 0;
            player.jumping = false;
            player.angle = 0;
        }

        if (player.x + player.w / 2 > x && player.x - player.w / 2 < x + w && player.y + player.h / 2 > y && player.y - player.h / 2 < y + h) {
            lose = true;
        }
    };

    var trap = function(x, y, w, h) {
        
        strokeWeight(1);

        for (var i = 0; i < 35; i += 11.67) {
            triangle(i + x, y + 15, i + x + 5.83, y, i + x + 11.67, y + 15);
        }

        if (player.x + player.w / 2 > x && player.x - player.w / 2 < x + w && player.y + player.h / 2 > y && player.y - player.h / 2 < y + h) {
            lose = true;
        }
    };

    var level = function() {
        
        if (reduceLag === true) {
            noStroke();
        } else {
            stroke(255);
        }
        fill(0);

        for (var a = 0; a < grid[0].length; a++) {

            for (var b = 0; b < grid.length; b++) {

                switch (grid[b][a]) {

                    case 1:
                        spike(a * 35 + obstacles.x, b * 35 + 125, 35, 30);
                        break;
                    case 2:
                        platform1(a * 35 + obstacles.x, b * 35 + 120, 35, 35);
                        break;
                    case 3:
                        trap(a * 35 + obstacles.x, b * 35 + 140, 35, 35);
                        break;
                    case 4:
                        platform2(a * 35 + obstacles.x, b * 35 + 120, 35, 15);
                        break;
                }
            }
        }
    };

    var play = function() {

        if (timer < 500) {
            pattern(color(0, 50, 135), color(0, 50, 125), color(0, 0, 100));
        }
        if (timer >= 500 && timer <= 1000) {
            pattern(color(75, 20, 165), color(100, 35, 165), color(50, 0, 115));
        }
        if (timer > 1000) {
            pattern(color(185, 15, 185), color(255, 0, 255), color(165, 15, 165));
        }

        timer++;

        fill(75);
        stroke(255);
        line(50, 295, 350, 295);

        level();

        obstacles.x -= obstacles.speed;

        player.draw();
        player.jump();

        fill(0);
        strokeWeight(3);
        line(obstacles.x + 5875, 150, obstacles.x + 5875, 265);
        fill(255);
        triangle(obstacles.x + 5875, 150, obstacles.x + 5825, 165, obstacles.x + 5875, 180);

        if (obstacles.x < -5800) {
            noLoop();
            fill(255);
            textSize(50);
            text("You Won!", 200, 100);
            textSize(18);
            text("Thanks for Playing", 200, 150);
        }

        if (lose === true) {
            noLoop();
            fill(255);
            textSize(50);
            text("Game Over!", 200, 100);
            textSize(18);
            text("Try Playing Again", 200, 150);
        }
    };

    var game = function() {

        textFont(createFont("Chalkboard"));
        textAlign(CENTER, CENTER);
        cursor(ARROW);

        switch (screen) {

            case "mainMenu":
                mainMenu();
                break;
            case "instructions":
                instructions();
                break;
            case "play":
                play();
                break;
        }
    };

    var keyPressed = function() {
        keys[keyCode] = true;
    };

    var keyReleased = function() {
        keys[keyCode] = false;
    };

    var draw = function() {
        game();
    };

