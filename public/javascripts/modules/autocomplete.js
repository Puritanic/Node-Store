
function autocomplete(input, latInput, lngInput) {
    if (!input) return; // Skip this function from running if there is no input
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();        
    });
    // dont submit the form if someone hits enter on this field
    input.on('keydown', (e) => {
        if (e.keycode === 13) e.preventDefault();
    });
}

export default autocomplete;
