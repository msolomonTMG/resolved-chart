'use strict';

Stamplay.init("resolvedchart");
var codeblock = new Stamplay.Codeblock("jira");

google.charts.load('current', {'packages':['corechart']});

codeblock.run().then(function (response) {
  let resolvedCount = 0;
  let unresolvedCount = 0;

  let issues = response.data
  console.log(issues)
  issues.forEach((issue, index) => {
    if (issue.fields.resolution) {
      resolvedCount++
    } else {
      unresolvedCount++
    }

    if (index + 1 == issues.length) {
      drawChart(resolvedCount, unresolvedCount)
    }
  })
}, function( err ){
  // error callback
  console.error(err);
});

function drawChart(resolvedCount, unresolvedCount) {
  $('#loading').hide();
  var data = google.visualization.arrayToDataTable([
    ['Issues', 'Resolved'],
    ['Resolved', resolvedCount],
    ['Unresolved', unresolvedCount]
  ]);

  var options = {
    title: 'Seeker Bugs Remaining',
    colors: ['#3c763d', '#a94442'],
    height: 1024,
    width: 1024
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart'));

  chart.draw(data, options);
}
