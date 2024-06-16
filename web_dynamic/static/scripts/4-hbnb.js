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
  // Request places data and populate section.places
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}), // Sending an empty dictionary
      success: function (response) {
        $('.places article').remove(); // Clear existing articles

        response.forEach(function (place) {
          const article = $('<article>');

          const titleBox = $('<div>').addClass('title_box');
          $('<h2>').text(place.name).appendTo(titleBox);
          $('<div>').addClass('price_by_night').text('$' + place.price_by_night).appendTo(titleBox);
          titleBox.appendTo(article);

          const information = $('<div>').addClass('information');
          $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')).appendTo(information);
          $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')).appendTo(information);
          $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')).appendTo(information);
          information.appendTo(article);

          const description = $('<div>').addClass('description').html(place.description);
          description.appendTo(article);

          article.appendTo('.places');
        });
      },
      error: function (xhr, status, error) {
        console.error('Error fetching places:', status, error);
      }
    });
  });
});
