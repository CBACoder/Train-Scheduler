$(document).ready(function(){




    //initialize firebase
    var config = {
        apiKey: "AIzaSyDYpFISjSwqlLp93Z0Z7cvhzAq9M9wSkmA",
        authDomain: "trainscheduler-8bc4c.firebaseapp.com",
        databaseURL: "https://trainscheduler-8bc4c.firebaseio.com",
        projectId: "trainscheduler-8bc4c",
        storageBucket: "",
        messagingSenderId: "334798195566"
    };
    firebase.initializeApp(config);

    // initialize database variable here
    const databaseRef = firebase.database();

    // initialize variables
    var trainName ="";
    var destination ="";
    var firstTrainTime ="";
    var frequency ="";

    // capture the submit button click
    $("#add-train").on("click",function(event){
        event.preventDefault();

        //retrieve form values
        trainName = $("#train-name").val().trim();
        destination = $("#train-destination").val().trim();
        firstTrainTime = $("#first-traintime").val().trim();
        frequency = $("#frequency").val().trim();
        console.log("requency :",frequency);
        // save form values to firebase
        databaseRef.ref().push({
            trainName : trainName,
            destination : destination,
            firstTrainTime : firstTrainTime,
            frequency : frequency
        });
        //clear the form fields 
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#first-traintime").val("");
        $("#frequency").val("");
    });

    // fire watcher base and on child add.
    databaseRef.ref().on("child_added",function(snapshot){
        // populate the dom with train schedules
        
        $("#trainSchedules").append(
          "<tr>"  +
            "<td>" + snapshot.val().trainName    + "</td>" +
            "<td>"  + snapshot.val().destination   + "</td>"  +
            "<td>"  + snapshot.val().frequency     + "</td>"  +
            "<td>"  + snapshot.val().frequency + "</td>"  + 
          "</tr>"
        )

    });


});