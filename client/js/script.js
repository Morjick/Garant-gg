//модальные окна
(function(){
    $(document).ready(function() {
        $(".btn-modal--reg").click(function () { 
            $(".modal-smg_boby").fadeOut(300);
            $("#modal-smg--reg").fadeIn(300);
            return false;
        });
        $(".btn-modal--login").click(function () { 
            $(".modal-smg_boby").fadeOut(300);
            $("#modal-smg--login").fadeIn(300);
            return false;
        });
        $(".close-modal").click(function () { 
            $(".modal-smg_boby").fadeOut(300);
            return false;
        });
    });
})();
//модальные окна


(function(){
    $(document).ready(function(){
        var owl = $('.reviews_slider');
        owl.owlCarousel({
            loop: true,
            items: 1,
            margin: 30,
            smartSpeed: 600,
        });
    });
})();

//плавный скрол
(function(){
    $(document).ready(function() {
        $(".btn-scroll").click(function () { 
            var elementClick = $(this).attr("href");
            var destination = $(elementClick).offset().top;
            $('html,body').animate( { scrollTop: destination }, 1100 );
            return false;
        });
    });
})();
//плавный скрол

//мобильное меню
(function(){
    $(document).ready(function(){
        $('.btn-menu').click(function(){
            $(this).parent().children('.head-right--cont').slideToggle();
            return false;
        });
    });
})();
//мобильное меню

//смена класса btn mobile menu
(function(){
    if(window.screen.width<=1250){
        $(document).ready(function(){
            $('.btn-menu').click(function (e) {
                $(this).toggleClass('active');
            });
        });
    }
})();
//смена класса btn mobile menu

//смена класса темной темы
(function(){
    $(document).ready(function(){
        $('.btn-theme').click(function (e) {
            $(this).toggleClass('btn-theme--active');
            $('.theme-white').toggleClass('theme-black');
        });
    });
})();
//смена класса темной темы