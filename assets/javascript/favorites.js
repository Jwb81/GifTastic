/*

    FUNCTIONS

*/

let renderGifs = function (arr) {
    // check if the user wants the previous GIFs cleared
    if ($('#clear-gifs').prop('checked'))
        $('#gif-row').empty();

    // create a GIF card for each returned GIF
    for (let i = 0; i < arr.length; i++) {
        let div = $('<div>')
            .addClass('gif-card col-sm-6 col-xs-12')
        // .attr('style', 'border: 1px solid red;')

        let favBtn = $('<button>')
            .addClass('btn btn-info btn-favorite')
            .data('data-details', arr[i])
            // .text('Remove from favorites!')
            .data('data-is-favorite', true)
            

        let heart = $('<span><i class="fas fa-heart"></span>')
            .addClass('fas fas-heart');

        favBtn.append(heart);

        let infoDiv = $('<div>')
            .attr('style', 'width: 50%;float:left;')
            .html(
                '<b>Title:</b> ' + arr[i].title +
                '<br /><b>Rating:</b> ' + arr[i].rating.toUpperCase() +
                '<br /><b>User: ' + arr[i].username +
                '<br /><a href="' + arr[i].source + '">Go to the source</a>' +
                '<br />'
            )
            .append(favBtn);
        // .attr('style', 'width: 40%;')

        let imageDiv = $('<div>')
            .attr('style', 'width: 50%;float:left;')

        let poster = $('<img>')
            .addClass('gif-image')
            .attr('data-still', arr[i].gif_still)
            .attr('data-active', arr[i].gif_active)
            .attr('data-mode', 'still')
            .attr('src', arr[i].gif_still)


        // infoDiv.append(poster);
        imageDiv.append(poster);
        div.append(infoDiv);
        div.append(imageDiv);
        // div.append(infoDiv).append(poster);
        $('#gif-row').append(div);
    }
}

// add or remove from favorites when button is clicked
$('#gif-row').on('click', '.btn-favorite', function () {
    let data = $(this).data('data-details');
    // let isFavorite = $(this).data('data-is-favorite');

    // $(this).data('data-is-favorite', true);

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].gif_still == data.gif_still) {
            console.log('object removed from array');
            favorites.splice(i, 1);
            break;
        }
    }

    console.log($(this).parent().parent());
    $(this).parent().parent().remove();

    localStorage.setItem('favorites', JSON.stringify(favorites));
})

// get the favorites from local storage
if (localStorage.getItem('favorites')) {
    favorites = JSON.parse(localStorage.getItem('favorites'));
    console.log(favorites);
    renderGifs(favorites);
} else
    favorites = [];