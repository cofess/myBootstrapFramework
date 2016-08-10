$(function() {
    // function to check is user is on touch device
    if (!is_touch_device()) {

        if ($(".animated")[0]) {
            jQuery('.animated').css('opacity', '0');
        }

        $('.triggerAnimation').waypoint(function() {
            var animation = $(this).attr('data-animate');

            $(this).css('opacity', '');
            $(this).addClass("animated " + animation);

        },
        {
            offset: '80%',
            triggerOnce: true
        });
    }

    // function to check is user is on touch device
    function is_touch_device() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window; // works on ie10
    }
});