var favos_text = document.currentScript.getAttribute('favos');
var favos = JSON.parse(favos_text);
favos = favos.reverse();

// set content to p.favo-users
var p_users_all = $('.favo-users');
var p_name_all = $('.favo-name');
var pRatingAll = $('.favo-rating');
var p_address_all = $('.favo-address');
var divImgAll = $('.img-div');
var imgFavoAll = $('.favo-img');

favos.forEach(function (favo, i) {
    // set content to p.favo-uesrs
    var html_users = '<i class="fas fa-heart"></i> by <span>' + favoUsersString(favo) + '</span>';  
    $(p_users_all[i]).html(html_users);

    // set content to p.favo-name
    var name = textCut(favo.name, 25);
    $(p_name_all[i]).text(name);

    var ratingNumber = favo.rating;
    console.log('i = ' + i + 'rating' +favo.rating);
    
    var starsHtml = rating(ratingNumber);
    console.log(starsHtml);
    console.log('ele = '+pRatingAll[i]);
    console.log(pRatingAll.length);
    
    $(pRatingAll[i]).html(ratingNumber + ' ' + starsHtml);

    // set content to p.favo-address
    var show_link = '/favos/' + favo._id;
    var address = textCut(favo.address, 50) + '<a href=' + show_link + '> <u>more</u></a>';
    $(p_address_all[i]).html(address);

    var photo_url = favo.photo_url;
    $(imgFavoAll[i]).attr('src', photo_url);
    console.log(i);
    console.log($(imgFavoAll[i]));
    
    console.log($(imgFavoAll[i]).attr('src'));

    //console.log(i + photo_url);`
});

function rating(ratingNumber) {
    var starIcon = '<i class="fas fa-star"></i> ';
    var ratingIcons = '';
    for (var i = 0; i < ratingNumber; i++) {
        ratingIcons += starIcon;
    }
    return ratingIcons;
}



