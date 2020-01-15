d3.json("/UScat").then(function (usdata) {
    d3.json("/GBcat").then(function (gbdata) {
        console.log(gbdata)
        console.log(usdata)
        label = Object.keys(gbdata)
        console.log(label)
        var gbval = [];
        for (var i in gbdata) {
            gbval.push(gbdata[i]);
        }
        console.log(gbval)
        var usval = [];
        for (var i in usdata) {
            usval.push(usdata[i]);
        }
        console.log(usval)
        new Chart(document.getElementById("bar-chart"), {
            type: 'bar',
            data: {
                labels: label,
                datasets: [
                    {
                        label: "Great Britain",
                        backgroundColor: "blue",
                        data: gbval
                    },
                    {
                        label: "United States",
                        backgroundColor: "red",
                        data: usval
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
    });
});