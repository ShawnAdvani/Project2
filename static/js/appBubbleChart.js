d3.json("/USlikes").then(function (usdata) {
  d3.json("/GBlikes").then(function (gbdata) {

    console.log(usdata)
    console.log(gbdata)

    var GBobjs = Object.values(gbdata);

    labels = Object.keys(gbdata)

    var GBstorage = [];
    for(var i = 0; i < GBobjs.length; i++)
        { 
          var GBjson = {x: GBobjs[i].likes/1000, y: GBobjs[i].dislikes/1000, r:(GBobjs[i].likes/GBobjs[i].dislikes)};
          GBstorage.push(GBjson) 
        }
    console.log(GBstorage)

    
    var USobjs = Object.values(usdata);

    var USstorage = [];
    for(var i = 0; i < USobjs.length; i++)
        { 
          var USjson = {x: USobjs[i].likes/1000, y: USobjs[i].dislikes/1000, r:(USobjs[i].likes/USobjs[i].dislikes)};
          USstorage.push(USjson) 
        }
    console.log(USstorage)


    // var objs = Object.values(usdata);
    // var usLikes = [];
    // for (var i = 0; i < objs.length; i++) {
    //     usLikes.push(objs[i].likes);
    // }
    // console.log(usLikes)

    new Chart(document.getElementById("bubble-chart"), {
      type: 'bubble',
      data: {
        // labels: labels,
        datasets: [
          {
            label: "GB",
            backgroundColor: "rgb(18, 18, 241, 0.3) ",
            borderColor: "black",
            data: GBstorage 
          }, 
          {
            label: "US",
            backgroundColor: "rgb(241, 18, 18, 0.3)",
            borderColor: "black",
            data: USstorage
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Likes vs. Dislikes'
        }, scales: {
          yAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Dislikes"
            },
            ticks: {
              max: 1400,
              min: 0,
            }
          }],
          xAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Likes"
            },
            ticks: {
              max: 60000,
              min: 0,
            }
          }],
          plugins: {
            colorschemes: {
              scheme: 'brewer.Paired12'
            }
          }
        }
      }
    });
  });
});