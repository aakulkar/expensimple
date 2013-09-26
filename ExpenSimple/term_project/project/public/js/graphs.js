// Set a callback to run when the Google Visualization library is loaded.
google.setOnLoadCallback(function () { });

function drawPieChart(mydata) {
	// Create our data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Tag');
	data.addColumn('number', 'Money Spent');
	var arr = [];
	var i = 0;
	
	for(var key in mydata) {
		arr.push([key, mydata[key]]);
	}
	data.addRows(arr);
	var options = 
		{
			'title' : 'Filtered by period',
			 'chartArea' : 
			 	{
			 		top:"15%",
			 		width:"150%",
			 		height:"60%"
			 	},
			 'legend' :
			 	{
			 		position : 'bottom'
			 	}
		};
	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
	chart.draw(data, options);
}

function drawBarChart(mydata){
	var MonthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var currentMonth = new Date().getMonth();
	var arrData = [['Months Ago', 'Amount']];
	for(var i = 0; i < mydata.length; i++){
		var amount = 0;
		for(var j=0; j < mydata[i].length; j++){
			amount += mydata[i][j].amount;
		}
		var monthsAgo = mydata.length - i;
		arrData.push([MonthArr[(currentMonth-monthsAgo+1)], amount]);
	}
	var data = google.visualization.arrayToDataTable(arrData);
    var options = {
        title: '$ spent on selected tags',
        vAxis: {title: 'Months Ago',  titleTextStyle: {color: 'red'}},
        hAxis: {title: 'Spending in $', titleTextStyle: {color: 'blue'}},
        legend: {position: 'none'},
        seriesType: "bars"

	    };
    var chart = new google.visualization.ComboChart(document.getElementById('barChart'));
    chart.draw(data, options);
}