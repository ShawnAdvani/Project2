// var catGB = d3.nest()
//     .key(function (d) { return d.name; })
//     .rollup(function (v) { return d3.avg(v, function (d) { return d.amount; }); })
//     .object(dataGB);
// var test = "test"
console.log("test");


new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: "Great Britain",
                fillColor: "blue",
                data: [3, 7, 4]
            },
            {
                label: "United States",
                fillColor: "red",
                data: [4, 3, 5]
            }
        ]
    },
    options: {
        legend: { display: true },
        title: {
            display: true,
            text: 'Average Views per Category'
        }
    }
});