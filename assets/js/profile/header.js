const rootPath = window.location.origin;
console.log(rootPath);

const beforeLogin = `
<div class="top-header-area" id="sticker">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 col-sm-12 text-center">
					<div class="main-menu-wrap">
						<!-- logo -->
						<div class="site-logo">
							<a href="index.html">
								<img src="assets/img/logo.png" alt="">
							</a>
						</div>
						<!-- logo -->

						<!-- menu start -->
						<nav class="main-menu">
							<ul>
								<li><a href="#">Home</a></li>
								<li><a href="#">Shop</a></li>
								<li><a href="about.html">About</a></li>
								<li><a href="#">Orders</a></li>
								<li><a href="contact.html">Contact</a></li>
								
								
								<li>
									<div class="header-icons">
										<a class="login-btn" href="${rootPath}/assets/pages/homepage/login.html"><button>Login</button></a>
									</div>
								</li>
							</ul>
						</nav>
						<div class="menu-icon">
  
</div>

						<!-- menu end -->
					</div>
				</div>
			</div>
		</div>
	</div>
`;

const AfterLogin = ` 
<div class="top-header-area" id="sticker">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 col-sm-12 text-center">
					<div class="main-menu-wrap">
						<!-- logo -->
						<div class="site-logo">
							<a href="index.html">
								<img src="assets/img/logo.png" alt="">
							</a>
						</div>
						<!-- logo -->

						<!-- menu start -->
						<nav class="main-menu">
							<ul>
								<li><a href="#">Home</a></li>
								<li><a href="#">Shop</a></li>
								<li><a href="about.html">About</a></li>
								<li><a href="#">Orders</a></li>
								<li><a href="contact.html">Contact</a></li>
								
								
								<li>
									<div class="header-icons">
										<a class="shopping-cart" href="cart.html"><i class="fas fa-shopping-cart"></i></a>
										<a class="mobile-hide profile-bar-icon" href="#"><i class="fas fa-profile"></i></a>
									</div>
								</li>
							</ul>
						</nav>
						<div class="menu-icon">
 
</div>

						<!-- menu end -->
					</div>
				</div>
			</div>
		</div>
	</div>
`;
const loginUser = localStorage.getItem("profile_id");

function handleLogout() {
    localStorage.removeItem("profile_id");
    localStorage.removeItem("user");
    window.location.href = `${rootPath}/user/logout`;
}

window.addEventListener("DOMContentLoaded", () => {
    const loginUser = localStorage.getItem("profile_id");
    if (loginUser === "" || loginUser === null) {
        document.body.insertAdjacentHTML("afterbegin", beforeLogin);
        let userLoginElement = document.getElementById("userLogin");
        userLoginElement?.addEventListener("click", () => (document.body.innerHTML = AfterLogin));
        let userLogoutElement = document.getElementById("logOut");
        userLogoutElement?.addEventListener("click", handleLogout);
    } else {
        document.body.insertAdjacentHTML("afterbegin", AfterLogin);
        let userLoginElement = document.getElementById("userLogin");
        userLoginElement?.addEventListener("click", () => (document.body.innerHTML = AfterLogin));
        let userLogoutElement = document.getElementById("logOut");
        userLogoutElement?.addEventListener("click", handleLogout);
    }
});

(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });
    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });


}(jQuery));


document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuIcon.addEventListener('click', () => {
        document.body.classList.toggle('open-menu');
    });
});
