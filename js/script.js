let btn = document.querySelector('.test');
let input = document.querySelector('.form-control');
let select = document.querySelector('.form-select');
let counter = 1;
btn.addEventListener('click', () => {
    let inputVal = input.value;
    let selectVal = select.value;
    console.log(inputVal.trim())

    if(inputVal.trim() === ''){
        alert("Введите название фильма");
        return;
    }

    $.ajax({
        url:"https://www.omdbapi.com",
        data:{
            s:inputVal,
            apikey: "a70187df",
        },
        success: function(data) {
            console.log(data);
            if (data.Search.length > 0) {
                displayMovies(data.Search)
            }
        },
        error: function(data) {
            console.log(data)
            alert('Ошибка')
        }
    })
});

function displayMovies(movies) {
    let movieItems = '';
    movies.forEach(function(movie){
        console.log(movie.Title);
        movieItems += '<div class="movie">';
        movieItems += '<h2>' + movie.Title + '</h2>';
        movieItems += '</div>';
    });
    document.querySelector('.search-results').innerHTML = movieItems;
}
