d3.json("/UStime").then(function (usdata) {
  d3.json("/GBtime").then(function (gbdata) {

    console.log(usdata)
    console.log(gbdata)
    var objs = Object.values(gbdata);
    var gbviews = [];
    for (var i = 0; i < objs.length; i++) {
        gbviews.push(objs[i].tot_views);
    }
    console.log(gbviews)
    var objs = Object.values(usdata);
    var usviews = [];
    for (var i = 0; i < objs.length; i++) {
        usviews.push(objs[i].tot_views);
    }
    console.log(usviews)
    new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        datasets: [{
          data: usviews,
          label: "US",
          borderColor: "red",
          fill: false
        }, {
          data: gbviews,
          label: "GB",
          borderColor: "blue",
          fill: false
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Which country produces the most viewed videos'
        }
      }
    });

  });
});