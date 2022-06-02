var myCountrySelector = document.querySelector(".farhan");
var allData = [];
var allTheCountryNames = [];
var listOfTheCountries = [];
var $dataSource = "https://raw.githubusercontent.com/farhankhan34/DECO3100A3/main/owid-energy-data_with_graphs-brazil-norway.csv";

    
//console.log("ALERT");

// get all the values from the csv given the column heading (key)
function unpack(rows, key) {
    return rows.map(function (row) {
      return row[key];
    });
  }

function main(data){

    allData = data;
    var defaultCountry = 'Brazil';
  
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
    assignOptions(listOfTheCountries, myCountrySelector,defaultCountry);

    // call the make plot function using the global allData variable, and a default country
    processHistoricEnergyConsumptionData(defaultCountry);
    process2020EnergyConsumptionData(defaultCountry);
    

    
}

function makePiePlot() {
  Plotly.d3.csv($dataSource,function(data){ main(data); } );
}; 




function assignOptions(textArray, selector,selectedCountry) {
  for (var i = 0; i < textArray.length; i++) {
    var currentOption = document.createElement("option");
    currentOption.text = textArray[i];
    if(selectedCountry == textArray[i]) currentOption.setAttribute ("selected", true);
    selector.appendChild(currentOption);
  }
}

// Add the event listener for when the user selects a different country 
myCountrySelector.addEventListener("change", updateCountry, false);

function updateCountry() {
    processHistoricEnergyConsumptionData(myCountrySelector.value);
    process2020EnergyConsumptionData(myCountrySelector.value);
}


 function process2020EnergyConsumptionData($selectedCountry) {

    $controlId = 'pie-chart-2020'
 //console.log(allData);
  var labels =[] , values = [];

  for (var i = 0; i < allData.length; i++) {
    row = allData[i];
   // console.log(row['country']);
  //  console.log('Selected country ->' + $selectedCountry);
  //
   if (row['country'] == $selectedCountry && row['year'] == 2020 ) {
    labels.push( 'Renewable consumption' );
    values.push( row['renewables_consumption'] );   
    labels.push( 'Non-Renewable consumption' );
    values.push( row['primary_energy_consumption'] - row['renewables_consumption']); 

   }
     
  }
  //console.log( 'X',labels, 'Y',values);
  drawPiePlot(labels, values, $controlId);
 }

 function processHistoricEnergyConsumptionData($selectedCountry) {

    $controlId = 'pie-chart-history'
 //console.log(allData);
  var labels =[] , values = [];

  var sample_count = 0;
  var renewables_consumption = 0;
  var non_renewables_consumption = 0;





  for (var i = 0; i < allData.length; i++) {
    row = allData[i];
    //console.log(row['country']);
   // console.log('Selected country ->' + $selectedCountry);

  

  //
   if (row['country'] == $selectedCountry && row['year'] >= 1965 && row['year'] < 2020 ) {
    sample_count++;
    // Doing the sum  
    
    renewables_consumption =+ parseFloat( row['renewables_consumption']) ;       
    non_renewables_consumption =+ (parseFloat(row['primary_energy_consumption']) -parseFloat( row['renewables_consumption'])); 

   }
     
   

  }

  // Do the average and set for pie graph
  labels.push( 'Renewable consumption' );
  values.push(renewables_consumption/sample_count);
  labels.push( 'Non-Renewable consumption' );
  values.push(non_renewables_consumption/sample_count);

  console.log( 'X',labels, 'Y',values);
  drawPiePlot(labels, values, $controlId);
 }

 function drawPiePlot( $labels, $values , $pControlId){

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



   Plotly.newPlot($pControlId, pieData, layout);
 };

 makePiePlot();
