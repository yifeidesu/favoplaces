console.log(window.location.pathname);
switch (window.location.pathname) {
    case '/favos':
        $(".nav-item:contains('FAVOES')").addClass('active');
        break;
    case '/search':
        $(".nav-item:contains('SEARCH')").addClass('active');
        break;
    default:
        $(".nav-item:contains('/favos')").addClass('active');
}
