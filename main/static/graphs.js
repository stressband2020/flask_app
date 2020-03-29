var elements = ["bpm","temperature","gsr"];
var titles = {"bpm" : "BPM", "temperature": "Temperature", "gsr":"GSR"}
var type = "";
$(function(){

    AJAX_POST(tnow,tafter,"All");
    // $("type").change(function (e) {

    // });

    $("#home").click(function(){
      window.location
    })
    $("#submit").click(function(){ 
        var start = $("#start").val();
        var end = $("#end").val();
        var overall = $("#overall_select").val();
        if (start=="" | end == ""){
            alert("Set START and END date");
        }
        else{
            var d1 = Date.parse(start);
            var d2 = Date.parse(end);

            if (d1>=d2) {
                alert("END date should be GREATER than START");
            }
            else{
                AJAX_POST(start,end,overall)
                type = $("#type").val();
            }
            console.log(d1,d2,type);

        }
 

    });

})

function AJAX_POST(start,end,overall){
    $.ajax({
        type: "POST",
        url: "/api/graph",
        data: JSON.stringify({
            "tnow":String(start),
            "tafter":String(end),
            "overall":overall,
            "mode": mode,
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            // one_one(data);

            if (mode == "graphs"){
              elements.forEach(element => {
                  $("#"+element).empty();

              });

              if (type=="Multiple"){
                
                  one_one(data);
              }
              else{
                  one(data);
              }
            }
            else{
              $("#tables").empty();
              // $('.dataframe').DataTable();

              $("#tables").append(data);
              $('.dataframe').DataTable({
                dom: 'Bfrtip',
                buttons: [
                  "excelHtml5",'csvHtml5','pdfHtml5'
                ]
              });
            }

            
            // one_one(data);



        }
    });
}

function one_one(data){

    
    elements.forEach(element => {
        console.log(element);
        
        console.log(data["date"]);

        var trace1 = {
            type: 'scatter',
            x: data["date"],
            y: data[element],
            marker: {
                size: 8
              },
              line: {
                width: 3
              }
        };
        
        var trace = [trace1];
        
        var layout = { 
            title: titles[element],
            font: {size: 12},
            xaxis: {
                title: {
                  text: 'Date',
                  font: {
                    family: 'Courier New, monospace',
                    size: 12,
                    color: '#7f7f7f'
                  }
                },
              },
              yaxis: {
                title: {
                  text: titles[element],
                  font: {
                    family: 'Courier New, monospace',
                    size: 12,
                    color: '#7f7f7f'
                  }
                }
              }
        };

        console.log(trace1);
        
        var config = {responsive: true}
        
        Plotly.newPlot(element, trace, layout, config );
    });
}

function one(data){

    var trace = [];
    elements.forEach(element => {
        console.log(element);
        
        console.log(data["date"]);

        trace.push({
            type: 'scatter',
            mode: 'lines+markers',
            name: titles[element],
            x: data["date"],
            y: data[element],

            marker: {
                size: 8
              },
              line: {
                width: 3
              }
        });
    });

    var layout = { 
        title: "Sensor Readings",
        font: {size: 12},
        xaxis: {
            title: {
              text: 'Date',
              font: {
                family: 'Courier New, monospace',
                size: 12,
                color: '#7f7f7f'
              }
            },
          },
          yaxis: {
            title: {
              text: "Sensor Values",
              font: {
                family: 'Courier New, monospace',
                size: 12,
                color: '#7f7f7f'
              }
            }
          }
    };

    
    var config = {responsive: true}
    
    Plotly.newPlot("overall", trace, layout, config );
}