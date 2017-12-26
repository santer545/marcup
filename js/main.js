 $(document).ready(function() {

     // initial site scroll
     siteScroll();

     // contact tabs
     tabs();

     //typed();
     typedIt();
 });


 function siteScroll() {
     var interleaveOffset = -.5;
     var swiper = new Swiper('.swiper-container-v', {
         direction: 'vertical',
         slidesPerView: 1,
         mousewheel: true,
         draggable: false,
         speed: 1300,
         pagination: {
             el: '.swiper-pagination',
             clickable: true,
             type: 'custom'

         },
         renderCustom: function(swiper, current, total) {
             return current + ' of ' + total;
         }
     });
     swiper.on('slideChange', function() {
         if (swiper.activeIndex != 0) {
             $('body').removeClass('home');
         } else {
             $('body').addClass('home');
         }
         console.log(swiper.activeIndex);
         for (var i = 0; i < swiper.slides.length; i++) {


             var slide = swiper.slides[i];
             var translate, innerTranslate;
             progress = slide.progress;

             if (progress > 0) {
                 translate = progress * swiper.height;
                 innerTranslate = translate * interleaveOffset;
             } else {
                 innerTranslate = Math.abs(progress * swiper.height) * interleaveOffset;
                 translate = 0;
             }
             if (i == 0) {
                 console.log(progress + ' <- progress');
             }

             $(slide).css({
                 transform: 'translate3d(0,' + translate + 'px,0)'
             });

             $(slide).find('.slide-inner').css({
                 transform: 'translate3d(0,' + innerTranslate + 'px,0)'
             });
         }
         

     });

     swiper.on('slidePrevTransitionStart', function () {
        typedIt();
     });

     swiper.on('setTransition', function() {
         for (var i = 0; i < swiper.slides.length; i++) {
             $(swiper.slides[i])
                 .find('.slide-inner')
                 .andSelf()
                 .css({ transition: 'transform 1.3s' });
         }


     });



     $('a[data-slide]').click(function(e) {
         $(this).closest('ul').find('li').removeClass('active');
         $(this).closest('li').addClass('active');
         e.preventDefault();
         swiper.slideTo($(this).data('slide'));
     })

     $('.sidebar-logo').click(function(e) {
         swiper.slideTo(0);
     });

     $('.js-fil').click(function(e) {
         swiper.slideNext();
     });

     $('.js-map').click(function(e) {
         swiper.slideNext();
     });

     $('.arrow-map').click(function(e) {
         swiper.slidePrev();
     });


     // swiper gallery

     var galleryTop = new Swiper('.gallery-top', {
         spaceBetween: 10,
         navigation: {
             nextEl: '.swiper-button-next',
             prevEl: '.swiper-button-prev',
         },
         type: 'custom',
         renderCustom: function(swiper, current, total) {
             return current + ' of ' + total;
         }
     });

     var galleryThumbs = new Swiper('.gallery-thumbs', {
         spaceBetween: 10,
         centeredSlides: false,
         slidesPerView: 3,
         touchRatio: 0.2,
         slideToClickedSlide: true,
     });
     galleryTop.controller.control = galleryThumbs;
     galleryThumbs.controller.control = galleryTop;
 }


 function tabs() {
     $('ul.tabs li').click(function() {
         var tab_id = $(this).attr('data-tab');

         $('ul.tabs li').removeClass('current');
         $('.tab-content').removeClass('current');

         $(this).addClass('current');
         $("#" + tab_id).addClass('current');
     })
 }

 /*function typed() {
     var text = $('.js-type').text();
     var text1 = $('.js-strong').text();
     var text2 = $('.js-type-1').text();
     $('.js-type').text('');
     $('.js-strong').text('');
     $('.js-type-1').text('');
     $('.js-type').typist({
         speed: 6,
         text: text
     }).typistPause(23000);
     $('.js-strong').typist({
         speed: 6,
         text: text1
     }).typistPause(23000);
     $('.js-type-1').typist({
         speed: 6,
         text: text2
     })
 }*/


 function typedIt() {

     var text = $('.js-type').data("text");
     var text1 = $('.js-strong').data("text");
     var text2 = $('.js-type-1').data("text");

     $('.js-type').typeIt({
         strings: text,
         speed: 200,
         cursor: false

     });
     $('.js-strong').typeIt({
         strings: text1,
         speed: 200,
         cursor: false,
         breakDelay: 200,
         autostart: false

     });
     $('.js-type-1').typeIt({
         strings: text2,
         speed: 200,
         cursor: false,
         breakDelay: 400,
         autostart: false
     });

 }