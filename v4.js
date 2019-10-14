// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(retrieveData);

function retrieveData() {
    // sales by model
    var URL = 'https://docs.google.com/spreadsheets/d/18cvnTuh_lIR-Lafca5ZO6EEBrJEKdcpYVSlw5xJ3V8Q/gviz/tq?select%20A%2C%20B%2C%20Desc%20B';
    var query = 'select A, B';
    getDataFromSheet(URL, query, handleSalesByModelResponse);

}

function handleSalesByModelResponse(response) {
    var salesByModelData = response.getDataTable();
    
     

    var options = {
        title: 'No. of articles by AMIS',
        titleFontSize: 30,
        height: 550,
        chartArea: {width: '80%'},
        tooltip: {isHTML: true},

 bar: {groupWidth: '90%'},
 hAxis:{
    title: 'AMIS'
 },
 
  
        legend: { position: 'top', maxLines: 3 },
        
    };

    var salesByModelChart = new google.visualization.ColumnChart(document.getElementById('divSalesByModel'));
    salesByModelChart.draw(salesByModelData, options);

  
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
