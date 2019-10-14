// Load the Visualization API and the required packages
google.charts.load('current', { 'packages': ['corechart', 'controls'] });
google.charts.setOnLoadCallback(retrieveData);

function retrieveData() {
    // get expenses and show in area chart over time            
    var URL = 'https://docs.google.com/spreadsheets/d/1XtbYOOJd9ES0cTqfo7uUlXUnjMnVHgwaRonFrA-Dz7M/gviz/tq?gid=0';
    var query = 'select A, B, D, E';
    GetDataFromSheet(URL, query, handleExpensesOverTime);
}

function handleExpensesOverTime(response) {

    var data = response.getDataTable();    

    var container = new google.visualization.Dashboard(
        document.getElementById('divExpensesOverTimeContainer'));

    var rangeControl = new google.visualization.ControlWrapper({
        controlType: 'ChartRangeFilter',
        containerId: 'divExpensesRangeSlider',
        options: {
            filterColumnIndex: 0,
            ui: {
                chartType: 'AreaChart',
                chartOptions: {
                    height: 50,
                    
                    vAxis: { minValue: 0 },
                    chartArea: { left: 100, right: 95 }
                },
            }
        }
    });

    var areaChartOptions = {
        title: 'Unicef Albania',
        titleFontSize: 30,
        height: 300,
         axisFontSize : 0,
        animation:{
                "startup": true,
                duration: 1000,
                easing: 'inAndOut',
            },
        isStacked: true,
        legend: { position: 'top', maxLines: 3 },
        vAxis: {
            textColor: '#ffffff',
            minValue: 0,
            format: 'decimal',
            FontSize : 0
        },
        chartArea: { left: '15%', width: '80%' }
    };
    
    var chart = new google.visualization.ChartWrapper({
        chartType: 'AreaChart',
        containerId: 'divExpensesOverTimeChart',
        options: areaChartOptions
    });

    container.bind(rangeControl, chart);
    container.draw(data);
}


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