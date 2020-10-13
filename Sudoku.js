(function(){

  

  //create Sudoku game table

  var body = document.getElementsByTagName('body')[0];

  body.style.backgroundColor = "#ccffff";

  var tableSudoku = document.createElement('table');

  tableSudoku.id = "Sudoku";

  for (var i = 1; i < 10; ++i) {

    var tr = document.createElement('tr');

    tr.id = "line" + String(i);

    for (var j = 1; j < 10; ++j) {

      var td = document.createElement('td');

      var button = document.createElement('button');

      button.classList.add("box");

      button.style.backgroundColor = 'yellow';

      button.style.textAlign = "center";

      button.classList.add("zona" + String(zoneOf(i, j)));

      button.classList.add("line" + String(i));

      button.classList.add("col" + String(j));

      button.id = "box" + String(zoneOf(i, j)) + "-" + String(i) + "-" + String(j);

      button.addEventListener("click", function(){selectBox(this);});

      button.innerHTML = "0";

      button.appendChild(document.createTextNode('\u0020'));

      td.appendChild(button);

      tr.appendChild(td);

      if (j == 3 || j == 6){

        var tdb = document.createElement('td');

        tdb.style.textAlign = "center";

        tdb.innerHTML = "|";

        tdb.appendChild(document.createTextNode('\u0020'));

        tr.appendChild(tdb);

      }

    }

    tableSudoku.appendChild(tr);

    if (i == 3 || i == 6){

      var trb = document.createElement('tr');

      for (var j = 0; j < 11; ++j) {

        var tdb = document.createElement('td');

        tdb.style.textAlign = "center";

        tdb.innerHTML = (j == 3 || j == 7) ? "+" : "---";

        tdb.appendChild(document.createTextNode('\u0020'));

        trb.appendChild(tdb);

      }

      tableSudoku.appendChild(trb);

    }

  }

  body.appendChild(tableSudoku);

  

  //Instructions

  body.appendChild( document.createElement('br'));

  var instructions = document.createElement('h3');

  instructions.innerHTML = "Chose one number from below and click where \nit should be in the Sudoku you want to solve";

  body.appendChild(instructions);

  

  //create Sudoku choices' list

  var tableOfChoices = document.createElement('table');

  tableOfChoices.id = "SudokuChoices";

  var listChoice = document.createElement('tr');

  for (i = 1; i < 11; ++i){

    var choicePlace = document.createElement('td');

    var choice = document.createElement('button');

    choice.style.textAlign = "center";

    choice.classList.add("choice");

    choice.style.backgroundColor = 'yellow';

    choice.id = choice.innerHTML = (i != 10) ? String(i) : "Delete";

    choice.addEventListener("click", function(){selectChoice(this);});

    choice.appendChild(document.createTextNode('\u0020'));

    choicePlace.appendChild(choice);

    listChoice.appendChild(choicePlace);

  }

  tableOfChoices.appendChild(listChoice);

  body.appendChild(tableOfChoices);

  

  //Restart button = Clear Sudoku

  body.appendChild( document.createElement('br'));

  var restartb = document.createElement('button');

  restartb.style.backgroundColor = 'yellow';

  restartb.addEventListener("click", clear);

  restartb.innerHTML = "Clear Sudoku";

  restartb.appendChild(document.createTextNode('\u0020'));

  body.appendChild(restartb);

  

  //Solve button

  var solveb = document.createElement('button');

  solveb.style.backgroundColor = 'yellow';

  solveb.addEventListener("click", solve);

  solveb.innerHTML = "Solve Sudoku";

  solveb.appendChild(document.createTextNode('\u0020'));

  body.appendChild(solveb);

}

)();



function zoneOf (i, j){

  return Math.trunc((i - 1) / 3) * 3 + Math.trunc((j - 1) / 3) + 1;

}



function clear(){

  var choises = document.getElementsByClassName("choice");

  for (var i = 0; i < 10; ++i){

    choises[i].style.backgroundColor = 'yellow';

  }

  var boxes = document.getElementsByClassName("box");

  for (var i = 0; i < 81; ++i){

    boxes[i].style.backgroundColor = 'yellow';

    boxes[i].innerHTML = '0';

  }

}



function selectChoice (choice){

  // if a choice is selected => deselect it

  if (choice.style.backgroundColor == 'green'){

    choice.style.backgroundColor = 'yellow';

    return;

  }

  // deselect all selecte choises

  var listChoice = document.getElementsByClassName('choice');

  for (i = 0; i < 10; ++i){

    listChoice[i].style.backgroundColor = 'yellow';

  }

  choice.style.backgroundColor = 'green'; // select your actual choice

}



function testBox (box, choice){ //test if the choice fits in the box

  //box.class[]: "box", "zonaZ", "lineL", "colC"

  

  //test zone

  var zone = document.getElementsByClassName(box.classList[1]);

  for( i in zone){

    if (zone[i].innerHTML === choice.innerHTML){ return false;}

  }

  //test line

  var line = document.getElementsByClassName(box.classList[2]);

  for( i in line){

    if (line[i].innerHTML === choice.innerHTML){ return false;}

  }

  //test col

  var col = document.getElementsByClassName(box.classList[3]);

  for( i in col){

    if (col[i].innerHTML === choice.innerHTML){ return false;}

  }

  //all tests passed

  return true;

}



