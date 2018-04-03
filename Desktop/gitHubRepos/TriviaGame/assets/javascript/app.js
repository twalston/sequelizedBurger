$(document).ready(function () {

   var options = [
        { 
        question: "I don't like them black folk. What, you say I'm black? Nah, I just got re-vitiligo. It's the opposite of what Michael Jackson has, you know. Don't shoot me 118 times, but please tell me...who am I?", 
        choice: ["Riley", "Uncle Ruckus", "Tom", "Ed"],
        answer: 1,
        photo: "assets/images/uncle.gif"
        },

        { 
        question: "I don't like the way my brethren have handled things. The African-American culture has gone astray. I guess you could say I lean towards the left in political belief...who am I?", 
        choice: ["Huey", "Riley", "Ed", "Uncle Ruckus"],
        answer: 0,
        photo: "assets/images/huey.gif"
        }, 

        {
        question: "Asking this question won't make me go to jail, will it? Oh, that's good. You know what happens in those prison showers. Anyway, I'm an assistant district attorney. Who am I?", 
        choice: ["Jazmine", "Thugnificent", "Tom", "Ed"],
        answer: 2,
        photo: "assets/images/tom.gif"
        }, 

        {
        question: "I've led a very interesting life. I've flown planes in World War II, marched with civil rights protesters, and even briefly opened my own restaurant. Who am I?", 
        choice: ["H. Stinkmeaner", "Tom", "Grandpa", "Uncle Ruckus"],
        answer: 2,
        photo: "assets/images/grandpa.gif"
        }, 

        {
        question: "Who is the artist who sings/raps Thuggin Love?", 
        choice: ["Uncle Ruckus", "Tom", "Ed", "Thugnificent"],
        answer: 3,
        photo: "assets/images/thug.gif"
        }, 

        {
        question: "It feels good to be a gangsta! That's what I think. I love the gangsta culture and I love Scarface. I love playing with guns, too! Who am I?", 
        choice: ["Huey", "Riley", "Jazmine", "Ed"],
        answer: 1,
        photo: "assets/images/riley.gif"
        }, 

        {
        question: "I hate everyone and everything. If you're in my way, I'm going to punch you or just insult you. I'm also a cancer survivor. Who am I?", 
        choice: ["H. Stinkmeaner", "Grandpa", "Tom", "Huey"],
        answer: 0,
        photo: "assets/images/stink.gif"
        }];
    

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    $("#reset").hide();

    //click start button to start game

    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })

    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }

    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //randomly pick question in array if not already shown
    function displayQuestion() {

        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);

                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {

        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!!!!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong!!!!! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 15;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h1>Game Over!  Here's how you did: </h1>");
            $("#answerblock").append("<p> Correct: " + correctCount + "<p>" );
            $("#answerblock").append("<p>Incorrect: " + wrongCount + "<p>" );
            $("#answerblock").append("<p>Unanswered: " + unanswerCount + "<p>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 5000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
