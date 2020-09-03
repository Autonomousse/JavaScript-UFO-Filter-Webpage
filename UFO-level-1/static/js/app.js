// Create a variable to refer to data.js
var table_data = data;

/*  
 *  Use the map function to create a new array with all of the date values from the dataset.
 *  Find only the unique values and create an array of unique dates.
 *  Select the selection dropdown where the dates will be populated.
 *  Clear any child elements.
 *  Use the forEach function to loop through each unique date and create a dropdown option for it.
 */
var dates = table_data.map(dates => dates.datetime);
var unique_dates = Array.from(new Set(dates));
var date_options = d3.select(".custom-select");
//date_options.html("");
unique_dates.forEach(date => date_options.append("option").text(`${date}`));

// Select the button ID
// Select the form where the user enters the date
var filter_button = d3.select("#filter-btn");
var date = d3.select(".custom-select");

// Create event handlers for the user input and button click
filter_button.on("click", searchData);
date.on("submit", searchData);

// Create a function to handle the events and return the correct data
function searchData() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element where the user enters the date and get the raw HTML node
    var date_element = d3.select(".custom-select");

    // Get the value property of the input element (the date the user entered)
    var date_value = date_element.property("value");

    // Check to see that the correct value is stored (used for testing, commented out)
    // console.log(date_value)

    // Filter the dataset to return the results for the date selected
    var filtered_date = table_data.filter(data => data.datetime === date_value);

    // Select the table body by ID, where table rows will be created for each element
    var tbody = d3.select("tbody");

    // Remove any children elements from the table
    tbody.html("");

    // Append each element in a new table data row
    filtered_date.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var info = row.append("td");
            info.text(value);
        });
    });
}