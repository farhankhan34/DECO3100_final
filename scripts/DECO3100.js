var myCountrySelector = document.querySelector(".farhan");
var allData = [];
var allTheCountryNames = [];
var listOfTheCountries = [];
var pieData = [];
var lineData = [];
var pieChartColors = [
  ['34E89E','D9D9D9'],
  ['34E89E', 'D9D9D9']
];
var controlID = 'pie-chart-container';
var $dataSourceEnergyUse = "https://raw.githubusercontent.com/farhankhan34/DECO3100A3/main/owid-energy-data_with_graphs-brazil-norway.csv";

var config = {
  responsive: true,
  scrollZoom: false,
  displayModeBar: false,
};
    
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
   processHistoricEnergyConsumptionDataForLineGraph(defaultCountry);

   drawPiePlot();
   showBrazil();
   drawLinePlot();
    
}

function makePiePlot() {
  Plotly.d3.csv($dataSourceEnergyUse,function(data){ main(data); } );
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
  processHistoricEnergyConsumptionDataForLineGraph(myCountrySelector.value);
  
  drawPiePlot();

  if (myCountrySelector.value == 'Brazil') {
    showBrazil();
  } else {
    showNorway();
  }

  drawLinePlot();
}

function showBrazil() {
  /*
  document.getElementById('brazil-vis-comment').removeAttribute('class', 'hide');
  document.getElementById('norway-vis-comment').setAttribute('class', 'hide');
  document.getElementById('brazil2-vis-comment').removeAttribute('class', 'hide');
  document.getElementById('norway2-vis-comment').setAttribute('class', 'hide');
  */

  const brazils = document.querySelectorAll('[data-id="brazil"]');
  brazils.forEach(function(item) {    
    item.removeAttribute('class', 'hide');
  });
  const norways = document.querySelectorAll('[data-id="norway"]')
  norways.forEach(function(item) {    
    item.setAttribute('class', 'hide');
  });
}

function showNorway() {
  /*
  document.getElementById('norway-vis-comment').removeAttribute('class', 'hide');
  document.getElementById('brazil-vis-comment').setAttribute('class', 'hide');
  document.getElementById('norway2-vis-comment').removeAttribute('class', 'hide');
  document.getElementById('brazil2-vis-comment').setAttribute('class', 'hide');
  */
 

  const brazils = document.querySelectorAll('[data-id="brazil"]');
  brazils.forEach(function(item) {    
    item.setAttribute('class', 'hide');
  });
  const norways = document.querySelectorAll('[data-id="norway"]')
  norways.forEach(function(item) {    
    item.removeAttribute('class', 'hide');
  });
  

}


 function process2020EnergyConsumptionData($selectedCountry) {

  //  $controlId = 'pie-chart-2020'
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
  //drawPiePlot(labels, values, $controlId);

  var latest_data = {
    showlegend: true, 
    values: values,
    labels: labels,
    type: "pie",
    name: '2020 Data',
    textinfo: "percent",
    insidetextorientation: "radial",
    marker: {
     colors: pieChartColors[1]
   },
    domain: {
     row: 0,
     column: 1
   },
   title: {
    text:'2020 Data',
    font: {     
      size: 20
    },    
    x: 0.05,
    y:0,
  },
  };

  pieData.push(latest_data);

 }

 function processHistoricEnergyConsumptionData($selectedCountry) {

  //  $controlId = 'pie-chart-history'
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
      if (row['country'] == $selectedCountry && parseInt(row['year']) >= 1965 && parseInt(row['year']) < 2020 ) {
        if(parseFloat( row['renewables_consumption'])> 0 &&  parseFloat(row['primary_energy_consumption']) > 0){
          sample_count++;
        // Doing the sum  
        
          renewables_consumption =+ parseFloat( row['renewables_consumption']) ;       
          non_renewables_consumption =+ (parseFloat(row['primary_energy_consumption']) -parseFloat( row['renewables_consumption'])); 
        }  
      }
  }
  // Do the average and set for pie graph
  labels.push( 'Renewable Consumption (1965 - 2020)' );
  values.push(renewables_consumption/sample_count);
  labels.push( 'Non-Renewable Consumption (1965 - 2020)' );
  values.push(non_renewables_consumption/sample_count);

  //console.log( 'X',labels, 'Y',values);
  //drawPiePlot(labels, values, $controlId);
 
 var historic_data = {
    showlegend: true,
    values: values,
    labels: labels,
    type: "pie",
    name: 'Historical Data',
    textinfo: "percent",
    insidetextorientation: "radial",
    marker: {
     colors: pieChartColors[0]
   },
    domain: {
     row: 0,
     column: 0
   },
   title: {
    text:'Historical Data',
    font: {      
      size: 20,     
    } 
  },
  };

  pieData.push(historic_data);
 }


 function processHistoricEnergyConsumptionDataForLineGraph($selectedCountry) {

  
  var years =[] , primary_values = [], renewable_values = [];







  for (var i = 0; i < allData.length; i++) {
    if(  allData[i]['country'] == $selectedCountry && allData[i]['year'] > 1965){
       years.push(  allData[i]['year'] );
       primary_values.push(allData[i]['primary_energy_consumption']);    
       renewable_values.push(allData[i]['renewables_consumption']);    
    }
  }
  // Do the average and set for pie graph
 

  //console.log( 'X',labels, 'Y',values);
  //drawPiePlot(labels, values, $controlId);
 
 var historic_data = [
   {
      y: primary_values,
      x: years,
      type: "scatter",
      mode: 'lines',
      name: 'Primary Consumption',
      line: {
        color: 'rgb(255, 128, 128)',
        width: 3
      }
   }
   ,
   {
      y: renewable_values,
      x: years,
      type: "scatter",
      mode: 'lines',
      name: 'Renewable Consumption',
      line: {
        color: 'rgb(128, 255, 128)',
        width: 3
      }
   }
  ];

  lineData = historic_data;
 }

 function drawPiePlot(){




  var layout = {   
    margin: {
      l: 50,
      r: 150,
      b: 50,
      t: 50,
      pad: 40
    },
    grid: {rows: 1, columns: 2},
    legend: {
      x: 0.4,
      y: -0.3
    },


   
  };


   Plotly.newPlot(controlID, pieData, layout, config);
 };

 function drawLinePlot(){

  var layout = {
    
    margin: {
      l: 150,
      r: 150,
      b: 50,
      t: 50,
      pad: 40
    },
    legend: {
      x: 0.4,
      y: -0.5
    },
  
  };


   Plotly.newPlot('line-chart-container', lineData, layout, config);
 };

 makePiePlot();