function selectBox (box){

  var listChoice = document.getElementsByClassName('choice');

  var noChoice = true; //we start by believing there is no choice selected

  // testing my theory

  for (var i = 0; i < 10 && noChoice; ++i){

    if (listChoice[i].style.backgroundColor === 'green'){

      noChoice = false;

      var choice = listChoice[i];

    }

  }

  if (noChoice){return;} //no choice selected => no action needed

  if (box.innerHTML === choice.innerHTML){return;} // same number => wish granted already => no action needed

  if (choice.id == "Delete"){ box.innerHTML = "0"; return;} //just delete the curent number from the box

  if (testBox (box, choice)){ //test if the choice fits in the box

    box.innerHTML = choice.innerHTML; //as the master wishes

  }

}



function solve(){

  var mat = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];

  var tra = [0];

  var z = [0]

  for (var i = 0; i < 10; ++i){

    tra[String(i) + " "] = i;

    mat[i][0] = mat[0][i] = z[i] = 0;

  }

  var boxes = document.getElementsByClassName("box");

  for (var i = 1; i < 10; ++i){

    for (var j = 1; j < 10; ++j){

      mat[i][j] = tra[boxes[9 * (i - 1) + j - 1].innerHTML];

      if (mat[i][j]){

        ++mat[i][0];

        ++mat[0][j];

        ++z[zoneOf(i, j)];

      }

    }

  }

  

  function sig() // select all sure

  {

    var a = 0;

    var b = 0;

    var k = 0;

    var l = 0;

    var i = 0;

    var j = 0;

    

    for (i = 1; i < 10; ++i){

      if (mat[i][0] == 8){

        var v = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (j = 1; j < 10; ++j){

          ++v[mat[i][j]];

          if (mat[i][j] == 0){ a = j; j = 10;}

        }

        for (j = 1; j < 10; ++j){

          if (!v[j]){

            mat[i][a] = j;

            ++mat[i][0];

            ++mat[0][a];

            ++z[zoneOf(i, a)];

            j = 10;

          }

        }

      }

    }

    for (j = 1; j < 10; ++j){

      if (mat[0][j] == 8){

        var v = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (i = 1; i < 10; ++i){

          ++v[mat[i][j]];

          if (mat[i][j] == 0){ a = i; i = 10;}

        }

        for (i = 1; i < 10; ++i ){

          if (!v[i])

          {

            mat[a][j] = i;

            ++mat[a][0];

            ++mat[0][j];

            ++z[zoneOf(a, j)];

            i = 10;

          }

        }

      }

    }

    if (a != 0){ return sig();}



    for (n = 1; n < 10; ++n){

      if (z[n] == 8)

      {

        var v = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        i = Math.trunc(n / 3);

        if (n % 3 != 0){ ++i;}

        j = n - (i - 1) * 3;

        i = (i - 1) * 3 + 1;

        j = (j - 1) * 3 + 1;

        for (k = i; k < i + 3; ++k){

          for (l = j; l < j + 3; ++l){

            ++v[mat[k][l]];

            if (mat[k][l] == 0){ a = k; b = l; k = l = 10;}

          }

        }

        for (i = 1; i < 10; ++i){

          if (!v[i]){

            mat[a][b] = i;

            ++mat[a][0];

            ++mat[0][b];

            ++z[zoneOf(a, b)];

            break;

          }

        }

      }

    }

    if (a != 0){ sig();}

  }

  sig();

  

  var ln = [];

  var col = [];

  n = 0;

  for (i = 1; i < 10; ++i){

      for (j = 1; j < 10; ++j){

          if (mat[i][j] == 0){ ln[++n] = i; col[n] = j;}

      }

  }

  

  function verif (i, j, k){

    for (var a = 1; a < j; ++a){

        if (mat[i][a] == k){ return 0;}

    }

    for (var a = j + 1; a < 10; ++a){

        if (mat[i][a] == k){ return 0;}

    }

    for (a = 1; a < i; ++a){

        if (mat[a][j] == k){ return 0;}

    }

    for (a = i + 1; a < 10; ++a){

        if (mat[a][j] == k){ return 0;}

    }

    

    if (i < 4){ i = 1;}

        else{ if (i > 6){ i = 7;}

              else{ i = 4;}}

    if (j < 4){ j = 1;}

        else{ if (j > 6){ j = 7;}

              else{ j = 4;}}

    

    var nr = 0;

    for (var a = i ; a < i + 3 ; ++a){

        for (var b = j; b < j + 3; ++b){

            if (mat[a][b] == k){ ++nr;}

        }

    }

    

    return nr == 0;

  }

  

  function bac (k){

    if (k == n + 1){

      for (i = 1; i < 10; ++i){

        for (j = 1; j < 10; ++j){

          boxes[9 * (i - 1) + j - 1].innerHTML = String(mat[i][j]) + " ";

        }

      }

      n = 0;

    }

    if (k > n){return;}

    var ii = 1;

    for ( ; ii < 10; ++ii){

      if (verif (ln[k], col[k], ii)){

        mat[ln[k]][col[k]] = ii;

        bac(k + 1);

        mat[ln[k]][col[k]] = 0;

      }

    }

  }

  bac(1);  

}