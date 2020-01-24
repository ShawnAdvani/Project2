d3.json("/USTopLikes").then(function (usdata) {
    d3.json("/GBTopLikes").then(function (gbdata) {

        console.log(usdata)
        console.log(gbdata)

        var GBobjs = Object.values(gbdata);
        var USobjs = Object.values(usdata);

        var GBLikes = [];
        for (var i = 0; i < 10; i++) {
            GBLikes.push(gbdata[i].likes);
        }
        console.log(GBLikes)

        var USLikes = [];
        for (var i = 0; i < 10; i++) {
            USLikes.push(usdata[i].likes);
        }
        console.log(USLikes)

        var GBTopLikesCat = [];
        for (var i = 0; i < 10; i++) {
            GBTopLikesCat.push(gbdata[i].category);
        }
        console.log(GBTopLikesCat)


        new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
            labels: GBTopLikesCat,
            datasets: [
                {
                label: "Most Liked Categories",
                backgroundColor: ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#fabebe"],
                data: GBLikes
                },

                {
                label: "Most Liked Categories",
                backgroundColor: ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#fabebe"],
                data: USLikes
                }
            ]

            },
            options: {
            title: {
                display: true,
                text: 'Top 10 Most Liked Category'
            }
            }
        });
    });
});