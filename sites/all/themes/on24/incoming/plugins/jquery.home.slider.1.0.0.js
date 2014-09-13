(function($){

    $.fn.homeSlider = function(options) {

        var settings = $.extend(true,{
            outduration : 250,                          //time for mouse out duration to hide the item
            // transition effect for showing menu
            animduration : 250,                          // length of transition
            fadeOutDuration : 250,                          // length of transition
            fadeInDuration : 250                          // length of transition

        },  options);



        // slider elements
        var $wrapper = this,
            $menuItem = settings.menuItem,
            $slider = settings.slider,
            $sliderContentItems = settings.sliderContentItem;



        /**
         * Initialize header menu section
         *
         */
        function init () {

            //set listenners

            $menuItem.click(function (event) {
                var id = $(event.target).data("on24-id"),
                    content =  $slider.find("[data-on24-id='" + id+ "']").filter(settings.sliderContentItem);

                $sliderContentItems.filter(':visible').fadeOut(settings.fadeOutDuration);
                content.fadeIn(settings.fadeInDuration);
            });




        }
        //Initialize the plugin
        init();

        return this;

    }

}(jQuery));