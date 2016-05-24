var trace = R.curry(function(tag, x) {
    console.log(tag, x);
    return x;
});

var Impure = {
    getJSON: R.curry(function (callback, url) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: callback
        });
    }),

    setHtml: R.curry(function (sel, html) {
        $(sel).html(html);
    })
};

var url = function (term) {
    return term + '.json';
};

var mediaUrl = R.compose(R.prop('m'), R.prop('media'));
var img = function (url) {
    return $('<img />', {src: url});
};
var mediaToImg = R.compose(img, mediaUrl);
var images = R.compose(R.map(mediaToImg), R.prop('items'));
var renderImages = R.compose(Impure.setHtml('body'), images);
var app = R.compose(Impure.getJSON(renderImages), url);

app("imgs");