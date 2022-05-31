var myCountrySelector = document.querySelector(".farhan");
var allData = [];

console.log("ALERT");

function makePiePlot() {
 // Plotly.d3.csv("https://raw.githubusercontent.com/farhankhan34/DECO3100A3/main/sample-data.csv", function(data){ processPieData(data) } );
  Plotly.d3.csv("https://raw.githubusercontent.com/farhankhan34/DECO3100A3/main/database.csv", function(data){
     //processPieData(data)
     allData = data;
     } );
    
}; 



// Add the event listener for when the user selects a different country 
myCountrySelector.addEventListener("change", updateCountry, false);

// Remake the plot if the country option changes - based on above event listener
function updateCountry() {
  //make_plot(csvData, countrySelector.value);
  //alert(myCountrySelector.value);
  processPieData(myCountrySelector.value);
}


 function processPieData($selectedCountry) {

 // console.log(allData);
  var labels =[] , values = [];

  for (var i = 0; i <allData.length; i++) {
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