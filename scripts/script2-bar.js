function makePiePlot() {
    Plotly.d3.csv("https://raw.githubusercontent.com/farhankhan34/DECO3100A3/main/sample-data2.csv", function(data){ processBarData(data) } );

  
      
  }; 



  function processBarData(allRows) {
     
    console.log(allRows);
    var x = [], y = [];

    for (var i = 0; i < allRows.length; i++) {
    row = allRows[i];
    x.push (row['x']);
    y.push (row['y']);

    }

    console.log( 'X',x, 'Y',y);
    drawBarPlot(x,y);

  }

  function drawBarPlot($x,$y) {

    var barData = [
        {
            x: $x,
            y: $y,
            type: 'bar',
            orientation: 'v'
        }
    ];

    Plotly.newPlot('myBar', barData);

  };

makePiePlot();