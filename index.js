var employee = ""
var role = ""
var date = ""
var rate = ""

var config = {
    apiKey: "AIzaSyAUJAyNtx-yOZs1IprEw6GXI6lo-5hl8No",
    authDomain: "uwexbootcamp-ajm.firebaseapp.com",
    databaseURL: "https://uwexbootcamp-ajm.firebaseio.com",
    projectId: "uwexbootcamp-ajm",
    storageBucket: "uwexbootcamp-ajm.appspot.com",
};

// Initialize Firebase
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

$("#add-employee").on("click", function(event) {
    event.preventDefault();
    employee = $("#employee-name").val().trim()
    role = $("#role").val().trim()
    date = $("#date").val().trim()
    rate = $("#rate").val().trim()

    database.ref().push({
       employee: employee,
       role: role,
       date: date,
       rate: rate,
       dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });

});