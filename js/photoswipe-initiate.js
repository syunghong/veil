    /** photoswipe begin **/

        /*
        function clearTransition() {
            // $(".pswp__container").css({ "transition": "" });
        }

        function setTransition() {
            // $(".pswp__container").css({ "transition": "transform 0.35s ease-in-out 0s" });
        }


        $(function(){

            // set transition on arrow keys down
            $(".pswp").on("keydown", function(evt){
                // set transition if arrow keys are used
                if (evt.which == 37 || evt.which == 39)
                    setTransition();
            });

            // listen to dragchanged events and set transion on drag end
            $(".pswp__container")
                .on("drag:changed", function(evt, isDragging){

                    if (isDragging)
                        clearTransition();  // clear transition that was set on mouseUsed event
                    else
                        setTimeout(setTransition, 500);
                })
                .dragchanged();             // wire plugin so the events will fire
        });
        //*/


        (function($) {

            var pswp = $(".pswp")[0];
            var slides = [];
            var photoSwipe;

            function getSlideDimensions(slide, photoSwipe) {

// console.log("getSlideDimensions:717", slide.src)

                if (!slide.doGetSlideDimensions)
                    return;

                var isPrefetch = (typeof photoSwipe == "undefined");

// console.log("getSlideDimensions:722", isPrefetch, slide.src)


                var img = new Image();

                $(img).on("error", function(evt){

                    if (!isPrefetch)
                        slide.doGetSlideDimensions = false;
                });

                $(img).on("load", function(evt){

                    slide.doGetSlideDimensions = false;

                    slide.w = img.naturalWidth;
                    slide.h = img.naturalHeight;

                    if (!isPrefetch) {

                        photoSwipe.invalidateCurrItems();
                        photoSwipe.updateSize(true);
                    }
                });

                img.src = slide.src;
            }

            /** return the thumbnail's bounds for zomm-in and zoom-out animation */
            function getThumbBounds(index) {

                var slide = slides[index];

                var  thumbnail   = slide.$figure.find("a").find("img")
                    ,thumbOffset = thumbnail.offset()
                    ,thumbWidth  = thumbnail.width();

                return { x: thumbOffset.left, y: thumbOffset.top, w: thumbWidth };
            }

            $(".swipe-gallery")
                .find("li")
                    .each(function(ix, el){
                        // parse markup and retrieve slides information from ".photoswipe-gallery figure"
                        var  $figure = $(this);
                        var  $anchor = $figure.find("a");

                        var size = ($anchor.data("size") || "0x0").split("x");
                        // var thumbOffset = $figure.offset();

                        var slide = {

                             $figure : $figure
                            ,src     : $anchor.attr("href")
                            ,w       : size[0]
                            ,h       : size[1]

                            ,title   : $anchor.find("span").html()
                        };

                        slide.doGetSlideDimensions = (slide.w == 0 || slide.h == 0);

                        slides.push(slide);

                        $figure.on("click", function(evt){

                            evt.preventDefault();

                            // var options = {
                            //      index                 : ix
                            //     ,bgOpacity             : 0.90
                            //     ,showHideOpacity       : false
                            //     ,getThumbBoundsFn      : getThumbBounds
                            //     // ,showAnimationDuration : 500
                            //     // ,hideAnimationDuration : 500

                            //     ,preload               : [5, 5]
                            //     ,shareButtons: [
                            //          {id:'facebook', label:'Share on <b>Facebook</b>', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'}
                            //         ,{id:'twitter', label:'<b>Tweet</b>', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'}
                            //         ,{id:'pinterest', label:'<b>Pin it</b>', url:'http://www.pinterest.com/pin/create/button/'+
                            //                         '?url={{url}}&media={{image_url}}&description={{text}}'}
                            //                         // ,{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
                            //     ]
                            // }
        var options = {
            index: ix,
            barsSize: {top:0, bottom:0}, 
            captionEl: true,
            fullscreenEl: false,
            shareEl: false,
            bgOpacity: 1,
            showHideOpacity: false,
            preload: [5, 5],
            getThumbBoundsFn: getThumbBounds,
            tapToClose: true,
            tapToToggleControls: false
        }

                            photoSwipe = new PhotoSwipe(pswp, PhotoSwipeUI_Default, slides, options);

                            photoSwipe.listen("gettingData", function(index, slide){

                                if (slide.doGetSlideDimensions) {

                                    setTimeout(
                                        // use setTimeout to run in the event loop
                                         function(){ getSlideDimensions(slide, photoSwipe); }
                                        ,300
                                    );
                                }
                            }); // .listen(gettingData)

                            photoSwipe.listen("imageLoadComplete", function(index, slide){

                                if (slide.doGetSlideDimensions)
                                    getSlideDimensions(slide, photoSwipe);
                            }); // .listen(imageLoadComplete)

                            // photoSwipe.listen("mouseUsed", setTransition);

                            // photoSwipe.listen("pointerDown", function(){ console.log("pointerDown") });
                            // photoSwipe.listen("dragStart", function(){ console.log("dragStart") });
                            // photoSwipe.listen("dragEnd", function(){ console.log("dragEnd") });

                            // photoSwipe.listen("beforeChange", function(){});
                            // photoSwipe.listen("afterChange", function(){});

                            photoSwipe.init();

                            window.photoSwipe = photoSwipe;

                            // $("body").on("photoswipe:refresh", function(){
                            //  console.log("photoswipe:refresh", photoSwipe);
                            // });
                        });
                    }); // .each()

            // console.dir(slides);


            // prefetch slides images
            var i;
            for (i in slides) {

                setTimeout(
                    getSlideDimensions
                    ,1000 + i*20
                    ,slides[i]
                );
            } // for-in
        })(jQuery);
        /** photoswipe   end **/