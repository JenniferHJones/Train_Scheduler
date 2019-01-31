$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyAS2hCzuDydxISQ5g7eM7zBOtgWbkvcVjA",
        authDomain: "jj-s-project.firebaseapp.com",
        databaseURL: "https://jj-s-project.firebaseio.com",
        projectId: "jj-s-project",
        storageBucket: "",
        messagingSenderId: "91412721795"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-employee-btn").on("click", function () {
        event.preventDefault();

        var empName = $("#employee-name-input").val().trim();
        var empRole = $("#role-input").val().trim();
        var empStartDate = $("#start-input").val().trim();
        var empRate = $("#rate-input").val().trim();
        console.log("clicked");

        database.ref().push({
            name: empName,
            role: empRole,
            startDate: empStartDate,
            rate: empRate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
    });

    database.ref().on("child_added", function (db) {
        console.log("child_added");
        var dbObj = db.val();
        // must start with this line to take your date, which is a string, and convert it to time
        var startMoment = moment(dbObj.startDate, "MM/DD/YYYY");
        // this line will calculate the difference between now and the date
        var monthCount = moment().diff(startMoment, "months");

        var totalBilled = dbObj.rate*monthCount;

        var newRow = $("<tr>");
        newRow.append($("<td>" + dbObj.name + "</td>"));
        newRow.append($("<td>" + dbObj.role + "</td>"));
        newRow.append($("<td>" + dbObj.startDate + "</td>"));
        newRow.append($("<td>" + monthCount + "</td>"));
        newRow.append($("<td>" + dbObj.rate + "</td>"));
        newRow.append($("<td>" + totalBilled + "</td>"));

        $("tbody").append(newRow);

    }, function (e) {
        alert(e)
    });


})