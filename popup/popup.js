//Hide certain elements
$('#alert').hide();
$("#b2").hide();
$("#b3").hide();

var t; //object for setInterval
var snd; //alert sound
var destinationTime; //destination time
var startTime; //start time
var countingDown = false; //Status of timer


$("#b1").click(function(){
    startCountDown();
});

$("#b2").click(function(){
    cancelCountDown();
});

$("#b3").click(function(){
    okay();
});

//Start Button
function startCountDown() {
    $("#b3").hide();

    var validTime = true;

    if (!countingDown){
        countingDown = true;

        //START COUNTDOWN
        //Get the start time
        startTime = new Date().getTime();

        //get inputs
        var hour = $('#hour').val();
        var minute = $('#minute').val();
        var second = $('#second').val();
        
        //Check for invalid inputs
        if (minute > 59 || second > 59){
            validTime = false;
        }
        else if (hour == 0 && minute == 0 && second == 0){
            validTime = false;
        }

        //Show alert message if the inputs are invalid
        if (!validTime){
            $('#display').text("0h 0m 0s");
            $('#alert').show();
            countingDown = false;
        }
        else{
            //hide and show certain elements
            $("#b1").hide();
            $("#b2").show();
            $("#b3").hide();
            $('#alert').hide();
            $('#form').hide();
            
            destinationTime = second*(1000) + minute*(1000*60) + hour*(1000*3600) + startTime + 1000;

            //Decrement time by 1 second
            updateTime();
            t = setInterval(function() {
                updateTime();
            });
        }
    }
}


//Cancel Button
function cancelCountDown() {
    if (countingDown){
        countingDown = false;
        clearInterval(t); //clear timer

        $('#display').text("0h 0m 0s");

        //hide and show certain elements
        $('#form').show();
        $("#b2").hide();
        $("#b1").show();
    }
}

//Okay Button
function okay(){
    //stop alert
    snd.pause();
    snd.currentTime = 0;

    $('#display').text("0h 0m 0s");

    //hide and show certain elements
    $("#b3").hide();
    $("#b1").show();
    $('#form').show();
}

function updateTime(){
    //the time that keeps track of now
    var now = new Date().getTime();

    //find distance from now to destinationTime
    var distance = destinationTime - now;

    //find days, hours, minutes, and seconds
    var hours = Math.floor((distance%(1000*3600*24))/(1000*3600));
    var minutes = Math.floor((distance%(1000*3600))/(1000*60));
    var seconds = Math.floor((distance%(1000*60))/1000);

    //output the result in an element with id="display"
    $('#display').text(hours + "h " + minutes + "m " + seconds + "s ");

    // if the count down is over, alert "Time's Up!"
    if (distance < 0) {
        countingDown = false;
        clearInterval(t); //clear timer

        $('#display').text("Time's Up!");

        //hide and show certain elements
        $("#b2").hide();
        $("#b3").show();
        
        //alert audio
        snd = new Audio('/Louie\ Louie.mp3');
        snd.play();
    }
}