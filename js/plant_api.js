$(document).ready(function(){
  generateDBPanel();


  $("#newPlantButton").click(function(e) {
    e.preventDefault();
    //console.log($("#plantName").val());
    var plant = {
        plant:
              {
                name:  $("#plantName").val(),
                description: $("#plantDesc").val()
              }
        };

    //console.log(plant);
    $.ajax({
      url: "https://rails-plant-api.herokuapp.com/api/plants/",
      method: "POST",
      data: plant,
      dataType: 'json',
      success: generateDBPanel
    });
  });
});

function dataToPagePanel(data) {
  //console.log(data);
  $("div.demo").html(function() {
    tableHTML = '<ul class="list-group">';
    for (resourceItem in data) {
      //console.log(resourceItem);
      tableHTML += '<li class="list-group-item">';
      tableHTML += data[resourceItem].name + ": " + data[resourceItem].description;
      tableHTML += "</li>"
    };
    tableHTML += "</ul>"
    return tableHTML;
  });
}

function generateDBPanel(){
  $.ajax({
    url: "https://rails-plant-api.herokuapp.com/api/plants/",
    method: "GET",
    success: function(data) {
      dataToPagePanel(data);
    },
    error: function(xhr, status, error) {
      console.log(status, error);
    }
  });
}
