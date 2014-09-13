(function($){

    $.fn.headerMenu = function(options) {

        var settings = $.extend(true,{
            outduration : 250,                          //time for mouse out duration to hide the item
            // transition effect for showing menu
            animduration : 250,                          // length of transition
            fadeOutDuration : 250,                          // length of transition
            fadeInDuration : 250                          // length of transition

        },  options);



        // slider elements
        var $wrapper = this,
            $popMenu = settings.menu,
            $menuItems = $popMenu.find(settings.sliderMenuItem),
            $contentItems = $popMenu.find(settings.sliderContentItem),
            prevButton = $popMenu.find(settings.prevButton),
            nextButton = $popMenu.find(settings.nextButton),
            hoverTimer;



        /**
         * Initialize header menu section
         *
         */
        function init () {

            $popMenu.hide();
            $contentItems.hide();
            //set listenners

            $wrapper.mouseover(function () {
                clearTimeout(hoverTimer);
                $popMenu.slideDown(settings.animduration)
            });
            $wrapper.mouseout( function () {
                hoverTimer = setTimeout(function(){
                    //$popMenu.hide();
                    $popMenu.slideUp(settings.animduration)
                }, settings.outduration);
            });

            $popMenu.mouseover( function () {
                clearTimeout(hoverTimer);
            });

            $popMenu.mouseout( function () {
                hoverTimer = setTimeout(function(){
                    //$popMenu.hide();
                    $popMenu.slideUp(settings.animduration)
                }, settings.outduration);
            });

            $menuItems.mouseover(function (event) {
                var id = $(event.target).data("on24-id");
                //hide content
                if (id > 0) {
                    $contentItems.finish();
                    $contentItems.filter(':visible').fadeOut(settings.fadeOutDuration);
                    var content = $popMenu.find("[data-on24-id='" + id+ "']").filter(settings.sliderContentItem);
                    content.fadeIn(settings.fadeInDuration);
                }


            });

            prevButton.click ( function (event) {
               var id = $(event.target).data("on24-id"),
                   content =  $popMenu.find("[data-on24-id='" + id+ "']").filter(settings.sliderContentItem);

                $contentItems.finish();
                $contentItems.filter(':visible').fadeOut(settings.fadeOutDuration);
                var previous = content.prev();
                if (previous.length == 0) {
                    previous = $contentItems.last();
                }
                previous.fadeIn(settings.fadeInDuration);
            });

            nextButton.click ( function (event) {
                var id = $(event.target).data("on24-id"),
                    content =  $popMenu.find("[data-on24-id='" + id+ "']").filter(settings.sliderContentItem);

                $contentItems.finish();
                $contentItems.filter(':visible').fadeOut(settings.fadeOutDuration);
                var previous = content.next();
                if (previous.length == 0) {
                    previous = $contentItems.first();
                }
                previous.fadeIn(settings.fadeInDuration);
            });





        }
        //Initialize the plugin
        init();

        return this;

    }

}(jQuery));