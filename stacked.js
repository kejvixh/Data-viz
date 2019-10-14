// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(retrieveData);

function retrieveData() {
    // sales by model
    var URL = 'https://docs.google.com/spreadsheets/d/1msVyG262_FNF43n2Z5zOp5tkbFhqo21s9ErIZRDKvGY/gviz/tq?gid=0';
    var query = 'select A,  C, D';
    getDataFromSheet(URL, query, handleSalesByModelResponse);

}

function handleSalesByModelResponse(response) {
    var salesByModelData = response.getDataTable();

    var options = {
        title: 'Organizations & Type of Media',
        titleFontSize: 30,
        height: 550,
        chartArea: {width: '50%'},

 bar: {groupWidth: '95%'},
 
  
        legend: { position: 'top', maxLines: 3 },
        isStacked: true
    };

    var salesByModelChart = new google.visualization.BarChart(document.getElementById('divSalesByModel'));
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
