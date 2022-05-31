brazil_1960 = 2233;
brazil_2020 = 2293;

function makePiePlot() {
    Plotly.d3.csv("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv", function(data){ processBarData(data) } );
      
  }; 

function processPieData(allRows) {

    console.log(allRows);
    var year =[] , values = [];
  
    for (var i = brazil_1960; i < brazil_2020; i++) {
      row = allRows[i];
      year.push( row['year'] );
      values.push( row['values'] );    
    }
    console.log( 'X',year, 'Y',values);
    drawPiePlot(year, values);
   }
  
   function drawPiePlot( $years, $values){
  
     var pieData = [{
       values: $values,
       year: $years,
       type: "pie",
       textinfo: "label+percent",
       insidetextorientation: "radial"
     }];
  
     var layout = [{
      height: 700,
      width: 700,
      title: "Renewable Energy Percentage since 1960"
    }];
  
  
  
     Plotly.newPlot('myPie', pieData, layout);
   };
  
   makePiePlot();