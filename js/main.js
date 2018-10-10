(function($) {

    $(document).ready(function() {
        if ($(window).width() > 992) {
            $('#recipeCarousel').carousel({
                // interval: 5000
                interval: false
            });

            $('.featured-slider-top .carousel .carousel-item').each(function(){
                var next = $(this).next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }
                next.children(':first-child').clone().appendTo($(this));

                if (next.next().length>0) {
                    next.next().children(':first-child').clone().appendTo($(this));

                } else {
                    $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
                }
            });
        }

        // Select all links with hashes
        $('.navbar a[href*="#"]')
        // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                    &&
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000, function() {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                }
            });


        /**
         * Change shoe sizes on click
         */
        $('.group-shoes').on('click', function () {

            let halfItem = $(this);
            let halfID = $(this).attr('id');
            let halfLinkID = $(this).parent().parent().attr('href');
            console.log(halfLinkID);

            $(this).parent().parent().parent().parent().find('.half-shoe img').removeClass('active');
            halfItem.toggleClass('active');

            $('ul.colors').addClass('hidden');
            $('ul#'+halfID).removeClass('hidden');

            console.log(halfLinkID);
            $(this).parent().parent().parent().parent().parent().parent().find('.above-shoe').find('.tab-pane').removeClass('show active');
            $(this).parent().parent().parent().parent().parent().parent().find('.above-shoe').find('.tab-pane'+halfLinkID).addClass('show active');

        });

        /**
         * Change image on pill hover
         */
        $('.color-ch').on('mouseover', function () {
            let imgHref = $(this).parent().attr('href');

            $(this).parent().parent().parent().parent().parent().find('.above-shoe div').removeClass('show active');
            $('.above-shoe div'+imgHref).addClass('show active');
        });

        // $('.colors').on('mouseleave', function() {
        //     var activeShoe = $(this).parent().parent().find('.above-shoe .tab-pane.active img').attr('src');
        //     console.log(activeShoe);
        //     $(this).parent().parent().find('.above-shoe .tab-pane.show.active img').attr('src',activeShoe);
        // });

        /**
         * Submit form functionality
         */
        $('#sign-up-form').submit(function (event) {
            event.preventDefault();

            /**
             * Validating form fileds before sending
             */

            var email = $('#email').val();
            var firstname = $('#firstname').val();
            var lastname = $('#lastname').val();
            var zip = $('#zip').val();

            var device = $('#mobile-device option:selected').val();
            var initialDevice = $('#mobile-device option:selected').val();

            var errors = false;

            if(email.indexOf('@') >= 0 ) {
                $('.email').removeClass('error-shown');
                errors = false;
            } else {
                $('.email').addClass('error-shown');
                errors = true;
            }
            if(firstname === "") {
                $('.firstname').addClass('error-shown');
                errors = true;
            } else {
                $('.firstname').removeClass('error-shown');
                errors = false;
            }
            if(lastname === "") {
                $('.lastname').addClass('error-shown');
                errors = true;
            } else {
                $('.lastname').removeClass('error-shown');
                errors = false;
            }
            if(zip === "") {
                $('.zip').addClass('error-shown');
                errors = true;
            } else {
                $('.zip').removeClass('error-shown');
                errors = false;
            }
            if(device === initialDevice) {
                $('.device').addClass('error-shown');
                erros = true;
            } else {
                $('.device').removeClass('error-shown');
                errors = false;
            }

            if(errors == true) {
                $('.error-all-fields').removeClass('hidden');
                $('.callout').removeClass('hidden');
            } else {

                var form = $(this);
                var url = form.attr( 'action' );

                var posting = $.post( url, {
                    email: $('#email').val(),
                    firstname: $('#firstname').val(),
                    lastname: $('#lastname').val(),
                    zip: $('#zip').val(),
                    device: $('#mobile-device option:selected').val()
                });


                $('.email').removeClass('error-shown');
                $('.firstname').removeClass('error-shown');
                $('.lastname').removeClass('error-shown');
                $('.zip').removeClass('error-shown');

                $('.email').val('');
                $('.firstname').val('');
                $('.lastname').val('');
                $('.zip').val('');

                /* Alerts the results */
                posting.done(function( data ) {
                    // setTimeout(function(){
                    //
                    // }, 2000);
                    $('.callout').addClass('hidden');
                    $('.message-sent-succ').removeClass("hidden");
                    $('#sign-up-form').addClass('hidden');
                    $('.error-all-fields').addClass('hidden');
                });
            }


        });

    });



})(jQuery);

