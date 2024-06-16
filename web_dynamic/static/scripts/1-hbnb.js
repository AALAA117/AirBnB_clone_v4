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
});
