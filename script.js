$(document).ready(function() {
  //set initial styles and variables
  var changeToRed = true;
  $('#on, #start, #strict, .quadrants').attr('disabled', 'true');
  $('#on').css('backgroundColor', 'black');

  //run a function when a button is clicked
  $('button').on('click', function() {
    //turn the game off
    if (this.id === 'on') {
      $('#on, #start, #strict, .quadrants').attr('disabled', true);
      $(this).css('backgroundColor', 'black');
      $('#off').removeAttr('style').removeAttr('disabled');
      $('#counterSection').css('opacity', '0.6');
      $('#counter').html('--');
      playerSong = [];
      computerSong = [];
      $('#strictMode').css('backgroundColor', 'black');
      level = 1;
      time = 2000;
    }
    //turn the game on
    else if (this.id === 'off') {
      $(this).css('backgroundColor', 'black').attr('disabled', true);
      $('#on, #start, #strict').removeAttr('style');
      $('#on, #start, #strict').removeAttr('disabled');
      $('#counterSection').css('opacity', '1.0');
    }
    //start the game
    else if (this.id === 'start') {
      playerSong = [];
      computerSong = [];
      $('#strictMode').css('backgroundColor', 'black');
      level = 1;
      time = 2000;
      $('#counter').html(level);
      computerSing();
    }
    //turn strict mode on and off
    else if (this.id === 'strict') {
      if (changeToRed) {
        $('#strictMode').css('backgroundColor', 'red');
        changeToRed = false;
      } else {
        $('#strictMode').css('backgroundColor', 'black');
        changeToRed = true;
      }
    }
    //play the tune of the button and check if it is the correct button
    else if (this.id === 'topLeft') {
      topLeftClick();
      playerSong.push(0);
      console.log(playerSong);
      checkEntries();
    }
    else if (this.id === 'topRight') {
      topRightClick();
      playerSong.push(1);
      console.log(playerSong);
      checkEntries();
    }
    else if (this.id === 'bottomLeft') {
      bottomLeftClick();
      playerSong.push(2);
      console.log(playerSong);
      checkEntries();
    }
    else if (this.id === 'bottomRight') {
      bottomRightClick();
      playerSong.push(3);
      console.log(playerSong);
      checkEntries();
    }
  });

  //play the tune and make the quadrant blink
  function topLeftClick() {
    $('#topLeftSound')[0].play();
    $('#topLeft').fadeOut(200).fadeIn(200);
  }
  function topRightClick() {
    $('#topRightSound')[0].play();
    $('#topRight').fadeOut(200).fadeIn(200);
  }
  function bottomLeftClick() {
    $('#bottomLeftSound')[0].play();
    $('#bottomLeft').fadeOut(200).fadeIn(200);
  }
  function bottomRightClick() {
    $('#bottomRightSound')[0].play();
    $('#bottomRight').fadeOut(200).fadeIn(200);
  }

  var computerSong = [];
  var playerSong = [];
  var y;
  var level = 1;
  var time = 2000;

  //play the tunes in order of the computer's choice
  function playSong(i) {
    if (1 <= level <= 5) {
      time = 2000;
    } else if (6 <= level <= 10) {
      time = 1500;
    } else if (11 <= level <= 20) {
      time = 1000;
    }
    setTimeout(function() {
      if (computerSong[i] === 0) {
        topLeftClick();
      } else if (computerSong[i] === 1) {
        topRightClick();
      } else if (computerSong[i] === 2) {
        bottomLeftClick();
      } else if (computerSong[i] === 3) {
        bottomRightClick();
      }
      i++;
      if (i < computerSong.length) {
        playSong(i);
      } else {
        humanPlay();
      }
    }, time);
  }

  //select a random quadrant
  function computerSing() {
    $('.quadrants').attr('disabled', true);
    y = Math.floor(Math.random() * 4);
    computerSong.push(y);
    playSong(0);
    console.log(computerSong);
  }

  //make the quadrants clickable
  function humanPlay() {
    $('.quadrants').removeAttr('disabled');
  }

  //check if a player entered the correct sequence
  function checkEntries() {
    //if all entries are correct proceed to the next level
    if ((playerSong.length === computerSong.length) && (playerSong[(playerSong.length) - 1] === computerSong[(playerSong.length) - 1])) {
      level++;
      if (level <= 20) {
        playerSong = [];
        $('#counter').html(level);
        computerSing();
      }
      //end the game after level 20
      else {
        $('.quadrants').attr('disabled', true);
        $('#counter').html('**');
      }
    }
    //if the last entry is incorrect either repeat the level or restart the game
    else {
      if (playerSong[(playerSong.length) - 1] !== computerSong[(playerSong.length) - 1]) {
        playerSong = [];
        $('.quadrants').attr('disabled', true);
        if (!changeToRed) {
          level = 1;
          computerSong = [];
          $('#counter').html('!!').fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
          setTimeout(function() {
            $('#counter').html(level);
            computerSing();
          }, 3000);
        } else {
          $('#counter').html('!!').fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
          setTimeout(function() {
            $('#counter').html(level);
            playSong(0);
          }, 3000);
        }
      }
    }
  }
});
