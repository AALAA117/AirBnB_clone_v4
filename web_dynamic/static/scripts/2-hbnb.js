$(document).ready(function () {
    const amenities = {};
    $('input[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');
        amenities[amenityName] = amenityId;
      } else {
        const amenityName = $(this).data('name');
        delete amenities[amenityName];
      }
      $('DIV.amenities h4').text(Object.keys(amenities).join(', '));
    });
  
    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }).fail(function () {
      $('#api_status').removeClass('available');
    });
  });
  