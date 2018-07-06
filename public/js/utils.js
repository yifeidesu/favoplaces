function ratingHtml(ratingNumber) {
    var starIcon = '<i class="fas fa-star"></i> ';
    var ratingHtml = '<span>' + ratingNumber + '</span>';
    for (var i = 0; i < ratingNumber; i++) {
        ratingHtml += starIcon;
    }
    return ratingHtml;
}

/**
 * 
 * @param {Favo} 
 */
function favoUsersString(favo) {
    var favoUsersString = '';
    var authors = favo.authors;
    authors.forEach(function(author){
        favoUsersString += author.username + ', ';
    });

    var favoUsersString = favoUsersString.slice(0, -2);
    return favoUsersString;
}


/**
 * 
 * @param {String} str the text to cut.
 * @param {Number} len the desired text length.
 */
function textCut(str, len){

    if (str.length > len) {
        str = str.slice(0, len);
    }

    return str;
}

