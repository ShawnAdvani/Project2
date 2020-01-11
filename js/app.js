function dataGB() {
    d3.json('/GB').then((data) => {
        var objs = Object.values(data);
    });
}

function dataUS() {
    d3.json('/US').then((data) => {
        var objs = Object.values(data);
    });
}

var dataGB = dataGB()
var dataUS = dataUS()