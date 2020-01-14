d3.json("/UScat").then(function (usdata) {
    d3.json("/GBcat").then(function (gbdata) {
        console.log(gbdata)
        console.log(usdata)
        
        // new Chart(document.getElementById("bar-chart"), {
        //     type: 'bar',
        //     data: {
        //         labels: [],
        //         datasets: [
        //             {
        //                 label: "Great Britain",
        //                 fillColor: "blue",
        //                 data: catGB
        //             },
        //             {
        //                 label: "United States",
        //                 fillColor: "red",
        //                 data: catUS
        //             }
        //         ]
        //     },
        //     options: {
        //         legend: { display: true },
        //         title: {
        //             display: true,
        //             text: 'Average Views per Category'
        //         }
        //     }
        // });
    });
});