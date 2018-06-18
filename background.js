var countingDown = false;
$('#alert').hide();

var t; //variable for setInterval

$("#b1").click(function(){
        startCountDown();
    });

$("#b2").click(function(){
        cancelCountDown();
    });

function startCountDown() {
    var validTime = true;
    if (!countingDown){
        countingDown = true;
        //Start Count Down
        //Get the start time
        var startTime = new Date().getTime();

        //Set the destination time
        var hours = $('#hour').val();
        var minutes = $('#minute').val();
        var seconds = $('#second').val();
        
        //Check for invalid inputs
        if (minutes > 59 || seconds > 59){
            validTime = false;
        }

        if (!validTime){
            $('#display').text("0h 0m 0s");
            $('#alert').show();
            countingDown = false;
        }
        else{
            $('#alert').hide();
            var destinationTime = seconds*(1000) + minutes*(1000*60) + hours*(1000*3600) + startTime;

            //Decrement time by 1 second
            t = setInterval(function() {
                //The kinetic variable
                var now = new Date().getTime();

                //Find distance from now to destinationTime
                var distance = destinationTime - now;

                //Find days, hours, minutes, and seconds
                var hours = Math.floor((distance%(1000*3600*24))/(1000*3600));
                var minutes = Math.floor((distance%(1000*3600))/(1000*60));
                var seconds = Math.floor((distance%(1000*60))/1000);

                // Output the result in an element with id="display"
                $('#display').text(hours + "h " + minutes + "m " + seconds + "s ");

                // If the count down is over, write some text 
                if (distance < 0) {
                    clearInterval(t);
                    $('#display').text("Time's Up!");
                    countingDown = false;
                }
            }, 1000);
        }
    }
}

function cancelCountDown() {
    if (countingDown){
        countingDown = false;
        $('#display').text("0h 0m 0s");
        clearInterval(t);
    }
}