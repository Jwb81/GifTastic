
let url = 'https://api.giphy.com/v1/gifs/search?api_key=F2c7Og1r6Q7Flse6CyDi6uIuE7NRpX1f';
let topics = ['dogs', 'cats', 'birds'];

// create buttons for each topic
topics.forEach((element) => {
    // console.log(element);
    let btn = $('<button>');
    btn.addClass('btn btn-info gif-btn')
        .attr('id', element)
        .text(element);

    $('#input').append(btn);
    console.log(btn);
})

// jQuery callback does not work with ES6 syntax!!!
$('.gif-btn').on('click', function() {
    // clear any errors from before
    $('.container').children().toArray().forEach(element => {
        $(element).removeClass('input-error');
    });

    // get value for the limit
    let limit = $('#limit').val();

    // get gif rating
    let ratingsArray = ['y', 'g', 'pg', 'pg-13', 'r'];
    let rating = $('#rating').val();
    

    
    let value = $(this).text();


})