
// Execute when the DOM is fully loaded
$(document).ready(function() {

    // Configure typeahead
    $("#programs").typeahead({
        highlight: false,
        minLength: 1
    },
    {
        display: function(suggestion) { return null; },
        limit: 10,
        source: search,
        templates: {
            suggestion: Handlebars.compile(
                '<div><a href="/prog_details?q={{program_name}}">{{program_name}}</a></div>'
            )
        }
    });

    $("#programs").focus();

    $('#week_menu').on('change', function(x) {

        var e = document.getElementById("week_menu");
        var week = e.options[e.selectedIndex].text; //obtain value that the select menu has
        // alert(week);
        parameters = {
            q : week
        };
        $.getJSON("/prog_details", parameters, function(data, textStatus, jqXHR) {

            var myTable = document.getElementById("program_table");

            var length = myTable.rows.length;

            for (i = 1; i < length; i++) {
                myTable.deleteRow(1);
            }

            $.each(data, function (i) {
                // Create an empty <tr> element and add it to the next position of the table:
                var row = myTable.insertRow(i + 1);

                // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);

                // Add some text to the new cells:
                //[row["day"], row["sets"], row["reps"], row["percent_max"], row["RPE"], row["week"], row["program_name"], row["exercise_name"]]
                cell1.innerHTML = data[i].day;
                cell2.innerHTML = data[i].sets;
                cell3.innerHTML = data[i].reps;
                cell4.innerHTML = data[i].percent_max + "%";
                cell5.innerHTML = data[i].RPE;
                cell6.innerHTML = data[i].exercise_name;
            });
        });
    });

    $('#settings_menu').on('change', function(x) {

        var e = document.getElementById("settings_menu");
        var setting = e.options[e.selectedIndex].text; //obtain value that the select menu has

        // Delete any list items in the table, if there were any
        $(settings_table).empty();

        switch(setting){
            case("Password"):
                $("#settings_table").append("<li><input type='text' name='password' placeholder='New password' /></li>");
                $("#settings_table").append("<li><input type='text' name='confirm_password' placeholder='Confirm password' /></li>");
                break;

            case("Email"):
                $("#settings_table").append("<li><input type='text' name='email' placeholder='New email' /></li>");
                break;

            case("Phone"):
                $("#settings_table").append("<li><input type='text' name='phone' placeholder='New phone' /></li>");
                break;

            case("Bench 1 Rep Max"):
                $("#settings_table").append("<li><input type='text' name='bench1RM' placeholder='New bench 1 rep max' /></li>");
                break;

            case("Squat 1 Rep Max"):
                $("#settings_table").append("<li><input type='text' name='squat1RM' placeholder='New squat 1 rep max' /></li>");
                break;

            case("Deadlift 1 Rep Max"):
                $("#settings_table").append("<li><input type='text' name='deadlift1RM' placeholder='New deadlift 1 rep max' /></li>");
                break;
        }
    });


});


// Search database for typeahead's suggestions
function search(query, syncResults, asyncResults)
{
    // alert(query);
    // Get places matching query (asynchronously)
    let parameters = {
        q: query
    };

    // "data" below is a JSON object returned from the callback to /search
    $.getJSON("/search_prog", parameters, function(data, textStatus, jqXHR) {
        asyncResults(data);
    });
}