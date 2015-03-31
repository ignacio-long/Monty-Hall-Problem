function montyHall(){
   var doors = [0,0,0], choice = 0, goatDoor = 0, remDoor=0, doorLoop = [door1, door2, door3, door1, door2];

   cleanDoors();
   doors[random_012_Choice()]=1;
   console.log(doors);   // To 'secretly' show the answers first..
   assDoorFunc();


   function assDoorFunc() {
      door1.onclick = function(){
         choice = 0;
         step2();
      };
      door2.onclick = function(){
         choice = 1;
         step2();
      };
      door3.onclick = function(){
         choice = 2;
         step2();
      };
      board.textContent = "Now Choose a Door";
   }

// The MOST fair random 1-3 I've found as tested with testRandom012() (see below)
   function random_012_Choice(){
      var choices = [0,1,2,1,2,0,2,0,1,0,2,1,2,1,0,1,0,2];

      return (choices[random0to17()]);

      function random0to17(){
         var ret = Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
         if (ret < 0 || ret > 17) ret = random0to17();
         return ret;
      }
   }

   function step2(){
      remaining();
      resetDoorBtn();
      doorLoop[goatDoor].style.backgroundImage = "url('pics/Goat.png')"; // Formerly nameDoors();
      board.textContent = String("Ok.. Well, now we've opened door #" + (goatDoor+1) + " and there's a GOAT inside..  Are you staying with door #" + (choice+1) + " or switching?  Click on your final choice..");

      doorLoop[choice].onclick = function(){
         winOrLoose(choice, 0);
      };
      doorLoop[choice+1].onclick = function(){
         winOrLoose(remDoor, 1);
      };
      doorLoop[choice+2].onclick = function(){
         winOrLoose(remDoor, 1);
      };
      doorLoop[goatDoor].onclick = function(){
      };      
   }

   function remaining(){
      do {
         goatDoor = random_012_Choice();
      } while (goatDoor === choice || doors[goatDoor] === 1);
      for (remDoor = 0; ; remDoor++){
         if (remDoor !== choice && remDoor !== goatDoor) break;
      }
   }

   function winOrLoose(val, changingMind) {
      if (doors[val] === 1){
         board.textContent = String("YES!!! YOU HAVE WON THE CAR!!! Click on \"Hide Prize\" to start over");
         picPrize(val);
         resetDoorBtn();
      } else {
         if (changingMind === 1) {
            board.textContent = String("Oops... You where just right before... The Car was hiding behind door #" + (choice+1) + "... Click on \"Hide Prize\" to start over");
            picPrize(choice);
            resetDoorBtn();
         } else {
            board.textContent = String("Oops!! You Should have changed..  The Car was hiding behind door #" + (remDoor+1) + "... Click on \"Hide Prize\" to start over");
            picPrize(remDoor);
            resetDoorBtn();
         }
      }
   }

   function resetDoorBtn() {
      door1.onclick = "";
      door2.onclick = "";
      door3.onclick = "";
   }

   function cleanDoors() {
      door1.style.backgroundImage = "none";
      door2.style.backgroundImage = "none";
      door3.style.backgroundImage = "none";
   }

   function picPrize(val) {
      doorLoop[val].style.backgroundImage = "url('pics/Car.png')";
      doorLoop[val+1].style.backgroundImage = "url('pics/Goat.png')";
      doorLoop[val+2].style.backgroundImage = "url('pics/Goat.png')";
   }

}




/*   /// My old random function, which turned 'bias' as checked with the test below...

   function random_012_Choice(){
      var choices = [0,1,2,0,2,1,2,0,1,2,1,0,1,0,2,1,2,0];
      var randResult = Math.floor(Math.random()*41);

      while (randResult > 17) {
         randResult-=18;
      }
      return (choices[randResult]);
   }


*/

/*  ////  This will compare both random functions:

function testRandom012(func, amm, cons) {
   var x, count = [{count:0},{count:0},{count:0}];
   for (var i = 0; i<=amm; i++) {
      x=func();
      count[x].count++;
      if (cons) console.log(x);
   };
   console.log("\n0 x ", count[0].count, "\n1 x ", count[1].count, "\n2 x ", count[2].count);
   return count;
}


testRandom012(random_012_Choice, 1000002).forEach(function(val){console.log(val)});

*/
