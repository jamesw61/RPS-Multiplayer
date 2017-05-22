$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyCRKdQPHdR5FR3XJUXwXhlNw7p6ylOsbz8",
        authDomain: "bacon-525e9.firebaseapp.com",
        databaseURL: "https://bacon-525e9.firebaseio.com",
        projectId: "bacon-525e9",
        storageBucket: "bacon-525e9.appspot.com",
        messagingSenderId: "724409226390"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var connectionsRef = database.ref("/connections");

    var connectedRef = database.ref(".info/connected");
   
    
    var firstPlayerPick = "";
    var secondPlayerPick = "";
    var notSet = "notset";

    function resetDatabase() {
        database.ref('rps').update({
            name: notSet, 
            firstP: notSet,
            secondP: notSet           
        });        
    }

    resetDatabase();

    $('#startButton').on('click', function() {
        var name = $('#playerName').val().trim();        
        database.ref('rps').update({
            name: name            
        });
    });
    //**************************************
    database.ref("rps").on("value", function(snapshot) {
       var checkName = snapshot.val().name;
       var firstP = snapshot.val().firstP;
       var secondP = snapshot.val().secondP;
       console.log(checkName + firstP + secondP);
       
           if(firstP === "notset" && checkName!== "notset") {
                console.log('if');
                database.ref('rps').update({
                    firstP: checkName,
                    name: "notset"
                });
                $('#nameOne').html(checkName);
            } 

            else if(checkName !== "notset" && secondP === "notset"){
                console.log('else');
                database.ref('rps').update({
                    secondP: checkName,
                    name: "notset"
                });
                $('#nameTwo').html(checkName);
            }


    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    // $('button').on('click', function{
    //     var pick = $(this).val();
    //     console.log(pick);
    // });

$( ".pOne" ).click(function() {
        var pick = $(this).val();
        console.log(pick);
        $('#scoreOne').html(pick);
});

$('.pTwo').click(function() {
    var pick2 = $(this).val();
    $('#scoreTwo').html(pick2);

});







    // connectedRef.on("value", function(snap) {

    //      // If they are connected..
    //      if (snap.val()) {

    //          // Add user to the connections list.
    //          var con = connectionsRef.push(true);

    //          // Remove user from the connection list when they disconnect.
    //          con.onDisconnect().remove();

    //      }
    //  });

});
