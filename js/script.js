let btn = document.querySelector('.test');
let input = document.querySelector('.form-control');
let select = document.querySelector('.form-select');
let counter = 1;

btn.addEventListener('click', call);
function call() {
    let inputVal = input.value;
    let selectVal = select.value;
    console.log(inputVal.trim());

    if(inputVal.trim() === ''){
        alert("Введите название фильма");
        return;
    }

    $.ajax({
        url:"https://www.omdbapi.com",
        data:{
            s: inputVal,
            type: selectVal,
            apikey: "a70187df",
            page: counter,
        },
        success: function(data) {
            console.log(data);
            if (data.Search.length > 0) {
                displayMovies(data.Search);
            }
        },
        error: function(data) {
            console.log(data);
            alert('Ошибка');
        }
    })
}

function displayMovies(movies) {
    let movieItems = '';
    movies.forEach(function(movie){

        console.log(movie.Title);
        movieItems += '<div class="card" style="width: 18rem;">'    
        movieItems +=   '<img class="card-img-top" src="' + movie.Poster + '" alt="Card image cap">';
        movieItems +=   '<div class="card-body">';
        movieItems +=       '<h5 class="card-title">Movie</h5>';
        movieItems +=       '<p class="card-text">' + movie.Title + '</p>';
        movieItems +=   '</div>';
        movieItems +=   '<ul class="list-group list-group-flush">';
        movieItems +=       '<li class="list-group-item">' + movie.Year + '</li>';
        movieItems +=   '</ul>';
        movieItems +=   '<div class="card-body">';
        movieItems +=       '<button class="btn btn-primary btn-id" value="' + movie.imdbID + '">Details</button>';
        movieItems +=   '</div>';
        movieItems += '</div>';
    });
    document.querySelector('.search-results').innerHTML = movieItems;
    
    $('.btn-id').click(function() {
        let id = $(this).val();
        callId(id);
    });
}

$('.page-link').click(function(e) {
    let txt = $(e.target).text();
    counter = txt;
    call();
  });

function callId(id) {
    $.ajax({
        url:"https://www.omdbapi.com",
        data:{
            i: id,
            apikey: "a70187df",
        },
        success: function(data) {
            console.log(data);
            if (data.Title.length > 0) {
                displayDesc(data);
            }
        },
        error: function(data) {
            console.log(data);
            alert('Ошибка');
        }
    });
};

function displayDesc(movieId) {
    let movieIdItems = '';
    movieIdItems += '<div class="card card-selected" style="height: 71rem; width: 77rem;">';
    movieIdItems +=     '<img class="card-img-top" src="' + movieId.Poster + '" alt="Card image cap">';
    movieIdItems +=     '<div class="card-body">';
    movieIdItems +=         '<h5 class="card-title">Film info:</h5>';
    movieIdItems +=         '<ul class="list-group list-group-flush">';
    movieIdItems +=             '<li class="list-group-item">Title: ' + movieId.Title + '</li>';
    movieIdItems +=             '<li class="list-group-item">Released: ' + movieId.Released + '</li>';
    movieIdItems +=             '<li class="list-group-item">Genre: ' + movieId.Genre + '</li>';
    movieIdItems +=             '<li class="list-group-item">Country: ' + movieId.Country + '</li>';
    movieIdItems +=             '<li class="list-group-item">Director: ' + movieId.Director + '</li>';
    movieIdItems +=             '<li class="list-group-item">Writer: ' + movieId.Writer + '</li>';
    movieIdItems +=             '<li class="list-group-item">Actors: ' + movieId.Actors + '</li>';
    movieIdItems +=             '<li class="list-group-item">Awards: ' + movieId.Awards + '</li>';
    movieIdItems +=         '</ul>';
    movieIdItems +=     '</div>';
    movieIdItems += '</div>';
    document.querySelector('.card-container').innerHTML = movieIdItems;
};
