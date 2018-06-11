var ratingString = function(ratingNumber) {
    var starIcon = '<i class="fas fa-star"></i> ';
    var ratingString = '';
    for (var i = 0; i < ratingNumber; i++) {
        ratingString += starIcon;
    }
    console.log('RATING STRING !!!');

    return ratingString;
}

function favoUsersString(authors) {
    var favoUsersString = '';
    authors.forEach(element => {
        favoUsersString += element + ', ';
    });

    var len = favoUsersString.length;
    favoUsersString.slice(len - 2, length - 1);
    console.log('favoUsersString = ' + favoUsersString);

    return favoUsersString;
}

//module.exports = ratingString;

module.exports = ratingString;


// set iamge