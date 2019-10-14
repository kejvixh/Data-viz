// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(retrieveData);


function GetDataFromSheet(URL, queryString, callback) {
    var query = new google.visualization.Query(URL);
    query.setQuery(queryString);
    query.send(gotResponse);

    function gotResponse(response) {
        if (response.isError()) {
            console.log(response.getReasons());
            alert('Error in query: ' + response.getMessage() + " " + response.getDetailedMessage());
            return;
        }
        if (response.hasWarning()) {
            console.log(response.getReasons());
            alert('Warning from query: ' + response.getMessage() + " " + response.getDetailedMessage());
            return;
        }
        callback(response);
    }
}

function retrieveData() {
    // sales by model
    var  URL = 'https://docs.google.com/spreadsheets/d/1s4NnSazb1f3lD-IACvMfATIc1tWU6dDUGSRxPc0enF4/gviz/tq?gid=0';
    var   query = 'select A, B';
    GetDataFromSheet(URL, query, handleSalesByRegion);
}

function handleSalesByRegion(response) {

    var data = response.getDataTable();
    
    // add a new column for the tooltip
   ;

    var view = new google.visualization.DataView(data);
       // use just the date, the total, and our custom tooltip
    
    // use the hidden divTooltipChart to draw the pie chart for each row/date 
    
    // chart options
    var options = {
        title: 'Overall Average of Media impact score by Org',
        titleFontSize: 30,
        height: 350,
        legend: { position: 'top', maxLines: 3 },
        vAxis: { 
            //viewWindow: { min: 0},
            format: '~'
        },
        chartArea: { left: '15%', width: '85%'},
        tooltip: { 
            isHtml: true,
            ignoreBounds: false
         }
    };
    
    var chart = new google.visualization.BarChart(document.getElementById('divSalesByRegion'));
    chart.draw(view, options);

   

  
    }




function getDataFromSheet(URL, queryString, callback) {
    var query = new google.visualization.Query(URL);
    query.setQuery(queryString);
    query.send(gotResponse);
    function gotResponse(response) {
        if (response.isError()) {
            console.log(response.getReasons());
            alert('Error in query: ' + response.getMessage() + " " + response.getDetailedMessage());
            return;
        }
        if (response.hasWarning()) {
            console.log(response.getReasons());
            alert('Warning from query: ' + response.getMessage() + " " + response.getDetailedMessage());
            return;
        }
        callback(response);
    }
}
