$(document).ready(function() {
  var thermostat = new Thermostat;
  updateTemperature();

  $('#up-button').on('click', function() {
    thermostat.up(1);
    updateTemperature();
  });

  $('#down-button').on('click', function() {
    thermostat.down(1);
    updateTemperature();
  });

  $('#reset-button').on('click', function() {
    thermostat.reset();
    updateTemperature();
  });

  $('#PSM-button').on('click', function() {
    if (thermostat.powerSavingMode) {
      thermostat.switchPowerSavingModeOff();
      $('#PSM-status').text('off');
    } else {
      thermostat.switchPowerSavingModeOn();
      $('#PSM-status').text('on');
      updateTemperature();
    }
  });

  // $('#current-city').change(function() {
  //   var city = $('#current-city').val();
  //   $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
  //     $('#current-temperature').text(data.main.temp + ' C');
  //   });
  // });

  displayWeather('London');

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    displayWeather(city);
  });

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  }

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp + ' C');
    });
  }
});
