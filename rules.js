/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions.
So please sight sources if you took help from any online resource.
*/



//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9.
Usaged: This is to store the state to the tictactoe board.
When a move is made
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1, -1, -1, -1, -1, -1, -1, -1, -1]

var win_board = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/*
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
  return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that
turn = 1 is for player_1 and
turn = 0 is for player_2
@Param - No param
*/
function whose_move() {
  return this.turn
}

/*
@Return void
@Param
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
  this.turn = !this.turn
}

/*
@Return boolean
@Param
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started() {
  return this.started
}


/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. Verify if the player names are empty or not. Raise an alert if they are empty.
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. Once game has started, Handle multiple clicks on begin play.
*/

function begin_play() {
  var p1name = document.getElementById("player1_id");
  var p2name = document.getElementById("player2_id");

  if (game_started()) {
    alert("game already started");
    return;
  }

  if (isEmpty(p1name.value) || isEmpty(p2name.value)) {
    alert("You must enter two player names");
    return;
  }

  p1name.disabled = true;
  p2name.disabled = true;

  p1name.value = p1name.value + " (X)";
  p2name.value = p2name.value + " (O)";

  this.started = true;

  this.turn = 1;

  update_status();

}

/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. The text boxes for entering name should be enablled back.
3. The Tic Tac Toe Grid should be set to its default entries.
4. Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
Remember to set the strated flag as false

*/

function update_status() {
  var p1Name = document.getElementById("player1_id");
  var p2Name = document.getElementById("player2_id");
  var statusMessage = document.getElementById("turn_info");
  if (game_started() == false) {
    statusMessage.innerHTML = "Game has not started.  Enter player names and click 'Begin Play'";
  } else {
    if (whose_move() == true) {
      statusMessage.innerHTML = "Turn is for: <B>" + p1Name.value + "</B>";
    } else {
      statusMessage.innerHTML = "Turn is for: <B>" + p2Name.value + "</B>";
    }
  }
}

function update_board_state() {
  var idx;
  for (idx = 0; idx < 9; idx++) {
    var cell = document.getElementById(table_ids[idx]);

    switch (board_state[idx]) {
      case -1:
        cell.innerHTML = table_ids[idx];
        break;
      case 1:
      case true:
        cell.innerHTML = "<B>X</B>";
        break;
      case 0:
      case false:
        cell.innerHTML = "<B>O</B>";
        break;
    }
  }
}

function check_winner(player) {
  var idx;
  for (idx = 0; idx < 8; idx++) {
    if ((board_state[win_board[idx][0]] == player) &&
      (board_state[win_board[idx][1]] == player) &&
      (board_state[win_board[idx][2]] == player)) {

      var p1name = document.getElementById("player1_id");
      var p2name = document.getElementById("player2_id");
      var winnerName;

      if (player == true) winnerName = p1name.value;
      else winnerName = p2name.value;

      alert("We have a winner! Congratulations " + winnerName);
      reset_play();

      return true;
    }
  }

  return false;
}


function reset_play() {
  var p1name = document.getElementById("player1_id");
  var p2name = document.getElementById("player2_id");
  var moveid = document.getElementById("move_text_id");

  this.started = false;

  p1name.disabled = false;
  p2name.disabled = false;

  p1name.value = "";
  p2name.value = "";
  moveid.value = "";

  var i = 0;
  for (i = 0; i < 9; i++) {
    this.board_state[i] = -1;
  }

  update_status();
  update_board_state();

}

/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.)
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. After any move, the state of the table should be validated.(see the document attached in the homework)
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. The game should reset itself once a winner is determined.<br/>
8. After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>

*/
function play() {
  if (!game_started()) {
    alert("game not started");
    return;
  }

  var entryid = document.getElementById("move_text_id");
  var moveIndex = table_ids.indexOf(entryid.value.toUpperCase());

  if (moveIndex < 0) {
    alert("Invalid move: '" + entryid.value + "': You must enter a coordinate from A1 to C3.");
    return;
  }

  if (board_state[moveIndex] != -1) {
    alert("Invalid move, box taken");
    return;
  }

  board_state[moveIndex] = whose_move();
  update_board_state();

  if (check_winner(whose_move()) == true) {
    return;
  }

  toggle_move();
  update_status();


}

/*
Do not change this method.
*/
function moveEnter(event) {
  if (event.keyCode == 13) {
    event.preventDefault()
    play()
  }

}
