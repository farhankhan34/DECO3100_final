
/* An object oriented approach was taken with the CO2 dataset,
and so a class and constructor was defined. */

class CO2EmissionPlot {
    constructor($controlID){

       // Define allData array here for when we seek Brazil and Norway in the loop later
        this.allData = [];
        this.controlID = $controlID;

        this.layout = {
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

        this.config = {
            responsive: true,
            scrollZoom: false,
            displayModeBar: false,
          };
              

        
        this.dataSourceCO2Emission = "https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";
        this.makeCO2EmissionPlot = this.makeCO2EmissionPlot.bind(this);      

    }


    


    main(data){      
        this.allData = data;
        this.processCO2EmissionDataForLineGraph();
        this.drawLinePlot();    
    }   




// Pushing data of CO2 emissions for Brazil and Norway from 1965 into the 'year' and 'co2' arrays
  processCO2EmissionDataForLineGraph() {  
    
        var years =[] , co2_brazil = [], co2_norway = [];


        for (var i = 0; i < this.allData.length; i++) {
            if(  this.allData[i]['year'] > 1965){
               
              if(  this.allData[i]['country'] == 'Brazil' ){
                years.push(  this.allData[i]['year'] );
                co2_brazil.push(this.allData[i]['co2']);   
              }
            
              else if(  this.allData[i]['country'] == 'Norway' ){
                years.push(  this.allData[i]['year'] );
                co2_norway.push(this.allData[i]['co2']);   
              }             
            }
        }

        // using the new arrays into the line charts
        
        
        this.plot_data = [
        {
            y: co2_brazil,
            x: years,
            type: "scatter",
            mode: 'lines',
            name: 'Brazil CO2 Emission',
            line: {
                color: '#0F3443',
                width: 3
            }
        }
        ,
        {
            y: co2_norway,
            x: years,
            type: "scatter",
            mode: 'lines',
            name: 'Norway CO2 Emission',
            line: {
                color: '#34E89E',
                width: 3
            }
        }
        ];

       
 }



  drawLinePlot(){
    Plotly.newPlot(this.controlID, this.plot_data, this.layout, this.config);
 };

  makeCO2EmissionPlot() {
    let callbackObject = this;
    Plotly.d3.csv(this.dataSourceCO2Emission,function(data){ callbackObject.main(data); } );
  }; 
}

let co2EmissionPlot = new CO2EmissionPlot('co2-line-chart-container');
co2EmissionPlot.makeCO2EmissionPlot();

