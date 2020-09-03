// Create a variable to refer to data.js
var table_data = data;

// Use the map function to create a new array with all of the item values from the dataset.
// Call the createArrays function to retreive options to display on the dropdown for users to select from.
var date = table_data.map(dates => dates.datetime);
createArrays(date, "#date");

var country = table_data.map(countries => countries.country).sort();
createArrays(country, "#country");

var state = table_data.map(states => states.state).sort();
createArrays(state, "#state");

var city = table_data.map(cities => cities.city).sort();
createArrays(city, "#city");

var shape = table_data.map(shapes => shapes.shape).sort();
createArrays(shape, "#shape");

// Select the button ID
// Select the form where the user enters the date
var filter_button = d3.select("#filter-btn");
var dateSelect = d3.select("#date");
var countrySelect = d3.select("#country");
var stateSelect = d3.select("#state");
var citySelect = d3.select("#city");
var shapeSelect = d3.select("#shape");

// Create event handlers for the user input and button click
filter_button.on("click", searchData);
dateSelect.on("submit", searchData);
countrySelect.on("submit", searchState);
stateSelect.on("submit", searchState);
citySelect.on("submit", searchData);
shapeSelect.on("submit", searchState);

/* 
 *  Find only the unique values and create an array of unique values.
 *  Select the selection dropdown where the options will be populated.
 *  Use the forEach function to loop through each unique value and create a dropdown option for it.
 */
function createArrays(value, id) {
    var unique = Array.from(new Set(value));
    var options = d3.select(`${id}`);
    unique.forEach(item => options.append("option").text(`${item}`));
}

