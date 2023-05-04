(function ($) {
    $(function () {
        var $gnb = $(".gnb");
        var pk = {};
        window.pk = pk = {
            winScr: null,
            lock: function () {
                var _ = this;
                _.winScr = $(window).scrollTop();

                $("#wrap").addClass("lock");
                $("#content").css("top", -_.winScr);
            },
            unlock: function () {
                var _ = this;
                $("#wrap").removeClass("lock");
                $("#content").css("top", "");

                $(window).scrollTop(_.winScr);
            },
            popOpen: function (el) {
                var _ = this;
                var _name = $(el).data('pop');

                _.lock();
                $("#" + _name).addClass("open");
            },
            popClose: function (el) {
                var _ = this;
                var _this = el;

                _.unlock();
                $(_this).closest('.pop-wrap').removeClass('open');
            }
        };

        // gnb 열고 닫기
        $gnb.find('.logo a').on('click', function (e) {
            e.preventDefault();
            gnbToggle();
        });

        //팝업 열기
        $('.pop-open').on('click', function (e) {
            e.preventDefault();
            pk.popOpen(this);
        });

        // 팝업 닫기
        $('body').on('click', '.pop-wrap .pop-btn-close', function (e) {
            e.preventDefault();
            pk.popClose(this);
        });

        // 툴팁
        $('a.ico-tooltip').on('click', function (e) {
            e.preventDefault();
            var _this = $(this);
            var $tip = _this.siblings('.tip');

            if (_this.hasClass('on')) {
                _this.removeClass('on');

            } else {
                $('a.ico-tooltip').removeClass('on');
                _this.addClass('on');
            }
        });

        $('.btn-close-tooltip').on('click', function (e) {
            e.preventDefault();

            $(this).closest('.tip').siblings('a.ico-tooltip').trigger('click');
        })

        // gnb가 scroll됐을 때 하단 라인이 생김
        var flag = false;
        var bannFlag = false;
        $(window).scroll(function () {
            var _scr = $(window).scrollTop();
            var mainBann = $('.main-banner');

            if (_scr > 0) {
                if (!flag) {
                    $gnb.find('.gnb-bar').addClass('scroll');
                    flag = true;
                }
            } else {
                flag = false;
                $gnb.find('.gnb-bar').removeClass('scroll');
            }

            if (mainBann.length > 0) {

                // [18.12.27] 수정
                if (_scr <= mainBann.height()) {

                    if (!$gnb.hasClass('open')) {
                        $gnb.css('top', mainBann.height() - _scr)
                    } else {
                        $gnb.css('top', '0');
                    };

                } else {
                    $gnb.css('top', '0');
                }
            }
        });

        function gnbToggle() {
            var $gnbList = $gnb.find('.gnb-list');
            var $gnbIcon = $gnb.find('[class^=ico-gnb]');
            var screenH = $(window).height();

            if (!$gnb.hasClass('open')) {
                //open gnb

                pk.lock();

                $gnb.addClass('open');
                $gnbList._ani(0.25, {
                    alpha: 1,
                    display: 'block',
                    top: 0
                });
                $gnbIcon.fadeOut(200);

                // [18.12.27] 수정
                if ($('.main-banner').length > 0 && $(window).scrollTop() == 0) $gnb.css('top', '0');

            } else {
                //close gnb

                pk.unlock();

                $gnb.removeClass('open');
                $gnbList._ani(0.25, {
                    alpha: 0,
                    display: 'none',
                    top: -screenH,
                    ease: Power3.easeIn
                });
                $gnbIcon.fadeIn(200);

                // [18.12.27] 수정
                if ($('.main-banner').length > 0 && $(window).scrollTop() == 0) $gnb.css('top', '');

            }
        }

        // 이미지 정사각형으로 보이게 처리
        $('img.square, img.rect').each(function(){
            var imgHeight = $(this).height();
            var imgSrc = $(this).attr('src');
            if($(this).hasClass('rect')) {
                $(this).css({
                    "height": 0,
                    "padding-bottom": "488px",
                    "background-image": "url(" + imgSrc + ")"
                });
            } else {
                $(this).css({
                    "width": 0,
                    "padding-left": imgHeight + "px",
                    "background-image": "url(" + imgSrc + ")"
                });
            }
        });

        // [19.1.4] 아이폰 사파리 분기처리
        if ((/ip(ad|hone|od)/i).test(navigator.userAgent)) {
            $('html').addClass('ios');
        };

        $.fn.slider = function (opt) {
            return this.each(function () {
                var slider = new Swiper($(this), opt);
            });
        };

        $.fn._ani = function (duration, opt) {
            return this.each(function () {
                var dur = duration || 0.25;
                var settings = $.extend({}, opt);

                TweenLite.to($(this), dur, settings);
            });
        };
        $.fn._aniFromTo = function (duration, optFrom, optTo) {
            return this.each(function () {
                var dur = duration || 0.25;
                var from = $.extend({}, optFrom);
                var to = $.extend({}, optTo);

                TweenLite.fromTo($(this), dur, from, to);
            });
        };
        $.fn._aniSet = function (opt) {
            return this.each(function () {
                var settings = $.extend({}, opt);

                TweenLite.set($(this), settings);
            });
        };


        // //18.12.14 textarea placeholder 줄바꿈 추가
        // var $textarea = $('textarea');
        // if ($textarea.length > 0) {
        //     $textarea.each(function () {
        //         var placeholder = $(this).attr('placeholder');

        //         $(this).attr('placeholder', '');


        //         $(this).wrap('<label/>');
        //         $(this).parent().css({
        //             display: 'block',
        //             position: 'relative'
        //         });
        //         $(this).parent().append('<span/>');
        //         $(this).parent().find('span').addClass('placeholder').html(placeholder.replace(/\n/g, '<br>'));


        //     })

        // }
    });
})(window.jQuery);