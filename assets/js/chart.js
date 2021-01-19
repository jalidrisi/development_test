country = "Albania";

drawChart(country);

function resetCanvas(){
  $('#line-chart').remove(); // this is my <canvas> element
  $('#graph').append('<canvas id="line-chart"><canvas>');
  canvas = document.querySelector('#line-chart');
  ctx = canvas.getContext('2d');


};

function drawChart(country) {
  labels = [];
  values = [];
  countries = [];
  resetCanvas();

  $.each(data, function (key, value) {
    if (value["country"] == country) {
      console.log(country);
      labels.push(value["month-year"]);
      values.push(value["value"]);
    }
    countries.push(value["country"]);
  });

  uniq_labels = [...new Set(labels)];
  uniq_countries = [...new Set(countries)];

  for (var i = 0; i < uniq_countries.length; i++) {
    //creates option tag
    jQuery("<option/>", {
      value: uniq_countries[i],
      html: uniq_countries[i],
    }).appendTo("#dropdown select"); //appends to select if parent div has id dropdown
  }

  new Chart(document.getElementById("line-chart"), {
    type: "line",
    data: {
      labels: uniq_labels,
      datasets: [
        {
          data: values,
          label: country,
          borderColor: "#51cbce",
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "World population per region (in millions)",
      },
    },
  });
}

$("#select_id").change(function () {
  drawChart($(this).val());
});
