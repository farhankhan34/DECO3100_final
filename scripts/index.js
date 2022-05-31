const plotDiv = document.getElementById('myPlot');

var plotData = {
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]
}

Plotly.newPlot(plotDiv, [plotData]);