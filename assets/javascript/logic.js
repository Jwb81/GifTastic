let baseUrl = 'https://api.giphy.com/v1/gifs/search?api_key=F2c7Og1r6Q7Flse6CyDi6uIuE7NRpX1f';
let animals = ['dogs', 'cats', 'birds'];
let cars = ['lamborghini', 'mustang', 'porsche'];
let sports = ['soccer', 'football', 'basketball'];
let favorites = [];

let topics = {
    animals: [
        "dogs", "cats", "birds"
    ],
    cars: [
        "lamborghini", "mustand", "porsche"
    ], 
    sports: [
        "soccer", "football", "basketball"
    ]
}

/*

    FUNCTIONS

*/

// render buttons
let renderButtons = function (array) {

    // clear buttons from previous selection
    $('#buttons').empty().append('Click on any button to see some cool GIFs<br />');

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

let renderGifs = function (arr) {
    // check if the user wants the previous GIFs cleared
    if ($('#clear-gifs').prop('checked'))
        $('#gif-row').empty();

    // create a GIF card for each returned GIF
    for (let i = 0; i < arr.length; i++) {
        let div = $('<div>')
            .addClass('gif-card col-sm-6 col-xs-12')
        // .attr('style', 'border: 1px solid red;')

        let dataObj = {
            title: arr[i].title,
            rating: arr[i].rating.toUpperCase(),
            username: arr[i].username,
            source: arr[i].source,
            gif_still: arr[i].images.fixed_height_still.url,
            gif_active: arr[i].images.fixed_height.url
        }

        let favBtn = $('<button>')
            .addClass('btn btn-info btn-favorite')
            .data('data-details', dataObj)

        // search the favorites to see if it is in the array
        let found = false;
        for (let i = 0; i < favorites; i++) {
            if (favorites[i].gif_still == dataObj.gif_still) {
                found = true;
                break;
            }
        }

        let heart; 

        if (!found) {
            heart = $('<span><i class="far fa-heart"></span>').addClass('farfa-heart');
            favBtn.data('data-is-favorite', false)
        }
        else {
            heart = $('<span><i class="fas fa-heart"></span>').addClass('fas fa-heart');
            favBtn.data('data-is-favorite', true);
        }
        favBtn.append(heart);


        let infoDiv = $('<div>')
            .attr('style', 'width: 50%;float:left;')
            .html(
                '<b>Title:</b> ' + arr[i].title +
                '<br /><b>Rating:</b> ' + arr[i].rating.toUpperCase() +
                '<br /><b>User: ' + arr[i].username +
                '<br /><a href="' + arr[i].source + '">Go to the source</a>' +
                '<br />'
                // '<br /><button class="btn btn-info btn-favorite" data-details="' + dataObj + '">Add to favorites</button>'

            )
            .append(favBtn);
        // .attr('style', 'width: 40%;')

        let imageDiv = $('<div>')
            .attr('style', 'width: 50%;float:left;')

        // let posterDiv = $('<div>');
        let poster = $('<img>')
            .addClass('gif-image')
            .attr('data-still', arr[i].images.fixed_height_still.url)
            // .attr('data-still', arr[i].images.fixed_width.url)
            .attr('data-active', arr[i].images.fixed_height.url)
            // .attr('data-active', arr[i].images.fixed_width.url)
            .attr('data-mode', 'still')
            .attr('src', arr[i].images.fixed_height_still.url)
        // .attr('src', arr[i].images.fixed_width.url)
        // .attr('style', 'border: 3px solid red;')


        // infoDiv.append(poster);
        imageDiv.append(poster);
        div.append(infoDiv);
        div.append(imageDiv);
        // div.append(infoDiv).append(poster);
        $('#gif-row').append(div);
    }
}

// create click listener for the select box
$('#topics').on('change', function () {
    let arr = [];

    if ($(this).val() == 0) {
        $(this).addClass('input-error');
        return;
    }

    let value = $(this).val();
     
    renderButtons(topics[value]);

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
        success: function (result) {
            // console.log(result.data);
            renderGifs(result.data);
        }
    })
})


// toggle image between still and active when an image is clicked
$('#gif-row').on('click', '.gif-image', function () {
    let mode = $(this).attr('data-mode');

    if (mode == 'active') {
        // set mode to still and change to still image
        $(this).attr('data-mode', 'still');
        $(this).attr('src', $(this).attr('data-still'));

    } else {
        // set the mode to active and change to active image
        $(this).attr('data-mode', 'active');
        $(this).attr('src', $(this).attr('data-active'));
    }
})

// add or remove from favorites when button is clicked
$('#gif-row').on('click', '.btn-favorite', function () {
    let data = $(this).data('data-details');
    let isFavorite = $(this).data('data-is-favorite');

    
    if (!isFavorite) {
        favorites.push(data);
        $(this).data('data-is-favorite', true);
        $(this).empty().append(
            $('<span><i class="fas fa-heart"></span>')
        )
    }
    else {  // remove the element
        $(this).data('data-is-favorite', false);
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].gif_still == data.gif_still) {
                favorites.splice(i, 1);
                break;
            }
        }
        $(this).empty().append(
            $('<span><i class="far fa-heart"></span>')
        )
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
})

$('#new-topic-submit').on('click', function(evt) {
    evt.preventDefault();

    $('#topics').removeClass('input-error');

    if ($('#topics').val() == 0) {
        $('#topics').addClass('input-error');
        return;
    }

    let value = $('#topics').val();
    topics[value].push($('#new-topic').val());
    renderButtons(topics[value]);


})

// run this when the page loads
if (localStorage.getItem('favorites'))
    favorites = JSON.parse(localStorage.getItem('favorites'));
else
    favorites = [];