// Create a function to handle the events and return the correct data
function searchData() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element where the user enters the search parameters and get the raw HTML nodes
    var date_element = d3.select("#date");
    var country_element = d3.select("#country");
    var state_element = d3.select("#state");
    var city_element = d3.select("#city");
    var shape_element = d3.select("#shape");

    // Get the value property of the input element (the search parameters the user entered)
    var datetime = date_element.property("value");
    var country = country_element.property("value");
    var state = state_element.property("value");
    var city = city_element.property("value");
    var shape = shape_element.property("value");

    var check = [{ "datetime": datetime, "country": country, "state": state, "city": city, "shape": shape }]
    console.log(check)
    check.forEach(items => {
        Object.entries(items).forEach(([key, value]) => {
            if (value !== "") {
                var searchKey = key;
                var searchVal = value;
                if (searchKey == "datetime") {
                    var filter_date = table_data.filter(data => data.datetime === searchVal);
                    returnData(filter_date);
                }
                if (searchKey == "country") {
                    var filter_country = table_data.filter(data => data.country === searchVal);
                    returnData(filter_country);
                }

                if (searchKey == "state") {
                    var filter_state = table_data.filter(data => data.state === searchVal);
                    returnData(filter_state);
                }

                if (searchKey == "city") {
                    var filter_city = table_data.filter(data => data.city === searchVal);
                    returnData(filter_city);
                }

                if (searchKey == "shape") {
                    var filter_shape = table_data.filter(data => data.shape === searchVal);
                    returnData(filter_shape);
                }

            }
        })
    })

    // console.log(lol);




    // data.forEach(sighting => {
    //     var row = tbody.append("tr");
    //     Object.entries(sighting).forEach(([key, value]) => {
    //         var info = row.append("td");
    //         info.text(value);
    //     });
    // });

    // Check to see that the correct value is stored (used for testing, commented out)
    // console.log(date_value)

    // if (date_value == "Click to Select") {
    //     var filtered_country = table_data.filter(data => data.country === country_value);
    //     var filtered_state = filtered_country.filter(data => data.state === state_value);
    //     var filtered_city = filtered_state.filter(data => data.city === city_value);
    //     var filtered_shape = filtered_city.filter(data => data.shape === shape_value);
    //     returnData(filtered_shape);
    // }
    // else {
    //     var filtered_date = table_data.filter(data => data.datetime === date_value);
    //     returnData(filtered_date)
    // };

    // if (date_value == "Click to Select" && country_value == "Click to Select") {
    //     var filtered_state = table_data.filter(data => data.state === state_value);
    //     var filtered_city = filtered_state.filter(data => data.city === city_value);
    //     var filtered_shape = filtered_city.filter(data => data.shape === shape_value);
    //     returnData(filtered_shape);
    // }
    // else if (date_value == "Click to Select" && state_value == "Click to Select") {
    //     var filtered_country = table_data.filter(data => data.country === country_value);
    //     var filtered_city = filtered_country.filter(data => data.city === city_value);
    //     var filtered_shape = filtered_city.filter(data => data.shape === shape_value);
    //     returnData(filtered_shape);
    // }
    // else if (date_value == "Click to Select" && city_value == "Click to Select") {
    //     var filtered_country = table_data.filter(data => data.country === country_value);
    //     var filtered_state = filtered_country.filter(data => data.state === state_value);
    //     var filtered_shape = filtered_state.filter(data => data.shape === shape_value);
    //     returnData(filtered_shape);
    // }
    // else if (date_value == "Click to Select" && shape_value == "Click to Select") {
    //     var filtered_country = table_data.filter(data => data.country === country_value);
    //     var filtered_state = filtered_country.filter(data => data.state === state_value);
    //     var filtered_city = filtered_state.filter(data => data.city === city_value);
    //     returnData(filtered_city);
    // };

    // if (date_value == "Click to Select" && country_value == "Click to Select" && state_value == "Click to Select") {
    //     var filtered_city = table_data.filter(data => data.city === city_value);
    //     var filtered_shape = filtered_city.filter(data => data.shape === shape_value);
    //     returnData(filtered_shape);
    // }
    // else if (date_value == "Click to Select" && country_value == "Click to Select" && city_value == "Click to Select") {
    //     var filtered_state = table_data.filter(data => data.state === state_value);
    //     var filtered_shape = filtered_state.filter(data => data.shape === shape_value);
    //     returnData(filtered_shape);
    // }
    // else if (date_value == "Click to Select" && country_value == "Click to Select" && shape_value == "Click to Select") {
    //     var filtered_state = table_data.filter(data => data.state === state_value);
    //     var filtered_city = filtered_state.filter(data => data.city === city_value);
    //     returnData(filtered_city);
    // }
    // else if (date_value == "Click to Select" && state_value == "Click to Select" && city_value == "Click to Select") {
    //     var filtered_country = table_data.filter(data => data.country === country_value);
    //     var filtered_shape = filtered_country.filter(data => data.shape === shape_value);
    //     returnData(filtered_shape);
    // }
    // else if (date_value == "Click to Select" && state_value == "Click to Select" && shape_value == "Click to Select") {
    //     var filtered_country = table_data.filter(data => data.country === country_value);
    //     var filtered_city = filtered_country.filter(data => data.city === city_value);
    //     returnData(filtered_city);
    // }
    // else if (date_value == "Click to Select" && city_value == "Click to Select" && shape_value == "Click to Select") {
    //     var filtered_country = table_data.filter(data => data.country === country_value);
    //     var filtered_state = filtered_country.filter(data => data.state === state_value);
    //     returnData(filtered_state);
    // };

    // if (date_value == "Click to Select" && country_value == "Click to Select" && state_value == "Click to Select" && city_value == "Click to Select") {
    //     var filtered_shape = table_data.filter(data => data.shape === shape_value);
    //     returnData(filtered_shape);
    // }
    // else if (date_value == "Click to Select" && country_value == "Click to Select" && state_value == "Click to Select" && shape_value == "Click to Select") {
    //     var filtered_city = table_data.filter(data => data.city === city_value);
    //     returnData(filtered_city);
    // }
    // else if (date_value == "Click to Select" && country_value == "Click to Select" && city_value == "Click to Select" && shape_value == "Click to Select") {
    //     var filtered_state = table_data.filter(data => data.state === state_value);
    //     returnData(filtered_state);
    // }
    // else if (date_value == "Click to Select" && state_value == "Click to Select" && city_value == "Click to Select" && shape_value == "Click to Select") {
    //     var filtered_country = table_data.filter(data => data.country === country_value);
    //     returnData(filtered_country);
    // }
    // else if (shape_value == "Click to Select" && country_value == "Click to Select" && city_value == "Click to Select" && shape_value == "Click to Select") {
    //     var filtered_date = table_data.filter(data => data.date === date_value);
    //     returnData(filtered_date);
    // };

    // if (date_value == "Click to Select" && country_value == "Click to Select" && state_value == "Click to Select" && city_value == "Click to Select" && shape_value == "Click to Select") {
    // }
    // else {
    //     var filtered_date = table_data.filter(data => data.datetime === date_value);
    //     var filtered_country = filtered_date.filter(data => data.country === country_value);
    //     var filtered_state = filtered_country.filter(data => data.state === state_value);
    //     var filtered_city = filtered_state.filter(data => data.city === city_value);
    //     var filtered_shape = filtered_city.filter(data => data.shape === shape_value);
    //     returnData(filtered_shape);
    // };

    // Filter the dataset to return the results for the date selected
    // if (date_value.length > 0) {
    //     var filtered_date = table_data.filter(data => data.datetime === date_value);
    //     returnData(filtered_date);
    // }

    // if (date_value.length > 0) {
    //     var filtered_date = table_data.filter(data => data.datetime === date_value);
    //     returnData(filtered_date);
    // }

    // var filtered_country = filtered_date.filter(data => data.country === country_value);
    // returnData(filtered_country);
    // var filtered_state = filtered_country.filter(data => data.state === state_value);
    // returnData(filtered_state);
    // var filtered_city = filtered_state.filter(data => data.city === city_value);
    // returnData(filtered_city);
    // var filtered_shape = filtered_city.filter(data => data.shape === shape_value);
    // console.log(filtered_date);
    // returnData(filtered_shape);
}

function returnData(data) {
    // Select the table body by ID, where table rows will be created for each element
    var tbody = d3.select("tbody");

    // Remove any children elements from the table
    tbody.html("");

    // Append each element in a new table data row
    data.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var info = row.append("td");
            info.text(value);
        });
    });
}

function searchState() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element where the user enters the date and get the raw HTML node
    var date_element = d3.select("#state");

    // Get the value property of the input element (the date the user entered)
    var date_value = date_element.property("value");

    // Check to see that the correct value is stored (used for testing, commented out)
    console.log(date_value)

    // Filter the dataset to return the results for the date selected
    var filtered_date = table_data.filter(data => data.state === date_value);

    var state = filtered_date.map(states => states.date);
    var unique_states = Array.from(new Set(state)).sort();
    var state_options = d3.select("#date");
    unique_states.forEach(states => state_options.append("option").text(`${states}`));

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
    sessionStorage.setItem("states", state_options);
    sessionStorage.setItem("date", date_value);
    //location.reload();

}