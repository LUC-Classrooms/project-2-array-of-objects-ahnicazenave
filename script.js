/*
 Project 2 - Array of Objects
 Name: Ahni Cazenave
 Comments: I made my sprite image of a dog into an object constructor that utilizes an Array and for loop. 
 The dog is still interactive in that when you press the up arrow button, the dogs tail moves and when you 
 press on the down arrow the color of the underbelly of the dog changes from white to light brown. I also added a 
 mousePressed function that adds to the Array by adding a new Dog. 
 */

/*** 
 * Please see the full assignment instructions in COMP 125 on Sakai (or under the "Markdown" tab)
 * Make an array of objects of the same type. Start by creating an object constructor funciton. Test it with individual object instances. Then create an array and initialize it with objects created from your constructor.
 * Use the draw() function to display and move your objects independently on the canvas.
***/

var dogs = new Array(5);//global variable for array of 5 dogs

function setup(){
  // this function will run once
  createCanvas(600, 400); // create a 600 x 400 pixel drawing canvas
  for(let i = 0; i < dogs.length; i++){ //loop managing array of dogs
    dogs[i] = new Dog(random(width), random(height)); //create new dog with random location
  }

}

function draw(){
  background(200); //light gray background
  for(let i = 0; i < dogs.length; i++){
    dogs[i].display(); //makes dogs appear on screen
    dogs[i].move(); //makes dogs move around
    dogs[i].spin(); //makes dogs spin
  }
 }

function mousePressed(){
  let obj = new Dog(mouseX, mouseY);
  dogs.push(obj);
}

function Dog(tempX, tempY){ //object constructor 
  this.x = tempX; //first argument becomes tempX
  this.y = tempY; //second argument becomes tempY
  this.r = 0; //rotate
  this.s = .5; //scaled down by .5 so that dog is smaller
  this.rSpeed = random(-.1, .1); //rotation speed of dog
  this.xSpeed = random(-4, 4); //horizontal speed of dog
  this.ySpeed = random(-3, 3); //vertical speed of dog

  this.move = function(){ //movement of dog stays on screen
    this.x += this.xSpeed; 
    if (this.x > width || this.x < 0){ //hits left or right
      this.xSpeed *= -1; //changes direction if the dog goes off the screen
    }
    this.y += this.ySpeed; //speed of dog stays on screen
    if (this.y > height || this.y < 0){ //hits top or bottom
      this.ySpeed *= -1; //change direction 
    }
  }
  
  this.spin = function(){
    this.r += this.rSpeed; //rotation
  }
  this.scale = function(s){
    this.s = s; //scale factor
  }

  this.display = function(){ //drawing of dog
    push(); //create new layer
    translate(this.x, this.y); //move origin point
    rotate(this.r); 
    scale(this.s);
    fill(234, 221, 202); // beige dog color
    //tail
    if(keyIsDown(UP_ARROW)){ 
      triangle(85, -20, 45, 45, 20, 35);//makes tail move 20 pixels to right (wagging motion)
    } else {
      triangle(65, -20, 45, 45, 20, 35);//resting tail when mouse NOT pressed 
    }
    //back legs
    quad(-95, 75, -40, 45, -50, 90, -80, 105); //left dog back leg
    quad(40, 45, 95, 75, 80, 105, 50, 90); //right dog back leg
    //body
    quad(-30, -15, 30, -15, 60, 95, -60, 95); //dog body background
    if(keyIsDown(DOWN_ARROW)) {
      fill(188, 158, 130); // make random color belly
      ellipse(0, 45, 50, 60) //belly 
    } else {
      fill(240) //white belly color
      ellipse(0, 45, 50, 60) //belly 
    }
    strokeWeight(.75); //front legs stroke
    line(-40, 40, -50, 90); //left line of front left leg
    line(-50, 90, -20, 90); //bottom line of front left leg
    line(-20, 90, -15, 40); //right line of front left leg
    line(15, 40, 20, 90); //left line of front right leg
    line(20, 90, 50, 90); //bottom line of front left leg
    line(50, 90, 40, 40); //right line of front right leg
    //ears
    strokeWeight(.5); //stroke weight for everything besides front legs
    fill(234, 221, 202); // beige dog color
    ellipse(-25, -135, 25, 50); //left dog ear
    ellipse(25, -135, 25, 50); //right dog ear
    fill(243, 207, 198); //inner ear pink color 
    ellipse(-25, -130, 15, 35); //left inner dog ear
    ellipse(25, -130, 15, 35); //right inner dog ear
    //head
    fill(234, 221, 202); // beige dog color
    quad(-35, -115, 35, -115, 60, -15, -60, -15); //dog head
    fill(0); // eyes and nose black color
    ellipse(-20, -85, 15); //left eye iris
    ellipse(20, -85, 15); //right eye iris
    ellipse(0, -45, 30, 20); //nose
    fill(255); // eyes white color 
    ellipse(-20, -87, 9); //left eye pupil
    ellipse(20, -87, 9); //right eye pupil
    pop(); //dispose of layer
  }  

}