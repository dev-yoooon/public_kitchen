(function ($) {
    $(function () {
        var agent = navigator.userAgent.toLocaleLowerCase();
        if((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
            $('#content').addClass('ie');
            var ieVer = agent.split(/msie\s?/i)[1] ? parseInt(agent.split(/msie\s?/i)[1].split(";")[0]) : false;
            if(ieVer && ieVer < 11) {
                $('.inp-bundle > input[class^="inp"] ~ .btn-form, #post .inp-bundle + .btn-form, label.phone-limit + .btn-form').each(function() {
                    var btnWidth = $(this).width();
                    var btnLeftMargin = parseInt(getComputedStyle(this).marginLeft);
                    if($(this).parents('#post').length > 0) {
                        $(this).siblings('.inp-bundle').css('width', Math.round($(this).siblings('.inp-bundle').outerWidth() - btnWidth - btnLeftMargin));
                    } else if($(this).siblings('label.phone-limit').length > 0) {
                        $(this).siblings('label.phone-limit').find('input').css('width', Math.round($(this).parents('.inp-bundle').outerWidth() - btnWidth - btnLeftMargin));
                    } else {
                        $(this).siblings('input[class^="inp"]').css('width', Math.round($(this).siblings('input[class^="inp"]').outerWidth() - btnWidth - btnLeftMargin));
                    }
                });

                $('.inp-bundle > .sel-tit + select, .inp-bundle > .sel-tit + input').each(function() {
                    $(this).css('width', parseInt($(this).parent().width() - $(this).prev().width()));
                });
            }
        }

        var $gnb = $(".gnb");
        var pk = {};
        window.pk = pk = {
            winScr: null,
            lock: function () {
                var _ = this;
                _.winScr = $(window).scrollTop();

                $("#wrap").addClass("lock");
            },
            unlock: function () {
                var _ = this;
                $("#wrap").removeClass("lock");

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

        // gnb 확장 기능(팝업)
        $gnb.find('.expansion:not(input)').click(function() {
            $(this).toggleClass('active');
            $(this).next('[class*="-more"]').fadeToggle(200, function() {
                $(this).toggleClass('open');
            });
        });
        $gnb.find('input.expansion').on('focusin', function() {
            $gnb.find('#search').css('width', '400px');
            $gnb.find('.expansion:not(input)').removeClass('active');
            $gnb.find('[class*="-more"]:not(.search-more).open').hide().removeClass('open');
            $(this).next('.search-more').delay(200).fadeIn(200, function() {
                $(this).addClass('open');
            });
        });
        $(window).on('click', function(e) {
            if($gnb.find('.open').length > 0) {
                if(!$(e.target).closest('.open').length) {
                    if(!$gnb.find('#search input[type="search"]').is(':focus')) {
                        $gnb.find('.search-more.open').parents('#search').css('width', '285px');
                        $('.search-more.open').removeClass('open').hide();
                    }
                    $gnb.find('[class*="-more"]:not(.search-more).open').fadeOut(200, function() {
                        $(this).removeClass('open');
                    }).prev().removeClass('active');
                }
            }
        });

        // 검색어 입력란 placeholder 애니메이션
        var phIdx = 0;
        var phMax = $gnb.find('#search .placeholder span').length;
        var originalPhTxt = $gnb.find('#search input[type=search]').attr('placeholder');
        setInterval(function() {
            if(phIdx < phMax) {
                $gnb.find('#search .placeholder span').removeClass('on');
                $gnb.find('#search .placeholder span').eq(phIdx).addClass('on');
                phIdx++;
            } else {
                $gnb.find('#search .placeholder span').removeClass('on');
                phIdx = 0;
            }
        }, 10000);
        $gnb.find('#search input[type=search]').focus(function() {
            $gnb.find('#search .placeholder').hide();
            $gnb.find('#search input[type=search]').attr('placeholder', $gnb.find('#search .placeholder span.on').text() || originalPhTxt);
        }).blur(function() {
            if($(this).val() == "") {
                $gnb.find('#search .placeholder').show();
            }
            $gnb.find('#search input[type=search]').attr('placeholder', originalPhTxt);
        });

        $('.btn-cancel').on('click', function (e) {
            e.preventDefault();
            $(this).parents('.pop-wrap').removeClass('open');
            if($gnb.find('.search-more').hasClass('open')) {
                $gnb.find('#search input[type="search"]').focus();
            }
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

        // gnb가 scroll됐을 때 하단 라인이 생김 + sicky
        var flag = false;
        var sticky = false;
        if($('.sticky').eq(0).length) {
            sticky = {};
            sticky.el = $('.sticky').eq(0);
            sticky.start = sticky.el.find('> *').eq(0).offset().top;
            sticky.startGap = sticky.start - sticky.el.offset().top;
            if($('.end-sticky').length > 0) {
                sticky.stop = $('.end-sticky').eq(0).offset().top
            } else {
                sticky.stop = $('.footer').eq(0).offset().top
            }
            sticky.end = sticky.stop - sticky.el.height() - 120;
        }

        setSticky = function() {
            if($('.sticky').eq(0).length) {
                sticky.end = sticky.stop - sticky.el.height() - 120;
            }
            $(window).trigger('scroll');
        }
            
        $(window).scroll(function () {
            var _scr = $(window).scrollTop();

            if (_scr > 0) {
                if (!flag) {
                    $gnb.find('.gnb-bar').addClass('scroll');
                    flag = true;
                }
            } else {
                flag = false;
                $gnb.find('.gnb-bar').removeClass('scroll');
            }
            if(sticky) {
                if(_scr < sticky.start - 120 && _scr < sticky.end) {
                    sticky.el.removeAttr('style').removeClass('on');
                } else {
                    if(sticky.el.hasClass('aside')) {
                        sticky.el.css('width', sticky.el.width());
                    }
                    if(_scr >= sticky.end) {
                        sticky.el.removeClass('on').css({'position': 'absolute', 'top': sticky.end + 120 - sticky.startGap, 'right': 0});
                    } else if(_scr >= sticky.start - 120 && !sticky.el.hasClass('on')) {
                        sticky.el.addClass('on').css({'position': 'fixed', 'top': 120 - sticky.startGap, 'right': $(window).width() * 0.5 - 600 + "px"});
                    }
                }
            }
        }).trigger('scroll');

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
    });
})(window.jQuery);