$(document).ready(function(){
	let amenities = {};
	$('input [type="checkbox"]').change(function(){
		if ($(this)).is(':checked'){
			const amenityId = $(this).data('id');
			const amenityName = $(this).data('name');
			amenities[amenityName] = amenityId;
			}
			else{
				delete amenities[amenityName];
			}
		$('DIV.amenities h4').text(Objects.keys(amenities).join(', '));
