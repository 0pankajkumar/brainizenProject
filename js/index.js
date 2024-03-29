var draw = false;

init();

/**
 * FUNCTIONS
 */

function init() {
    // initialize DataTables
    var table = $("#Atable1").DataTable();
    // get table data
    var tableData = getTableData(table);
    // create Highcharts
    createHighcharts(tableData);
    // table events
    setTableEvents(table);
}

function getTableData(table) {
    var dataArray = [],
        countryArray = [],
        populationArray = [],
        densityArray = [];

    // loop table rows
    table.rows({
        search: "applied"
    }).every(function() {
        var data = this.data();
        countryArray.push(data[0]);
        populationArray.push(parseInt(data[1].replace(/\,/g, "")));
        densityArray.push(parseInt(data[2].replace(/\,/g, "")));
    });

    // store all data in dataArray
    dataArray.push(countryArray, populationArray, densityArray);

    return dataArray;
}

function createHighcharts(data) {
    Highcharts.setOptions({
        lang: {
            thousandsSep: ","
        }
    });



    Highcharts.chart("chart1", {
        title: {
            text: "World demographics"
        },

        subtitle: {
            text: "Data from worldometers.info"
        },

        xAxis: [{
            categories: data[0],
            labels: {
                rotation: -45
            }
        }],



        yAxis: [{
                // first yaxis
                title: {
                    text: "Population (2017)"
                }
            },


            {
                // secondary yaxis
                title: {
                    text: "Density (P/Km²)"
                },

                min: 0,
                opposite: true
            }
        ],


        series: [{
                name: "Population (2017)",
                color: "#0071A7",
                type: "column",
                data: data[1],
                tooltip: {
                    valueSuffix: " M"
                }
            },


            {
                name: "Density (P/Km²)",
                color: "#FF404E",
                type: "spline",
                data: data[2],
                yAxis: 1
            }
        ],


        tooltip: {
            shared: true
        },

        legend: {
            backgroundColor: "#ececec",
            shadow: true
        },

        credits: {
            enabled: false
        },

        noData: {
            style: {
                fontSize: "16px"
            }
        }
    });



}

function setTableEvents(table) {
    // listen for page clicks
    table.on("page", function() {
        draw = true;
    });

    // listen for updates and adjust the chart accordingly
    table.on("draw", function() {
        if (draw) {
            draw = false;
        } else {
            var tableData = getTableData(table);
            createHighcharts(tableData);
        }
    });
}



//On click at chart display table
$(document).ready(function() {

    $("#domain1").click(function() {
        $("#Atables").show();
    });


    //To modify Table2 contents
    var tb1 = $('#Atable1').DataTable();

    $('#Atable1 tbody').on('click', 'tr', function() {
        var data = tb1.row(this).data();
        $("#Atable2 td:eq(0)").html(data[0]);
        $("#Atable2 td:eq(1)").html(Math.round(+data[1] / +data[2]));

    });


});