var config = {
    apiKey: "AIzaSyAaRqf2V9k9Uh9T7eoW1GK_2nnASOCHQ8U",
    authDomain: "database-7cd1a.firebaseapp.com",
    databaseURL: "https://database-7cd1a.firebaseio.com",
    projectId: "database-7cd1a",
    storageBucket: "database-7cd1a.appspot.com",
    messagingSenderId: "22939043359"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trnName = $("#train-name-input").val().trim(); 
    console.log(trnName)   
    var trnDestination = $("#destination-input").val().trim();
    var trnFirstTrainTime = $("#first-train-time-input").val().trim();
   // console.log(firstTrainTime)
    var trnFrequency = $("#frequency-input").val().trim();
    
   

    // Creates local "temporary" object for holding employee data
    var newTrn = {
      name: trnName,
      destination: trnDestination,
      firstTrainTime: trnFirstTrainTime,
      frequency: trnFrequency,
      
      
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrn);
  
    // Logs everything to console
    console.log(newTrn.name);
    console.log(newTrn.destination);
    console.log(newTrn.firstTrainTime);
    console.log(newTrn.frequency);
    
    
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");    
    
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
   // console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnFirstTrainTime = childSnapshot.val().firstTrainTime;
    var trnFrequency = childSnapshot.val().frequency;
    
    
  
   // Employee Info
   console.log(trnName);
  console.log(trnDestination);
   console.log(trnFirstTrainTime);
   console.log(trnFrequency);    
    
  
    // Prettify the employee start
    var firstTimeConverted = moment.unix(trnFirstTrainTime).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var diffTime = moment().diff(moment.unix(trnFirstTrainTime), "minutes");
    console.log(diffTime);
  
    // Calculate the total billed rate
    var trnFrequency = diffTime * trnFrequency;
    console.log(trnFrequency);
  
    // Add each train's data into the table
    $("#train-table").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" +
    trnFrequency + "</td><td>" + diffTime + "</td><td>" + trnFrequency + "</td></tr>");
  });