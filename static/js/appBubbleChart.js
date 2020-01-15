d3.json("/USlikes").then(function (usdata) {
  d3.json("/GBlikes").then(function (gbdata) {

    console.log(usdata)
    console.log(gbdata)

    var objs = Object.values(gbdata);
    
    var gbLabels = [];
    for (var i = 0; i < objs.length; i++) {
      gbLabels.push(objs[i].category);
    }
    console.log(gbLabels)

    // var gbLikes = [];
    // for (var i = 0; i < objs.length; i++) {
    //     gbLikes.push(objs[i].likes);
    // }
    // console.log(gbLikes)

    // var gbViews = [];
    // for (var i = 0; i < objs.length; i++) {
    //     gbViews.push(objs[i].views);
    // }
    // console.log(gbViews)

    var storage = [];
    for(var i = 0; i < objs.length; i++)
        { 
          var GBjson = {x: objs[i].views, y: objs[i].likes, r:((objs[i].views/objs[i].likes)/10)};
          storage.push(GBjson) 
        }
    console.log(storage)

    var objs = Object.values(usdata);
    var usLikes = [];
    for (var i = 0; i < objs.length; i++) {
        usLikes.push(objs[i].likes);
    }
    console.log(usLikes)

    new Chart(document.getElementById("bubble-chart"), {
      type: 'bubble',
      data: {
        labels: gbLabels,
        datasets: [
          {
            label: gbLabels,
            backgroundColor: "rgba(255,221,50,0.2)",
            borderColor: "rgba(255,221,50,1)",
            data: storage
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Views vs. Likes'
        }, scales: {
          yAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Likes"
            }
          }],
          xAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Views"
            }
          }]
        }
      }
    });
  });
});