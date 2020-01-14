Promise.all([
    d3.json('/GB'),
    d3.json('/US')]).then(function (Data) {
        dataGB = Data[0];
        dataUS = Data[1];
        console.log(Object.keys(dataGB));
        console.log(dataUS);
        // var catGB = d3.nest()
        //     .key(function (d) { return d.name; })
        //     .rollup(function (v) { return d3.avg(v, function (d) { return d.amount; }); })
        //     .object(DataGB);
        // console.log(catGB);

        // var catUS = d3.nest()
        //     .key(function (d) { return d.category; })
        //     .rollup(function (v) { return d3.avg(v, function (d) { return d.amount; }); })
        //     .object(DataUS);
        // console.log(catUS);

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