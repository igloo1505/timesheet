var employee = "";
var role = "";
var date = "";
var rate = "";

var config = {
	apiKey: "AIzaSyABs5akJse5SS2bs9qRmuj00SKBflMi4Uw",
	authDomain: "wisconsin-4c6cc.firebaseapp.com",
	databaseURL: "https://wisconsin-4c6cc.firebaseio.com",
	projectId: "wisconsin-4c6cc",
	storageBucket: "wisconsin-4c6cc.appspot.com",
};

// Initialize Firebase
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var dataRef = firebase.database();

$("#add-employee").on("click", function (event) {
	event.preventDefault();
	employee = $("#employee-name").val().trim();
	role = $("#role").val().trim();
	date = $("#date").val().trim();
	rate = $("#rate").val().trim();

	dataRef.ref().push({
		employee: employee,
		role: role,
		date: date,
		rate: rate,
		dateAdded: firebase.database.ServerValue.TIMESTAMP,
	});
});

dataRef.ref().on(
	"child_added",
	function (childSnapshot) {
		// Log everything that's coming out of snapshot
		console.log(childSnapshot.val().employee);
		console.log(childSnapshot.val().role);
		console.log(childSnapshot.val().date);
		console.log(childSnapshot.val().rate);

		// full list of items to the well
		$("tbody").append(
			"<tr class='well'><td class='display-info'> " +
				childSnapshot.val().employee +
				" </td><td class='employee-name'> " +
				childSnapshot.val().role +
				" </td><td class='role'> " +
				childSnapshot.val().date +
				" </td><td class='date'> " +
				childSnapshot.val().rate +
				" </td></tr>"
		);

		// Handle the errors
	},
	function (errorObject) {
		console.log("Errors handled: " + errorObject.code);
	}
);

dataRef
	.ref()
	.orderByChild("dateAdded")
	.limitToLast(1)
	.on("child_added", function (snapshot) {
		// Change the HTML to reflect
		$("#employee-name").text(snapshot.val().employee);
		$("#role").text(snapshot.val().role);
		$("#date").text(snapshot.val().date);
		$("#rate").text(snapshot.val().rate);
	});
