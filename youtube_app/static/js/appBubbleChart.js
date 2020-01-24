d3.json("/USlikes").then(function (usdata) {
  d3.json("/GBlikes").then(function (gbdata) {

    console.log(usdata)
    console.log(gbdata)

    var GBobjs = Object.values(gbdata);

    var GBstorage = [];
    for(var i = 0; i < GBobjs.length; i++)
        { 
          var GBjson = {x: GBobjs[i].likes/1000, y: GBobjs[i].dislikes/1000, r:(GBobjs[i].likes/GBobjs[i].dislikes)};
          GBstorage.push(GBjson) 
        }
    console.log(GBstorage)

    var GBLabels = [];
    for(var i = 0; i < GBobjs.length; i++)
        { 
          GBLabels.push(gbdata[i].category);
        }
    console.log(GBLabels)


    // GBparsedata = [];
    // for (var i = 0; i < GBstorage.length; i++){
    //   GBparsedata.push({
    //     label:GBLabels[i],
    //     data:[GBstorage[i]],
    //     backgroundColor: "rgb(18, 18, 241, 0.3)",
    //     borderColor: "black"
    //   });
    // }
    // console.log(GBparsedata)

    
    var USobjs = Object.values(usdata);

    var USstorage = [];
    for(var i = 0; i < USobjs.length; i++)
        { 
          var USjson = {x: USobjs[i].likes/1000, y: USobjs[i].dislikes/1000, r:(USobjs[i].likes/USobjs[i].dislikes)};
          USstorage.push(USjson) 
        }
    console.log(USstorage)

    var Labels = [];
    for(var i = 0; i < USobjs.length; i++)
        { 
          Labels.push(usdata[i].category);
        }
    console.log(Labels)

    new Chart(document.getElementById("bubble-chart"), {
      type: 'bubble',
      data: {
        labels: Labels,
        // ["Music", "Entertainment", "Comedy", "People & Blogs","Film & Animation","Gaming","Sports","Howto & Style","News & Politics","Sci & Tech","Education","Pets & Animals","Autos & Vehicles","Travel & Events","Shows"],
        datasets: [
          {
            label:"GB",
            data: GBstorage,
            backgroundColor: "rgb(18, 18, 241, 0.3)",
            borderColor: "black"
          }, 
          {
            label: "US",
            data: USstorage,
            backgroundColor: "rgb(241, 18, 18, 0.3)",
            borderColor: "black"
          }
        ]
      },
      options: {
        tooltips: {
          callbacks: {
             label: function(tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
             }
          }
       },
        title: {
          display: true,
          text: 'Likes vs. Dislikes'
        },
        scales: {
          yAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Dislikes"
            },
            ticks: {
              max: 30000,
              min: 0,
            }
          }],
          xAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Likes"
            },
            ticks: {
              max: 30000,
              min: 0,
            }
          }],
          plugins: 
          {
            colorschemes: {
              scheme: 'brewer.Paired12'
            }
          }
        }
      }
    });
  });
});