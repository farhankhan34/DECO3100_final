
var csvData;
var allCountryNames;
var listofCountries = [];
var countrySelector = document.querySelector(".countrydata");

Plotly.d3.csv(
  "https://raw.githubusercontent.com/dongasr/DECO3100/main/mortality.csv",
  function(csvResults) {
    csvData = csvResults;
    allCountryNames = unpack(csvData, "country");

    for (var i = 0; i < allCountryNames.length; i++) {            // for all of the countries found in csv
      if (listofCountries.indexOf(allCountryNames[i]) === -1) {   // if they are not already in the array
        listofCountries.push(allCountryNames[i]);                 // add them to the array
      }
    }
    
    // Pass the country list and HTML select element to create the options
    assignOptions(listofCountries, countrySelector);

    // call the make plot function using the global csvData variable, and a default country
    make_plot(csvData, "Afghanistan");
  }
);


// create the DOM elements for the country options for a given array and HTML select element
function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length; i++) {
    var currentOption = document.createElement("option");
    currentOption.text = textArray[i];
    selector.appendChild(currentOption);
  }
}

// Add the event listener for when the user selects a different country 
countrySelector.addEventListener("change", updateCountry, false);

// Remake the plot if the country option changes - based on above event listener
function updateCountry() {
  make_plot(csvData, countrySelector.value);
}

// get all the values from the csv given the column heading (key)
function unpack(rows, key) {
  return rows.map(function (row) {
    return row[key];
  });
}

//This stretch function is actually just the map function from p5.js
function stretch(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function make_plot(csv_data, currentCountry) {
  let country_data = csv_data.filter((d) => d.country == currentCountry); // UPDATED with currentCountry

  /*
  //To normalise our data, we need to know the minimum and maximum values
  //Math.min doesn't work with strings so we need to convert
  let mortality_data = country_data.map((d) => Number(d.mortality));
  let min_mortality = Math.min(...mortality_data);
  let max_mortality = Math.max(...mortality_data);

  //This regression library needs values stored in arrays
  //We are using the strech function to normalise our data
  let regression_data = country_data.map((d) => [
    stretch(d.year, 1950, 2017, 0, 1),
    stretch(d.mortality, min_mortality, max_mortality, 0, 1)
  ]);

  //Here is where we train our regressor, experiment with the order value
  let regression_result = regression.polynomial(regression_data, { order: 3 });

  //Now we have a trained predictor, lets actually use it!
  let extension_x = [];
  let extension_y = [];
  for (let year = 2017; year < 2030; year++) {
    //We've still got to work in the normalised scale
    let prediction = regression_result.predict(
      stretch(year, 1950, 2017, 0, 1)
    )[1];

    extension_x.push(year);
    //Make sure to un-normalise for displaying on the plot
    extension_y.push(stretch(prediction, 0, 1, min_mortality, max_mortality));
  }
  */

  let data = [
    {
      x: country_data.map((d) => d.year),
      y: country_data.map((d) => d.mortality),
      mode: "lines"
    },
    //adding our extension as a second trace
    /*
    {
      x: extension_x,
      y: extension_y,
      mode: "lines"
    } */
  ];

  Plotly.newPlot("myDiv", data);
}