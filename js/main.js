 $(document).ready(function() {

     // initial site scroll
     siteScroll();

     // contact tabs
     tabs();

     typed();

 });


 function siteScroll() {
     var interleaveOffset = -.5;
     var swiper = new Swiper('.swiper-container-v', {
         direction: 'vertical',
         slidesPerView: 1,
         mousewheel: true,
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

     $('.arrow-down').click(function(e) {
         swiper.slideNext();
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

 function typed() {
     var text = $('.js-type').text();
     $('.js-type').text('');
     $('.js-type').typist({
         speed: 12,
         text: text
     });
 }