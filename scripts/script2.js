/*function makeplot() {
  Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/2014_apple_stock.csv", function(data){ processData(data) } );

};*/

function makePiePlot() {
  Plotly.d3.csv("https://raw.githubusercontent.com/farhankhan34/DECO3100A3/main/sample-data.csv", function(data){ processPieData(data) } );
    
}; 
/*
  //Process Data
  
function processData(allRows) {

  console.log(allRows);
  var x = [], y = [], standard_deviation = [];

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    x.push( row['AAPL_x'] );
    y.push( row['AAPL_y'] );
  }
  console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
  makePlotly( x, y, standard_deviation );
}

function makePlotly( x, y, standard_deviation ){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    x: x, 
    y: y
  }];

  Plotly.newPlot('myDiv', traces, 
    {title: 'Plotting CSV data from AJAX call'});
};
 // makeplot(); */

 // CSV Pie Chart

 function processPieData(allRows) {

  console.log(allRows);
  var labels =[] , values = [];

  for (var i = 0; i <allRows.length; i++) {
    row = allRows[i];
    labels.push( row['labels'] );
    values.push( row['values'] );    
  }
  console.log( 'X',labels, 'Y',values);
  makePiePlot(labels, values);
 }

 function makePiePlot( $labels, $values){
   var pieDiv = document.getElementById("pie");
   var pieData = [{
     values: $values,
     labels: $labels,
     type: pie
   }];
 }

  var data = [{
    type: "pie",
    values: $values,
    labels: $labels,
    textinfo: "label+percent",
    insidetextorientation: "radial"
  }]
  
  var layout = [{
    height: 700,
    width: 700
  }]
  
  Plotly.newPlot('myPie', data, layout)

  

    //Pie Chart

/*

    var data = [{
      type: "pie",
      values: [2, 3, 4, 4],
      labels: ["Wages", "Operating expenses", "Cost of sales", "Insurance"],
      textinfo: "label+percent",
      insidetextorientation: "radial"
    }]
    
    var layout = [{
      height: 700,
      width: 700
    }]
    
    Plotly.newPlot('myPie', data, layout) */
  