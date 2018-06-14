var favos_text = document.currentScript.getAttribute('favos');
var favos = JSON.parse(favos_text);

// set content to p.favo-users
var p_users_all = $('.favo-users');
var p_name_all = $('.favo-name');
var p_address_all = $('.favo-address');
var div_photo_all = $('#favo-img-div');

var len = favos.length;

for (var i = 0; i < len; i++) {
    // var p = p_all[i];
    // var favo = favos[len-1-i];

    // favos.forEach(function (favo, i) {

    // set content to p.favo-uesrs
    var p_users = p_users_all[i];
    var html_users = '<i class="fas fa-heart"></i> by <span>' + favoUsersString(favos[len-1-i]) + '</span>';
    $(p_users).html(html_users);

    // set content to p.favo-name
    var p_name = p_name_all[i];
    var name = textCut(favos[len-1-i].name, 25);
    $(p_name).text(name);

    // set content to p.favo-address
    var show_link = '/favos/' + favos[len-1-i]._id;
    var address = textCut(favos[len-1-i].address, 50) + '<a href=' + show_link + '> <u>more</u></a>';
    $(p_address_all[i]).html(address);

    var photo_url = favos[len-1-i].photo_url;
    //console.log(i + photo_url);

    if (photo_url) {
        // var img_html = "<img id='favo-img' src=" + photo_url + "></img>";
        // var div_photo = div_photo_all[i];
        // console.log('in array = ' + div_photo);
        // var onediv = $('#favo-img-div');
        // console.log('one = ' + onediv);
        // var todom = $(div_photo_all[i]);
        // $(div_photo_all[i]).html(img_html);
        // console.log('todom' + todom);
    }
}

// favo image copy from search page 
//move to favos index

//   if (marker.photo_url) {
//     image_piece = '<img src="' + marker.photo_url + '" alt="place image">';
//   }


// var temp_img = 'https://inhabitat.com/wp-content/blogs.dir/1/files/2012/03/The-Bank-Starbucks-Amsterdam-12.jpg';

// document.querySelectorAll('img').forEach((img) => {
//     img.src = temp_img;
// });

document.querySelectorAll('.favo-rating').forEach((p_rating) => {
    var ratingNumber = Number(p_rating.innerText);
    p_rating.innerHTML = ratingNumber + ' ' + rating(ratingNumber);
});

function rating(ratingNumber) {
    var starIcon = '<i class="fas fa-star"></i> ';
    var ratingIcons = '';
    for (var i = 0; i < ratingNumber; i++) {
        ratingIcons += starIcon;
    }
    return ratingIcons;
}



