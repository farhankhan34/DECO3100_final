var myCountrySelector = document.querySelector(".farhan");
var allData = [];
var allTheCountryNames = [];
var listOfTheCountries = [];
var $dataSource = "https://raw.githubusercontent.com/dongasr/DECO3100/main/mortality.csv";

    
console.log("ALERT");

function main(data){

    allData = data;
  
    allTheCountryNames = unpack(allData,"country");
   // console.log('1');

    //console.log('2');

    for (var i = 0; i < allTheCountryNames.length; i++) {  
     // console.log(listOfTheCountries) ;         // for all of the countries found in csv
      if(listOfTheCountries.indexOf(allTheCountryNames[i]) === -1){
        listOfTheCountries.push(allTheCountryNames[i]);
      }
    
   }

    // Pass the country list and HTML select element to create the options
    assignOptions(listOfTheCountries, myCountrySelector);

    // call the make plot function using the global allData variable, and a default country
    processPieData(allData, "Afghanistan");
    

    
}

function makePiePlot() {
  Plotly.d3.csv($dataSource,function(data){ main(data); } );
}; 



// Remake the plot if the country option changes - based on above event listener
function updateCountry() {
  //make_plot(csvData, countrySelector.value);
  //alert(myCountrySelector.value);
  processPieData(allData, myCountrySelector.value);
}

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length; i++) {
    var currentOption = document.createElement("option");
    currentOption.text = textArray[i];
    selector.appendChild(currentOption);
  }
}

// Add the event listener for when the user selects a different country 
myCountrySelector.addEventListener("change", updateCountry, false);

function updateCountry() {
  processPieData(allData, myCountrySelector.value);
}


 function processPieData($selectedCountry) {

 console.log(allData);
  var labels =[] , values = [];

  for (var i = 0; i < allData.length; i++) {
    row = allData[i];
  
   if (row['country_iso'] == $selectedCountry) {
    labels.push( row['labels'] );
    values.push( row['values'] );   

   }
     
  }
  //console.log( 'X',labels, 'Y',values);
  drawPiePlot(labels, values);
 }

 function drawPiePlot( $labels, $values){

   var pieData = [{
     values: $values,
     labels: $labels,
     type: "pie",
     textinfo: "label+percent",
     insidetextorientation: "radial"
   }];

   var layout = [{
    height: 700,
    width: 700,
    title: "Pie Chart for Energy"
  }];



   Plotly.newPlot('myPie', pieData, layout);
 };

 makePiePlot();
/*
  var data = [{
    type: "pie",
    values: $values,
    labels: $labels,
    textinfo: "label+percent",
    insidetextorientation: "radial"
  }]
  
  
  
  
  */