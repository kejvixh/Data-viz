// Load the Visualization API and the controls package.
  // Packages for all the other charts you need will be loaded
  // automatically by the system.
  google.charts.load('current', {'packages':['corechart', 'controls']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawDashboard);
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

  function drawDashboard() {
  	 var  URL = 'https://docs.google.com/spreadsheets/d/1cfwD3DdYbz8S54750sQwEwiZ42ESCfBBSAA-BPevO7s/gviz/tq?gid=0';
    var   query = 'select A, B, C';
    GetDataFromSheet(URL, query, handleSalesByRegion);
    // Everything is loaded. Assemble your dashboard...
  }
  function handleSalesByRegion(response) {

    var data = response.getDataTable();
    var view = new google.visualization.DataView(data);
    

     var event = data.getDistinctValues(0);

    // get list of sales regions
    var articles = data.getDistinctValues(1);
var chartData = new google.visualization.DataTable();
    chartData.addColumn({
        type: 'string',
        label: 'event'
    });
    for (col = 0; col < articles.length; col++) {
        chartData.addColumn({
            type: 'number',
            label: articles[col]
        });
    }

    // and populate
    for (row = 0; row < event.length; row++) {
        chartData.addRow();
        chartData.setValue(row, 0, event[row]);

        for (col = 0; col < articles.length; col++) {

            // find the number of sales for this combination of model + region by filtering
            var rowInfo = data.getFilteredRows([
                {
                    column: 1,
                    value: articles[col]
                },
                {
                    column: 0,
                    value: event[row]
                }
            ]);

            
        }
    }
    // add a new column for the tooltip
   var container = new google.visualization.Dashboard(document.getElementById('dashboard_div'));

    var salesRegionControl = new google.visualization.ControlWrapper({
        controlType: 'CategoryFilter',
        containerId: 'filter_div',
        options: {
            filterColumnIndex: 2,
            ui: {
                selectedValuesLayout: 'belowStacked',
                label: '',
                caption: 'Choose article',
                allowNone: false
            },
state: {
            selectedValues: articles
        }
            
        },
        
    });

    var chart = new google.visualization.ChartWrapper({
        chartType: 'PieChart',
        containerId: 'chart_div',
        options: {
            height: 400,
            animation:{
            	"startup": false,
            	duration:1000,
            	easing: 'inAndOut',
            },
            vAxis: {
                minValue: 0,
                format: 'decimal'
            },
            title: 'No# of titles per Event',
            titleFontSize: 30,
            legend: { position: 'top', maxLines: 3 },
            chartArea: { left: '10%', width: '85%' }
        }
    });

    container.bind(salesRegionControl, chart);
    container.draw(view);
}


   
       // use just the date, the total, and our custom tooltip
    
    // use the hidden divTooltipChart to draw the pie chart for each row/date 
    