

// $(document).ready(function(){
//     // setInterval(fetchdata,1000);
//     // fetchdata();
// });
$(document).ready(function(){
    // setInterval(get_data(), 1000);
    function get_data(){
        $.ajax({
            type: 'GET',
            url: '/api/test',
            success: function(data){
                console.log('success',data);
                $("#bpm").html(data["bpm"]);
                $("#temp").html(data["temp"]);
                $("#gsr").html(data["gsr"]);
                $("#overall").html(data["overall"]);
            }
        });
    }

})
