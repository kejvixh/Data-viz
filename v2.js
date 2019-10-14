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
  	 var  URL = 'https://docs.google.com/spreadsheets/d/1q3YGbDpqwB2u8YPL6qabxUaLGeg78gkY1yAsiOn9ip0/gviz/tq?gid=0';
    var   query = 'select A, B,C,D';
    GetDataFromSheet(URL, query, handleSalesByRegion);
    // Everything is loaded. Assemble your dashboard...
  }
  function handleSalesByRegion(response) {

    var data = response.getDataTable();
    var view = new google.visualization.DataView(data);
    
    // add a new column for the tooltip
   var container = new google.visualization.Dashboard(document.getElementById('dashboard_div'));

    var salesRegionControl = new google.visualization.ControlWrapper({
        controlType: 'CategoryFilter',
        containerId: 'filter_div',
        options: {
            filterColumnIndex: 0,
            ui: {
                selectedValuesLayout: 'belowStacked',
                label: '',
                caption: 'Choose type of media',
                allowNone: false
            },
        },
        
    });

    var chart = new google.visualization.ChartWrapper({
        chartType: 'ColumnChart',
        containerId: 'chart_div',
        options: {
            height: 400,
            animation:{
            	
            	duration:1000,
            	easing: 'inAndOut',
            },
            title: 'Viewership vs type of media',
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
    
    
   

  
    
