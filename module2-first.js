// Load the Visualization API and the corechart package, and call the callback when it's ready
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(retrieveData);

function retrieveData() {
    var URL = 'https://docs.google.com/spreadsheets/d/165Ij3Os2Xy7331nwvSFwPALjVBOdIXcWO8_sRRmXNmY/gviz/tq?gid=0';
    var query = 'SELECT A, C';  // letters must be capitalized
    getDataFromSheet(URL, query, handleOverallIncomeResponse);

}

function handleOverallIncomeResponse(response) {
    var data = response.getDataTable();

    // add a new column for the tooltip
    

   

    var view = new google.visualization.DataView(data);
    
    // use the hidden divTooltipChart to draw the pie chart for each row/date 
    var tooltipChart = new google.visualization.PieChart(document.getElementById('divTooltipChart'));

    

        // chart options
        var options = {
            title: 'Monthly viewership: Unicef Albania',
            height: 500,
            legend: { position: 'top', maxLines: 3 },
            vAxis: {
                minValue: 0,
                format: '~'
            },
            chartArea: {
                left: '10%',
                width: '88%'
            },
            tooltip: {
                isHtml: true,
                ignoreBounds: false
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('divIncomeOverTime'));
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

// Misc functions 
Number.prototype.commaSeparated = function () {
    var n = this;
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function monthName(n) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', "Jul", 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][n];
}
