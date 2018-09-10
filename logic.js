let baseUrl = 'https://api.giphy.com/v1/gifs/search?api_key=F2c7Og1r6Q7Flse6CyDi6uIuE7NRpX1f';
let animals = ['dogs', 'cats', 'birds'];
let cars = ['lamborghini', 'mustang', 'porsche'];
let sports = ['soccer', 'football', 'basketball'];

/*

    FUNCTIONS

*/

// render buttons
let renderButtons = function (array) {

    // clear buttons from previous selection
    $('#buttons').empty();

    // create buttons for each topic
    array.forEach((element) => {
        // console.log(element);
        let btn = $('<button>');
        btn.addClass('btn btn-info gif-btn')
            .attr('id', element)
            .text(element);

        $('#buttons').append(btn);
    })
}

let renderGifs = function(arr) {
    // create a GIF card for each returned GIF
    for (let i = 0; i < arr.length; i++) {
        let div = $('<div>')
            .addClass('gif-card');
        
        let p = $('<p>')
            .text('Rating: ' + arr[i].rating.toUpperCase());

        let poster = $('<img>')
            .addClass('gif-image')
            .attr('data-still', arr[i].images.fixed_height_still.url)
            .attr('data-active', arr[i].images.fixed_height.url)
            .attr('data-mode', 'active')
            .attr('src', arr[i].images.fixed_height.url);

        div.append(p).append(poster);
        $('#gifs').append(div);
    }
}

// create click listener for the select box
$('#topics').on('change', function () {
    let topics = [];

    if ($(this).val() == 0)
        topics = animals;
    else if ($(this).val() == 1)
        topics = cars;
    else if ($(this).val() == 2)
        topics = sports;
    else
        topics = [];

    renderButtons(topics);

})



// jQuery callback does not work with ES6 syntax!!!
$('#buttons').on('click', '.gif-btn', function () {
    // clear any errors from before
    $('.container').children().toArray().forEach(element => {
        $(element).removeClass('input-error');
    });

    // get value for the limit
    let limit = $('#limit').val();

    // get gif rating
    // let ratingsArray = ['y', 'g', 'pg', 'pg-13', 'r'];
    // let rating = $('#rating').val();

    let value = $(this).text();

    let tempUrl = baseUrl + '&q=' + value + '&limit=' + limit;

    $.ajax({
        method: 'GET',
        url: tempUrl,
        success: function(result) {
            console.log(result);
            renderGifs(result.data);
        }
    })
})


// toggle image between still and active when an image is clicked
$('#gifs').on('click', '.gif-image', function() {
    let mode = $(this).attr('data-mode');

    if (mode == 'active') {
        // set mode to still and change to still image
        $(this).attr('data-mode', 'still');
        $(this).attr('src', $(this).attr('data-still'));

    }
    else {
        // set the mode to active and change to active image
        $(this).attr('data-mode', 'active');
        $(this).attr('src', $(this).attr('data-active'));
    }
})