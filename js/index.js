(function($) {

    $('.icon-menu').click(function(){
      $('div#nav').toggleClass('mm-current mm-opened');
      $('html').toggleClass('mm-opened mm-background mm-white mm-opening')
      $('.mm-search').removeClass('mm-panel mm-hidden')
    })
  
     var allPanels = $('.accordion > dd').hide();

     $('.accordion > dt > h4').click(function() {
          $this = $(this);
          $target = $this.parent().next();
          if (!$target.hasClass('active')) {
              $('h4').find('i').removeClass('fa-minus');
              $('h4').find('i').addClass('fa-plus');
              $this.find('i').removeClass('fa-plus');
              $this.find('i').addClass('fa-minus');

              allPanels.removeClass('active').slideUp();
              $target.addClass('active').slideDown();
          } else {
              allPanels.removeClass('active').slideUp();
              $('h4').find('i').removeClass('fa-minus');
              $('h4').find('i').addClass('fa-plus');
          }
          return false;
     });

     var updateCartCount = function(number) {
         console.log('hi');
         jQuery('.cart-button-text').html(number);
     };

     $(document).ready(function() {
        $(".fancybox").fancybox();

        $('.read-more').on('click', function(event) {
            event.preventDefault();
            $('.description--read-more').toggleClass('active');
            if($(this).text() == 'Read more') {
                $(this).text('Read less');
            } else {
                $(this).text('Read more');
            }
        });
     });

    // Update the quantity to add correct plurals
    $('#quantity').on('blur', function() {
        console.log($(this).val());
        if($(this).val() >= 2 && $('.quantity-s').length) {
            $('.quantity-s').text('s');
        } else {
            $('.quantity-s').text('');
        }
    });

})(jQuery);

$(function() {

    var allPanels = $('.accordion > dd').hide();

    $('.accordion > dt > a').click(function() {
        if (!$(this).parent().next().is(":visible")) {
            $(this).find('small.right').html('&#9660;');
            $(this).parent().next().slideDown();
        } else if ($(this).parent().next().is(":visible")) {
            $(this).parent().next().slideUp();
            $(this).parent().next('.accordion small.right').html('&#9668;');
            $(this).next('small.right').html('&#9668;');
            if ($(this).find('small.right').html('&#9660;')) {
                $(this).find('small.right').html('&#9668;');
            } else if ($(this).find('small.right').html('&#9668;')) {
                $(this).find('small.right').html('&#9660;');
            }
        }
        return false;
    });

    var $header = $(".feature_image .header");

    $(".product_slider img").unveil(200);
    $(".thumbnail img, .cart_page_image img").unveil(200, function() {
        $(this).load(function() {
            this.style.opacity = 1;
        });
    });



    if ($(window).width() >= 768) {
        $(document).ready(function() {

            if ($header.length && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                var s = skrollr.init({
                    forceHeight: false
                });
                $(".featured_products").next(".slide").waypoint(function() {
                    window.dispatchEvent(new Event('resize'));
                });
            }

            setTimeout(function() {
                s.refresh();
                console.log('refreshed');
            }, 4000);


        });

        $("#featured_links").waypoint(function() {
            $(this).find(".column, .columns").addClass("animated fadeInUp");
        }, {
            offset: '80%'
        });


        $("#pagecontent").waypoint(function(direction) {
            $header.toggleClass('is-absolute');
            $header.removeClass('fadeIn');
            $header.addClass('delay-0s');

            $header.toggleClass('header_bar');
            if ($header.hasClass('header_bar')) {
                $('.dropdown').css({
                    "top": $('.header').height()
                });
            } else {
                $('.dropdown').css({
                    "top": "auto"
                });
            }

            if ($(window).width() >= 768) {
                if (!$header.hasClass('is-absolute')) {
                    $('.logo img', $header).attr('src', $('.logo img').data('src'));
                } else {
                    $('.logo img', $header).attr('src', $('.logo img').data('src-home'));
                }
            }
            $header.toggleClass('fadeInDown');
        });


        $(".animate_right").waypoint(function() {
            $(this).addClass("animated fadeInRight");
        }, {
            offset: '70%'
        });
        $(".animate_left").waypoint(function() {
            $(this).addClass("animated fadeInLeft");
        }, {
            offset: '70%'
        });
        $(".animate_up").waypoint(function() {
            $(this).addClass("animated fadeInUp");
        }, {
            offset: '70%'
        });
        $(".animate_down").waypoint(function() {
            $(this).addClass("animated fadeInDown");
        }, {
            offset: '70%'
        });
    }


    if ($(window).width() >= 768) {
        $('.logo img', $header).attr('src', $('.logo img').data('src-home'));
    } else {
        $('.logo img').attr('src', $('.logo img').data('src'));
    }


    $('#nav').mmenu({

        searchfield: {
            add: true,
            search: true,
            noResults: '<a href="/search?q=" class="search_link">' + "Advanced Search \u0026#8594;" + '</a>'
        },

        classes: "mm-white",
        offCanvas: {
            pageSelector: "#content_wrapper"
        },
    });

    $('.search_link').on("click", function() {
        $(this).attr("href", $(this).attr("href") + $(".mm-search input").val());
    })

    if ($('html').hasClass('ie')) {
        $('.icon-cart').on("click", function() {
            window.location = '/cart';
            return false;
        });
    } else {
        new Share(".share-button", {
            ui: {
                flyout: "bottom left",
                button_font: false,
                button_text: "Share"
            },
            networks: {
                facebook: {
                    load_sdk: false
                },
                email: {
                    description: escape($('meta[name=description]').attr("content")) + " - " + document.URL
                }
            }
        });


        $('.icon-cart').click(function() {
            window.location = '/cart';
            return false;
        });

        $('.icon-cart, .icon-menu').on("click", function(e) {
            $('#search').hide();
        });
    }

    $('.slider').flexslider({
        controlNav: false,
        animation: "fade"
    });

    $('.product_slider').flexslider({
        startAt: parseInt($('.featured_image', $(this)).data('index'), 10),
        touch: true,
        pauseOnHover: true,
        controlNav: "thumbnails",
        directionNav: true,

        animation: "slide",

        slideshowSpeed: 6 * 1000
    });


    if ($('.product_slider img').data("index") == 0) {
        $('.product_slider .flex-direction-nav').hide()
    }


    $(document).on("click", '.continue, .edit_cart, .mm-opened #header', function(e) {
        $('#cart').trigger("close");
        $('#nav').trigger("close");
        e.stopPropagation();
        e.preventDefault();
        return false;
    });

    $('#search-toggle, .search-close').on('click', function(e) {
        $('.search-close, .search-submit').css('padding-top', $('.header').height() + 50 + 'px')
        if ($('#search').is(":visible") && $(window).scrollTop() == 0) {
            $header.removeClass('header_bar');
            if ($('body.feature_image').length) {
                $('.logo img').attr('src', $('.logo img').data('src-home'));
            }
        } else {
            $header.addClass('header_bar');
            $('.logo img').attr('src', $('.logo img').data('src'));
        }

        if ($('#search').hasClass("fadeIn")) {
            $('#search').removeClass("fadeIn").hide();
        } else {
            $('#search').show().addClass("fadeIn").find('input').focus();
        }

        e.stopPropagation();
        e.preventDefault();
    })

    $('.lightbox').fancybox();

    if ($(window).width() >= 959) {
        $('.header_bar .dropdown').css({
            "top": $('.header').height()
        });
        $('.thumbnail').hover(function() {
            $('.quick_shop', this).show();
        }, function() {
            $('.quick_shop', this).hide();
        })
        var modal_width = '870px';
        if ($(window).width() >= 1200 || $('html').hasClass('ie')) {
            modal_width = '1110px'
        }
        $(".quick_shop").fancybox({
            width: modal_width,
            height: 'auto',
            autoSize: false,
            padding: 10,
            beforeShow: function(e) {
                var $gallery = $('.' + $(this.element).data('gallery'));
                var $product = $(this.element).data("fancybox-href");
                $("img", $gallery).unveil();
                $gallery.flexslider({
                    touch: false,
                    pauseOnHover: true,
                    controlNav: "thumbnails",
                    directionNav: true,

                    animation: "slide",

                    slideshowSpeed: 6 * 1000
                });

                $gallery.find(".fancybox:not(:first):not(:last)").fancybox({
                    padding: 0,
                    wrapCSS: 'gallery'
                });
                if ($gallery.find('img').data("index") == 0) {
                    $gallery.find('.flex-direction-nav').hide()
                }

            }
        });
    }

    $('.mm-search input').keypress(function(e) {
        if (e.which == 13) {
            window.location = '/search?q=' + $(this).val();
        }
    });


    $(".product_slider .fancybox:not(:first):not(:last)").fancybox({
        padding: 0,
        wrapCSS: 'gallery'
    });




    $('#tag_filter').change(function() {
        window.location = $('#tag_filter option:selected').val();
    });


    var tabs = $('ul.tabs');
    tabs.each(function(i) {
        var tab = $(this).find('> li > a');
        tab.click(function(e) {
            var contentLocation = $(this).attr('href');
            if (contentLocation.charAt(0) == "#") {
                e.preventDefault();
                tab.removeClass('active');
                $(this).addClass('active');
                $(this).parents('ul.tabs').next().find(contentLocation).show().css({
                    'display': 'block'
                }).addClass('active').siblings().hide().removeClass('active');
            }
        });
    });

    $('.toggle').click(function() {
        if ($(window).width() <= 767) {
            var $toggle = $(this);
            if ($toggle.next('ul').is(':visible')) {
                $toggle.next('ul').hide();
                $toggle.children('span').html('+');
            } else {
                $toggle.next('ul').show();
                $toggle.children('span').html('-');
            }
        }
    });

});

function htmlEncode(value) {
    if (value) {
        return $('<div/>').text(value).html();
    } else {
        return '';
    }
}

/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r, G, f, v) {
    var J = f("html"),
        n = f(r),
        p = f(G),
        b = f.fancybox = function() {
            b.open.apply(this, arguments)
        },
        I = navigator.userAgent.match(/msie/i),
        B = null,
        s = G.createTouch !== v,
        t = function(a) {
            return a && a.hasOwnProperty && a instanceof f
        },
        q = function(a) {
            return a && "string" === f.type(a)
        },
        E = function(a) {
            return q(a) && 0 < a.indexOf("%")
        },
        l = function(a, d) {
            var e = parseInt(a, 10) || 0;
            d && E(a) && (e *= b.getViewport()[d] / 100);
            return Math.ceil(e)
        },
        w = function(a, b) {
            return l(a, b) + "px"
        };
    f.extend(b, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !s,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3E3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                    (I ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close ss-icon" href="javascript:;">&#x2421;</a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next ss-icon" href="javascript:;"><span>&#x25BB;</span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev ss-icon" href="javascript:;"><span>&#x25C5;</span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: f.noop,
            beforeLoad: f.noop,
            afterLoad: f.noop,
            beforeShow: f.noop,
            afterShow: f.noop,
            beforeChange: f.noop,
            beforeClose: f.noop,
            afterClose: f.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(a, d) {
            if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0))) return f.isArray(a) || (a = t(a) ? f(a).get() : [a]), f.each(a, function(e, c) {
                var k = {},
                    g, h, j, m, l;
                "object" === f.type(c) && (c.nodeType && (c = f(c)), t(c) ? (k = {
                    href: c.data("fancybox-href") || c.attr("href"),
                    title: c.data("fancybox-title") || c.attr("title"),
                    isDom: !0,
                    element: c
                }, f.metadata && f.extend(!0, k,
                    c.metadata())) : k = c);
                g = d.href || k.href || (q(c) ? c : null);
                h = d.title !== v ? d.title : k.title || "";
                m = (j = d.content || k.content) ? "html" : d.type || k.type;
                !m && k.isDom && (m = c.data("fancybox-type"), m || (m = (m = c.prop("class").match(/fancybox\.(\w+)/)) ? m[1] : null));
                q(g) && (m || (b.isImage(g) ? m = "image" : b.isSWF(g) ? m = "swf" : "#" === g.charAt(0) ? m = "inline" : q(c) && (m = "html", j = c)), "ajax" === m && (l = g.split(/\s+/, 2), g = l.shift(), l = l.shift()));
                j || ("inline" === m ? g ? j = f(q(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : k.isDom && (j = c) : "html" === m ? j = g : !m && (!g &&
                    k.isDom) && (m = "inline", j = c));
                f.extend(k, {
                    href: g,
                    type: m,
                    content: j,
                    title: h,
                    selector: l
                });
                a[e] = k
            }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== v && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        },
        cancel: function() {
            var a = b.coming;
            a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current ||
                b._afterZoomOut(a))
        },
        close: function(a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]())))
        },
        play: function(a) {
            var d = function() {
                    clearTimeout(b.player.timer)
                },
                e = function() {
                    d();
                    b.current && b.player.isActive && (b.player.timer =
                        setTimeout(b.next, b.current.playSpeed))
                },
                c = function() {
                    d();
                    p.unbind(".player");
                    b.player.isActive = !1;
                    b.trigger("onPlayEnd")
                };
            if (!0 === a || !b.player.isActive && !1 !== a) {
                if (b.current && (b.current.loop || b.current.index < b.group.length - 1)) b.player.isActive = !0, p.bind({
                    "onCancel.player beforeClose.player": c,
                    "onUpdate.player": e,
                    "beforeLoad.player": d
                }), e(), b.trigger("onPlayStart")
            } else c()
        },
        next: function(a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        },
        prev: function(a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        },
        jumpto: function(a, d, e) {
            var c = b.current;
            c && (a = l(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== v && (b.cancel(), b._start(a)))
        },
        reposition: function(a, d) {
            var e = b.current,
                c = e ? e.wrap : null,
                k;
            c && (k = b._getPosition(d), a && "scroll" === a.type ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), e.pos = f.extend({}, e.dim, k)))
        },
        update: function(a) {
            var d =
                a && a.type,
                e = !d || "orientationchange" === d;
            e && (clearTimeout(B), B = null);
            b.isOpen && !B && (B = setTimeout(function() {
                var c = b.current;
                c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), B = null)
            }, e && !s ? 0 : 300))
        },
        toggle: function(a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, s && (b.wrap.removeAttr("style").addClass("fancybox-tmp"), b.trigger("onUpdate")),
                b.update())
        },
        hideLoading: function() {
            p.unbind(".loading");
            f("#fancybox-loading").remove()
        },
        showLoading: function() {
            var a, d;
            b.hideLoading();
            a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
            p.bind("keydown.loading", function(a) {
                if (27 === (a.which || a.keyCode)) a.preventDefault(), b.cancel()
            });
            b.defaults.fixed || (d = b.getViewport(), a.css({
                position: "absolute",
                top: 0.5 * d.h + d.y,
                left: 0.5 * d.w + d.x
            }))
        },
        getViewport: function() {
            var a = b.current && b.current.locked || !1,
                d = {
                    x: n.scrollLeft(),
                    y: n.scrollTop()
                };
            a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = s && r.innerWidth ? r.innerWidth : n.width(), d.h = s && r.innerHeight ? r.innerHeight : n.height());
            return d
        },
        unbindEvents: function() {
            b.wrap && t(b.wrap) && b.wrap.unbind(".fb");
            p.unbind(".fb");
            n.unbind(".fb")
        },
        bindEvents: function() {
            var a = b.current,
                d;
            a && (n.bind("orientationchange.fb" + (s ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function(e) {
                var c = e.which || e.keyCode,
                    k = e.target || e.srcElement;
                if (27 === c && b.coming) return !1;
                !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!k || !k.type && !f(k).is("[contenteditable]"))) && f.each(d, function(d, k) {
                    if (1 < a.group.length && k[c] !== v) return b[d](k[c]), e.preventDefault(), !1;
                    if (-1 < f.inArray(c, k)) return b[d](), e.preventDefault(), !1
                })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, k, g) {
                for (var h = f(d.target || null), j = !1; h.length && !j && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap");) j = h[0] && !(h[0].style.overflow && "hidden" === h[0].style.overflow) &&
                    (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
                if (0 !== c && !j && 1 < b.group.length && !a.canShrink) {
                    if (0 < g || 0 < k) b.prev(0 < g ? "down" : "left");
                    else if (0 > g || 0 > k) b.next(0 > g ? "up" : "right");
                    d.preventDefault()
                }
            }))
        },
        trigger: function(a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e) return !1;
                c.helpers && f.each(c.helpers, function(d, e) {
                    if (e && b.helpers[d] && f.isFunction(b.helpers[d][a])) b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
                });
                p.trigger(a)
            }
        },
        isImage: function(a) {
            return q(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(a) {
            return q(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(a) {
            var d = {},
                e, c;
            a = l(a);
            e = b.group[a] || null;
            if (!e) return !1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) && (d.padding = [c, c, c, c]);
            d.modal && f.extend(!0, d, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            });
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height && (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad")) b.coming = null;
            else {
                c = d.type;
                e = d.href;
                if (!c) return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" === c || "swf" === c) d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && s && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (s ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {
                    skin: f(".fancybox-skin", d.wrap),
                    outer: f(".fancybox-outer", d.wrap),
                    inner: f(".fancybox-inner", d.wrap)
                });
                f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
                    d.skin.css("padding" + b, w(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length) return b._error("content")
                } else if (!e) return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        },
        _error: function(a) {
            f.extend(b.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: b.coming.tpl.error
            });
            b._afterLoad()
        },
        _loadImage: function() {
            var a = b.imgPreload = new Image;
            a.onload = function() {
                this.onload = this.onerror = null;
                b.coming.width = this.width / b.opts.pixelRatio;
                b.coming.height = this.height / b.opts.pixelRatio;
                b._afterLoad()
            };
            a.onerror = function() {
                this.onload =
                    this.onerror = null;
                b._error("image")
            };
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        },
        _loadAjax: function() {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
                url: a.href,
                error: function(a, e) {
                    b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                },
                success: function(d, e) {
                    "success" === e && (a.content = d, b._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var a = b.coming,
                d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", s ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function() {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {}
            });
            a.iframe.preload && (b.showLoading(), d.one("load", function() {
                f(this).data("ready", 1);
                s || f(this).bind("load.fb", b.update);
                f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                b._afterLoad()
            }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload || b._afterLoad()
        },
        _preloadImages: function() {
            var a = b.group,
                d = b.current,
                e = a.length,
                c = d.preload ? Math.min(d.preload,
                    e - 1) : 0,
                f, g;
            for (g = 1; g <= c; g += 1) f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        },
        _afterLoad: function() {
            var a = b.coming,
                d = b.current,
                e, c, k, g, h;
            b.hideLoading();
            if (a && !1 !== b.isActive)
                if (!1 === b.trigger("afterLoad", a, d)) a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
                else {
                    d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                    b.unbindEvents();
                    e = a.content;
                    c = a.type;
                    k = a.scrolling;
                    f.extend(b, {
                        wrap: a.wrap,
                        skin: a.skin,
                        outer: a.outer,
                        inner: a.inner,
                        current: a,
                        previous: d
                    });
                    g = a.href;
                    switch (c) {
                        case "inline":
                        case "ajax":
                        case "html":
                            a.selector ? e = f("<div>").html(e).find(a.selector) : t(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
                                f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                            }));
                            break;
                        case "image":
                            e = a.tpl.image.replace("{href}",
                                g);
                            break;
                        case "swf":
                            e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function(a, b) {
                                e += '<param name="' + a + '" value="' + b + '"></param>';
                                h += " " + a + '="' + b + '"'
                            }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                    }(!t(e) || !e.parent().is(a.inner)) && a.inner.append(e);
                    b.trigger("beforeShow");
                    a.inner.css("overflow", "yes" === k ? "scroll" :
                        "no" === k ? "hidden" : k);
                    b._setDimension();
                    b.reposition();
                    b.isOpen = !1;
                    b.coming = null;
                    b.bindEvents();
                    if (b.isOpened) {
                        if (d.prevMethod) b.transitions[d.prevMethod]()
                    } else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                    b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                    b._preloadImages()
                }
        },
        _setDimension: function() {
            var a = b.getViewport(),
                d = 0,
                e = !1,
                c = !1,
                e = b.wrap,
                k = b.skin,
                g = b.inner,
                h = b.current,
                c = h.width,
                j = h.height,
                m = h.minWidth,
                u = h.minHeight,
                n = h.maxWidth,
                p = h.maxHeight,
                s = h.scrolling,
                q = h.scrollOutside ?
                h.scrollbarWidth : 0,
                x = h.margin,
                y = l(x[1] + x[3]),
                r = l(x[0] + x[2]),
                v, z, t, C, A, F, B, D, H;
            e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            x = l(k.outerWidth(!0) - k.width());
            v = l(k.outerHeight(!0) - k.height());
            z = y + x;
            t = r + v;
            C = E(c) ? (a.w - z) * l(c) / 100 : c;
            A = E(j) ? (a.h - t) * l(j) / 100 : j;
            if ("iframe" === h.type) {
                if (H = h.content, h.autoHeight && 1 === H.data("ready")) try {
                    H[0].contentWindow.document.location && (g.width(C).height(9999), F = H.contents().find("body"), q && F.css("overflow-x", "hidden"), A = F.outerHeight(!0))
                } catch (G) {}
            } else if (h.autoWidth ||
                h.autoHeight) g.addClass("fancybox-tmp"), h.autoWidth || g.width(C), h.autoHeight || g.height(A), h.autoWidth && (C = g.width()), h.autoHeight && (A = g.height()), g.removeClass("fancybox-tmp");
            c = l(C);
            j = l(A);
            D = C / A;
            m = l(E(m) ? l(m, "w") - z : m);
            n = l(E(n) ? l(n, "w") - z : n);
            u = l(E(u) ? l(u, "h") - t : u);
            p = l(E(p) ? l(p, "h") - t : p);
            F = n;
            B = p;
            h.fitToView && (n = Math.min(a.w - z, n), p = Math.min(a.h - t, p));
            z = a.w - y;
            r = a.h - r;
            h.aspectRatio ? (c > n && (c = n, j = l(c / D)), j > p && (j = p, c = l(j * D)), c < m && (c = m, j = l(c / D)), j < u && (j = u, c = l(j * D))) : (c = Math.max(m, Math.min(c, n)), h.autoHeight &&
                "iframe" !== h.type && (g.width(c), j = g.height()), j = Math.max(u, Math.min(j, p)));
            if (h.fitToView)
                if (g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height(), h.aspectRatio)
                    for (;
                        (a > z || y > r) && (c > m && j > u) && !(19 < d++);) j = Math.max(u, Math.min(p, j - 10)), c = l(j * D), c < m && (c = m, j = l(c / D)), c > n && (c = n, j = l(c / D)), g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height();
                else c = Math.max(m, Math.min(c, c - (a - z))), j = Math.max(u, Math.min(j, j - (y - r)));
            q && ("auto" === s && j < A && c + x + q < z) && (c += q);
            g.width(c).height(j);
            e.width(c + x);
            a = e.width();
            y = e.height();
            e = (a > z || y > r) && c > m && j > u;
            c = h.aspectRatio ? c < F && j < B && c < C && j < A : (c < F || j < B) && (c < C || j < A);
            f.extend(h, {
                dim: {
                    width: w(a),
                    height: w(y)
                },
                origWidth: C,
                origHeight: A,
                canShrink: e,
                canExpand: c,
                wPadding: x,
                hPadding: v,
                wrapSpace: y - k.outerHeight(!0),
                skinSpace: k.height() - j
            });
            !H && (h.autoHeight && j > u && j < p && !c) && g.height("auto")
        },
        _getPosition: function(a) {
            var d = b.current,
                e = b.getViewport(),
                c = d.margin,
                f = b.wrap.width() + c[1] + c[3],
                g = b.wrap.height() + c[0] + c[2],
                c = {
                    position: "absolute",
                    top: c[0],
                    left: c[3]
                };
            d.autoCenter && d.fixed &&
                !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
            c.top = w(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = w(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
            return c
        },
        _afterZoomIn: function() {
            var a = b.current;
            a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
                !f(d.target).is("a") && !f(d.target).parent().is("a") && (d.preventDefault(),
                    b[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
                a.preventDefault();
                b.close()
            }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
        },
        _afterZoomOut: function(a) {
            a =
                a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            b.trigger("afterClose", a)
        }
    });
    b.transitions = {
        getOrigPosition: function() {
            var a = b.current,
                d = a.element,
                e = a.orig,
                c = {},
                f = 50,
                g = 50,
                h = a.hPadding,
                j = a.wPadding,
                m = b.getViewport();
            !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"), e.length || (e = d));
            t(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) :
                (c.top = m.y + (m.h - g) * a.topRatio, c.left = m.x + (m.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked) c.top -= m.y, c.left -= m.x;
            return c = {
                top: w(c.top - h * a.topRatio),
                left: w(c.left - j * a.leftRatio),
                width: w(f + j),
                height: w(g + h)
            }
        },
        step: function(a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace,
                h = c.skinSpace;
            if ("width" === f || "height" === f) e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](l("width" === f ? c : c - g * e)), b.inner[f](l("width" ===
                f ? c : c - g * e - h * e))
        },
        zoomIn: function() {
            var a = b.current,
                d = a.pos,
                e = a.openEffect,
                c = "elastic" === e,
                k = f.extend({
                    opacity: 1
                }, d);
            delete k.position;
            c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
            b.wrap.css(d).animate(k, {
                duration: "none" === e ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: c ? this.step : null,
                complete: b._afterZoomIn
            })
        },
        zoomOut: function() {
            var a = b.current,
                d = a.closeEffect,
                e = "elastic" === d,
                c = {
                    opacity: 0.1
                };
            e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1));
            b.wrap.animate(c, {
                duration: "none" === d ? 0 : a.closeSpeed,
                easing: a.closeEasing,
                step: e ? this.step : null,
                complete: b._afterZoomOut
            })
        },
        changeIn: function() {
            var a = b.current,
                d = a.nextEffect,
                e = a.pos,
                c = {
                    opacity: 1
                },
                f = b.direction,
                g;
            e.opacity = 0.1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = w(l(e[g]) - 200), c[g] = "+=200px") : (e[g] = w(l(e[g]) + 200), c[g] = "-=200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
                duration: a.nextSpeed,
                easing: a.nextEasing,
                complete: b._afterZoomIn
            })
        },
        changeOut: function() {
            var a =
                b.previous,
                d = a.prevEffect,
                e = {
                    opacity: 0.1
                },
                c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
            a.wrap.animate(e, {
                duration: "none" === d ? 0 : a.prevSpeed,
                easing: a.prevEasing,
                complete: function() {
                    f(this).trigger("onReset").remove()
                }
            })
        }
    };
    b.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !s,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: f("html"),
        create: function(a) {
            a = f.extend({}, this.defaults, a);
            this.overlay && this.close();
            this.overlay =
                f('<div class="fancybox-overlay"></div>').appendTo(b.coming ? b.coming.parent : a.parent);
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function(a) {
            var d = this;
            a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (n.bind("resize.overlay", f.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay", function(a) {
                if (f(a.target).hasClass("fancybox-overlay")) return b.isActive ?
                    b.close() : d.close(), !1
            });
            this.overlay.css(a.css).show()
        },
        close: function() {
            var a, b;
            n.unbind("resize.overlay");
            this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), a = n.scrollTop(), b = n.scrollLeft(), this.el.removeClass("fancybox-lock"), n.scrollTop(a).scrollLeft(b));
            f(".fancybox-overlay").remove().hide();
            f.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function() {
            var a = "100%",
                b;
            this.overlay.width(a).height("100%");
            I ? (b = Math.max(G.documentElement.offsetWidth, G.body.offsetWidth),
                p.width() > b && (a = p.width())) : p.width() > n.width() && (a = p.width());
            this.overlay.width(a).height(p.height())
        },
        onReady: function(a, b) {
            var e = this.overlay;
            f(".fancybox-overlay").stop(!0, !0);
            e || this.create(a);
            a.locked && (this.fixed && b.fixed) && (e || (this.margin = p.height() > n.height() ? f("html").css("margin-right").replace("px", "") : !1), b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(a, b) {
            var e, c;
            b.locked && (!1 !== this.margin && (f("*").filter(function() {
                return "fixed" ===
                    f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), e = n.scrollTop(), c = n.scrollLeft(), this.el.addClass("fancybox-lock"), n.scrollTop(e).scrollLeft(c));
            this.open(a)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(a) {
            this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }
    };
    b.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(a) {
            var d =
                b.current,
                e = d.title,
                c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (q(e) && "" !== f.trim(e)) {
                d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
                switch (c) {
                    case "inside":
                        c = b.skin;
                        break;
                    case "outside":
                        c = b.wrap;
                        break;
                    case "over":
                        c = b.inner;
                        break;
                    default:
                        c = b.skin, d.appendTo("body"), I && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(l(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" : "appendTo"](c)
            }
        }
    };
    f.fn.fancybox = function(a) {
        var d,
            e = f(this),
            c = this.selector || "",
            k = function(g) {
                var h = f(this).blur(),
                    j = d,
                    k, l;
                !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (k = a.groupAttr || "data-fancybox-group", l = h.attr(k), l || (k = "rel", l = h.get(0)[k]), l && ("" !== l && "nofollow" !== l) && (h = c.length ? f(c) : e, h = h.filter("[" + k + '="' + l + '"]'), j = h.index(this)), a.index = j, !1 !== b.open(h, a) && g.preventDefault())
            };
        a = a || {};
        d = a.index || 0;
        !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", k) : p.undelegate(c, "click.fb-start").delegate(c +
            ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", k);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    p.ready(function() {
        var a, d;
        f.scrollbarWidth === v && (f.scrollbarWidth = function() {
            var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                b = a.children(),
                b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        if (f.support.fixedPosition === v) {
            a = f.support;
            d = f('<div style="position:fixed;top:20px;"></div>').appendTo("body");
            var e = 20 ===
                d[0].offsetTop || 15 === d[0].offsetTop;
            d.remove();
            a.fixedPosition = e
        }
        f.extend(b.defaults, {
            scrollbarWidth: f.scrollbarWidth(),
            fixed: f.support.fixedPosition,
            parent: f("body")
        });
        a = f(r).width();
        J.addClass("fancybox-lock-test");
        d = f(r).width();
        J.removeClass("fancybox-lock-test");
        f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
    })
})(window, document, jQuery);

/*
 * jQuery FlexSlider v2.5.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
! function($) {
    $.flexslider = function(e, t) {
        var a = $(e);
        a.vars = $.extend({}, $.flexslider.defaults, t);
        var n = a.vars.namespace,
            i = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            s = ("ontouchstart" in window || i || window.DocumentTouch && document instanceof DocumentTouch) && a.vars.touch,
            r = "click touchend MSPointerUp keyup",
            o = "",
            l, c = "vertical" === a.vars.direction,
            d = a.vars.reverse,
            u = a.vars.itemWidth > 0,
            v = "fade" === a.vars.animation,
            p = "" !== a.vars.asNavFor,
            m = {},
            f = !0;
        $.data(e, "flexslider", a), m = {
            init: function() {
                a.animating = !1, a.currentSlide = parseInt(a.vars.startAt ? a.vars.startAt : 0, 10), isNaN(a.currentSlide) && (a.currentSlide = 0), a.animatingTo = a.currentSlide, a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last, a.containerSelector = a.vars.selector.substr(0, a.vars.selector.search(" ")), a.slides = $(a.vars.selector, a), a.container = $(a.containerSelector, a), a.count = a.slides.length, a.syncExists = $(a.vars.sync).length > 0, "slide" === a.vars.animation && (a.vars.animation = "swing"), a.prop = c ? "top" : "marginLeft", a.args = {}, a.manualPause = !1, a.stopped = !1, a.started = !1, a.startTimeout = null, a.transitions = !a.vars.video && !v && a.vars.useCSS && function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var n in t)
                        if (void 0 !== e.style[t[n]]) return a.pfx = t[n].replace("Perspective", "").toLowerCase(), a.prop = "-" + a.pfx + "-transform", !0;
                    return !1
                }(), a.ensureAnimationEnd = "", "" !== a.vars.controlsContainer && (a.controlsContainer = $(a.vars.controlsContainer).length > 0 && $(a.vars.controlsContainer)), "" !== a.vars.manualControls && (a.manualControls = $(a.vars.manualControls).length > 0 && $(a.vars.manualControls)), "" !== a.vars.customDirectionNav && (a.customDirectionNav = 2 === $(a.vars.customDirectionNav).length && $(a.vars.customDirectionNav)), a.vars.randomize && (a.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), a.container.empty().append(a.slides)), a.doMath(), a.setup("init"), a.vars.controlNav && m.controlNav.setup(), a.vars.directionNav && m.directionNav.setup(), a.vars.keyboard && (1 === $(a.containerSelector).length || a.vars.multipleKeyboard) && $(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!a.animating && (39 === t || 37 === t)) {
                        var n = 39 === t ? a.getTarget("next") : 37 === t ? a.getTarget("prev") : !1;
                        a.flexAnimate(n, a.vars.pauseOnAction)
                    }
                }), a.vars.mousewheel && a.bind("mousewheel", function(e, t, n, i) {
                    e.preventDefault();
                    var s = a.getTarget(0 > t ? "next" : "prev");
                    a.flexAnimate(s, a.vars.pauseOnAction)
                }), a.vars.pausePlay && m.pausePlay.setup(), a.vars.slideshow && a.vars.pauseInvisible && m.pauseInvisible.init(), a.vars.slideshow && (a.vars.pauseOnHover && a.hover(function() {
                    a.manualPlay || a.manualPause || a.pause()
                }, function() {
                    a.manualPause || a.manualPlay || a.stopped || a.play()
                }), a.vars.pauseInvisible && m.pauseInvisible.isHidden() || (a.vars.initDelay > 0 ? a.startTimeout = setTimeout(a.play, a.vars.initDelay) : a.play())), p && m.asNav.setup(), s && a.vars.touch && m.touch(), (!v || v && a.vars.smoothHeight) && $(window).bind("resize orientationchange focus", m.resize), a.find("img").attr("draggable", "false"), setTimeout(function() {
                    a.vars.start(a)
                }, 200)
            },
            asNav: {
                setup: function() {
                    a.asNav = !0, a.animatingTo = Math.floor(a.currentSlide / a.move), a.currentItem = a.currentSlide, a.slides.removeClass(n + "active-slide").eq(a.currentItem).addClass(n + "active-slide"), i ? (e._slider = a, a.slides.each(function() {
                        var e = this;
                        e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), e.addEventListener("MSGestureTap", function(e) {
                            e.preventDefault();
                            var t = $(this),
                                n = t.index();
                            $(a.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (a.direction = a.currentItem < n ? "next" : "prev", a.flexAnimate(n, a.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : a.slides.on(r, function(e) {
                        e.preventDefault();
                        var t = $(this),
                            i = t.index(),
                            s = t.offset().left - $(a).scrollLeft();
                        0 >= s && t.hasClass(n + "active-slide") ? a.flexAnimate(a.getTarget("prev"), !0) : $(a.vars.asNavFor).data("flexslider").animating || t.hasClass(n + "active-slide") || (a.direction = a.currentItem < i ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    a.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var e = "thumbnails" === a.vars.controlNav ? "control-thumbs" : "control-paging",
                        t = 1,
                        i, s;
                    if (a.controlNavScaffold = $('<ol class="' + n + "control-nav " + n + e + '"></ol>'), a.pagingCount > 1)
                        for (var l = 0; l < a.pagingCount; l++) {
                            if (s = a.slides.eq(l), i = "thumbnails" === a.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"/>' : "<a>" + t + "</a>", "thumbnails" === a.vars.controlNav && !0 === a.vars.thumbCaptions) {
                                var c = s.attr("data-thumbcaption");
                                "" !== c && void 0 !== c && (i += '<span class="' + n + 'caption">' + c + "</span>")
                            }
                            a.controlNavScaffold.append("<li>" + i + "</li>"), t++
                        }
                    a.controlsContainer ? $(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), a.controlNavScaffold.delegate("a, img", r, function(e) {
                        if (e.preventDefault(), "" === o || o === e.type) {
                            var t = $(this),
                                i = a.controlNav.index(t);
                            t.hasClass(n + "active") || (a.direction = i > a.currentSlide ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction))
                        }
                        "" === o && (o = e.type), m.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    a.controlNav = a.manualControls, m.controlNav.active(), a.controlNav.bind(r, function(e) {
                        if (e.preventDefault(), "" === o || o === e.type) {
                            var t = $(this),
                                i = a.controlNav.index(t);
                            t.hasClass(n + "active") || (a.direction = i > a.currentSlide ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction))
                        }
                        "" === o && (o = e.type), m.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var e = "thumbnails" === a.vars.controlNav ? "img" : "a";
                    a.controlNav = $("." + n + "control-nav li " + e, a.controlsContainer ? a.controlsContainer : a)
                },
                active: function() {
                    a.controlNav.removeClass(n + "active").eq(a.animatingTo).addClass(n + "active")
                },
                update: function(e, t) {
                    a.pagingCount > 1 && "add" === e ? a.controlNavScaffold.append($("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(t).closest("li").remove(), m.controlNav.set(), a.pagingCount > 1 && a.pagingCount !== a.controlNav.length ? a.update(t, e) : m.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var e = $('<ul class="' + n + 'direction-nav"><li class="' + n + 'nav-prev"><a class="' + n + 'prev ss-icon" href="#">' + a.vars.prevText + '</a></li><li class="' + n + 'nav-next ss-icon"><a class="' + n + 'next" href="#">' + a.vars.nextText + "</a></li></ul>");
                    a.customDirectionNav ? a.directionNav = a.customDirectionNav : a.controlsContainer ? ($(a.controlsContainer).append(e), a.directionNav = $("." + n + "direction-nav li a", a.controlsContainer)) : (a.append(e), a.directionNav = $("." + n + "direction-nav li a", a)), m.directionNav.update(), a.directionNav.bind(r, function(e) {
                        e.preventDefault();
                        var t;
                        ("" === o || o === e.type) && (t = a.getTarget($(this).hasClass(n + "next") ? "next" : "prev"), a.flexAnimate(t, a.vars.pauseOnAction)), "" === o && (o = e.type), m.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = n + "disabled";
                    1 === a.pagingCount ? a.directionNav.addClass(e).attr("tabindex", "-1") : a.vars.animationLoop ? a.directionNav.removeClass(e).removeAttr("tabindex") : 0 === a.animatingTo ? a.directionNav.removeClass(e).filter("." + n + "prev").addClass(e).attr("tabindex", "-1") : a.animatingTo === a.last ? a.directionNav.removeClass(e).filter("." + n + "next").addClass(e).attr("tabindex", "-1") : a.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var e = $('<div class="' + n + 'pauseplay"><a></a></div>');
                    a.controlsContainer ? (a.controlsContainer.append(e), a.pausePlay = $("." + n + "pauseplay a", a.controlsContainer)) : (a.append(e), a.pausePlay = $("." + n + "pauseplay a", a)), m.pausePlay.update(a.vars.slideshow ? n + "pause" : n + "play"), a.pausePlay.bind(r, function(e) {
                        e.preventDefault(), ("" === o || o === e.type) && ($(this).hasClass(n + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play())), "" === o && (o = e.type), m.setToClearWatchedEvent()
                    })
                },
                update: function(e) {
                    "play" === e ? a.pausePlay.removeClass(n + "pause").addClass(n + "play").html(a.vars.playText) : a.pausePlay.removeClass(n + "play").addClass(n + "pause").html(a.vars.pauseText)
                }
            },
            touch: function() {
                function t(t) {
                    t.stopPropagation(), a.animating ? t.preventDefault() : (a.pause(), e._gesture.addPointer(t.pointerId), w = 0, p = c ? a.h : a.w, f = Number(new Date), l = u && d && a.animatingTo === a.last ? 0 : u && d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : u && a.currentSlide === a.last ? a.limit : u ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : d ? (a.last - a.currentSlide + a.cloneOffset) * p : (a.currentSlide + a.cloneOffset) * p)
                }

                function n(t) {
                    t.stopPropagation();
                    var a = t.target._slider;
                    if (a) {
                        var n = -t.translationX,
                            i = -t.translationY;
                        return w += c ? i : n, m = w, y = c ? Math.abs(w) < Math.abs(-n) : Math.abs(w) < Math.abs(-i), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() {
                            e._gesture.stop()
                        }) : void((!y || Number(new Date) - f > 500) && (t.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (m = w / (0 === a.currentSlide && 0 > w || a.currentSlide === a.last && w > 0 ? Math.abs(w) / p + 2 : 1)), a.setProps(l + m, "setTouch"))))
                    }
                }

                function s(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        if (t.animatingTo === t.currentSlide && !y && null !== m) {
                            var a = d ? -m : m,
                                n = t.getTarget(a > 0 ? "next" : "prev");
                            t.canAdvance(n) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > p / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : v || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                        }
                        r = null, o = null, m = null, l = null, w = 0
                    }
                }
                var r, o, l, p, m, f, g, h, S, y = !1,
                    x = 0,
                    b = 0,
                    w = 0;
                i ? (e.style.msTouchAction = "none", e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", t, !1), e._slider = a, e.addEventListener("MSGestureChange", n, !1), e.addEventListener("MSGestureEnd", s, !1)) : (g = function(t) {
                    a.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (a.pause(), p = c ? a.h : a.w, f = Number(new Date), x = t.touches[0].pageX, b = t.touches[0].pageY, l = u && d && a.animatingTo === a.last ? 0 : u && d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : u && a.currentSlide === a.last ? a.limit : u ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : d ? (a.last - a.currentSlide + a.cloneOffset) * p : (a.currentSlide + a.cloneOffset) * p, r = c ? b : x, o = c ? x : b, e.addEventListener("touchmove", h, !1), e.addEventListener("touchend", S, !1))
                }, h = function(e) {
                    x = e.touches[0].pageX, b = e.touches[0].pageY, m = c ? r - b : r - x, y = c ? Math.abs(m) < Math.abs(x - o) : Math.abs(m) < Math.abs(b - o);
                    var t = 500;
                    (!y || Number(new Date) - f > t) && (e.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (m /= 0 === a.currentSlide && 0 > m || a.currentSlide === a.last && m > 0 ? Math.abs(m) / p + 2 : 1), a.setProps(l + m, "setTouch")))
                }, S = function(t) {
                    if (e.removeEventListener("touchmove", h, !1), a.animatingTo === a.currentSlide && !y && null !== m) {
                        var n = d ? -m : m,
                            i = a.getTarget(n > 0 ? "next" : "prev");
                        a.canAdvance(i) && (Number(new Date) - f < 550 && Math.abs(n) > 50 || Math.abs(n) > p / 2) ? a.flexAnimate(i, a.vars.pauseOnAction) : v || a.flexAnimate(a.currentSlide, a.vars.pauseOnAction, !0)
                    }
                    e.removeEventListener("touchend", S, !1), r = null, o = null, m = null, l = null
                }, e.addEventListener("touchstart", g, !1))
            },
            resize: function() {
                !a.animating && a.is(":visible") && (u || a.doMath(), v ? m.smoothHeight() : u ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : c ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal")) : (a.vars.smoothHeight && m.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")))
            },
            smoothHeight: function(e) {
                if (!c || v) {
                    var t = v ? a : a.viewport;
                    e ? t.animate({
                        height: a.slides.eq(a.animatingTo).height()
                    }, e) : t.height(a.slides.eq(a.animatingTo).height())
                }
            },
            sync: function(e) {
                var t = $(a.vars.sync).data("flexslider"),
                    n = a.animatingTo;
                switch (e) {
                    case "animate":
                        t.flexAnimate(n, a.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        t.playing || t.asNav || t.play();
                        break;
                    case "pause":
                        t.pause()
                }
            },
            uniqueID: function(e) {
                return e.filter("[id]").add(e.find("[id]")).each(function() {
                    var e = $(this);
                    e.attr("id", e.attr("id") + "_clone")
                }), e
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = m.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function() {
                            m.pauseInvisible.isHidden() ? a.startTimeout ? clearTimeout(a.startTimeout) : a.pause() : a.started ? a.play() : a.vars.initDelay > 0 ? setTimeout(a.play, a.vars.initDelay) : a.play()
                        })
                    }
                },
                isHidden: function() {
                    var e = m.pauseInvisible.getHiddenProp();
                    return e ? document[e] : !1
                },
                getHiddenProp: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(l), l = setTimeout(function() {
                    o = ""
                }, 3e3)
            }
        }, a.flexAnimate = function(e, t, i, r, o) {
            if (a.vars.animationLoop || e === a.currentSlide || (a.direction = e > a.currentSlide ? "next" : "prev"), p && 1 === a.pagingCount && (a.direction = a.currentItem < e ? "next" : "prev"), !a.animating && (a.canAdvance(e, o) || i) && a.is(":visible")) {
                if (p && r) {
                    var l = $(a.vars.asNavFor).data("flexslider");
                    if (a.atEnd = 0 === e || e === a.count - 1, l.flexAnimate(e, !0, !1, !0, o), a.direction = a.currentItem < e ? "next" : "prev", l.direction = a.direction, Math.ceil((e + 1) / a.visible) - 1 === a.currentSlide || 0 === e) return a.currentItem = e, a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), !1;
                    a.currentItem = e, a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), e = Math.floor(e / a.visible)
                }
                if (a.animating = !0, a.animatingTo = e, t && a.pause(), a.vars.before(a), a.syncExists && !o && m.sync("animate"), a.vars.controlNav && m.controlNav.active(), u || a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), a.atEnd = 0 === e || e === a.last, a.vars.directionNav && m.directionNav.update(), e === a.last && (a.vars.end(a), a.vars.animationLoop || a.pause()), v) s ? (a.slides.eq(a.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), a.slides.eq(e).css({
                    opacity: 1,
                    zIndex: 2
                }), a.wrapup(f)) : (a.slides.eq(a.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, a.vars.animationSpeed, a.vars.easing), a.slides.eq(e).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, a.vars.animationSpeed, a.vars.easing, a.wrapup));
                else {
                    var f = c ? a.slides.filter(":first").height() : a.computedW,
                        g, h, S;
                    u ? (g = a.vars.itemMargin, S = (a.itemW + g) * a.move * a.animatingTo, h = S > a.limit && 1 !== a.visible ? a.limit : S) : h = 0 === a.currentSlide && e === a.count - 1 && a.vars.animationLoop && "next" !== a.direction ? d ? (a.count + a.cloneOffset) * f : 0 : a.currentSlide === a.last && 0 === e && a.vars.animationLoop && "prev" !== a.direction ? d ? 0 : (a.count + 1) * f : d ? (a.count - 1 - e + a.cloneOffset) * f : (e + a.cloneOffset) * f, a.setProps(h, "", a.vars.animationSpeed), a.transitions ? (a.vars.animationLoop && a.atEnd || (a.animating = !1, a.currentSlide = a.animatingTo), a.container.unbind("webkitTransitionEnd transitionend"), a.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(a.ensureAnimationEnd), a.wrapup(f)
                    }), clearTimeout(a.ensureAnimationEnd), a.ensureAnimationEnd = setTimeout(function() {
                        a.wrapup(f)
                    }, a.vars.animationSpeed + 100)) : a.container.animate(a.args, a.vars.animationSpeed, a.vars.easing, function() {
                        a.wrapup(f)
                    })
                }
                a.vars.smoothHeight && m.smoothHeight(a.vars.animationSpeed)
            }
        }, a.wrapup = function(e) {
            v || u || (0 === a.currentSlide && a.animatingTo === a.last && a.vars.animationLoop ? a.setProps(e, "jumpEnd") : a.currentSlide === a.last && 0 === a.animatingTo && a.vars.animationLoop && a.setProps(e, "jumpStart")), a.animating = !1, a.currentSlide = a.animatingTo, a.vars.after(a)
        }, a.animateSlides = function() {
            !a.animating && f && a.flexAnimate(a.getTarget("next"))
        }, a.pause = function() {
            clearInterval(a.animatedSlides), a.animatedSlides = null, a.playing = !1, a.vars.pausePlay && m.pausePlay.update("play"), a.syncExists && m.sync("pause")
        }, a.play = function() {
            a.playing && clearInterval(a.animatedSlides), a.animatedSlides = a.animatedSlides || setInterval(a.animateSlides, a.vars.slideshowSpeed), a.started = a.playing = !0, a.vars.pausePlay && m.pausePlay.update("pause"), a.syncExists && m.sync("play")
        }, a.stop = function() {
            a.pause(), a.stopped = !0
        }, a.canAdvance = function(e, t) {
            var n = p ? a.pagingCount - 1 : a.last;
            return t ? !0 : p && a.currentItem === a.count - 1 && 0 === e && "prev" === a.direction ? !0 : p && 0 === a.currentItem && e === a.pagingCount - 1 && "next" !== a.direction ? !1 : e !== a.currentSlide || p ? a.vars.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && e === n && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === n && 0 === e && "next" === a.direction ? !1 : !0 : !1
        }, a.getTarget = function(e) {
            return a.direction = e, "next" === e ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1
        }, a.setProps = function(e, t, n) {
            var i = function() {
                var n = e ? e : (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo,
                    i = function() {
                        if (u) return "setTouch" === t ? e : d && a.animatingTo === a.last ? 0 : d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : n;
                        switch (t) {
                            case "setTotal":
                                return d ? (a.count - 1 - a.currentSlide + a.cloneOffset) * e : (a.currentSlide + a.cloneOffset) * e;
                            case "setTouch":
                                return d ? e : e;
                            case "jumpEnd":
                                return d ? e : a.count * e;
                            case "jumpStart":
                                return d ? a.count * e : e;
                            default:
                                return e
                        }
                    }();
                return -1 * i + "px"
            }();
            a.transitions && (i = c ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", n = void 0 !== n ? n / 1e3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", n), a.container.css("transition-duration", n)), a.args[a.prop] = i, (a.transitions || void 0 === n) && a.container.css(a.args), a.container.css("transform", i)
        }, a.setup = function(e) {
            if (v) a.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === e && (s ? a.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + a.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(a.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : 0 == a.vars.fadeFirstSlide ? a.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(a.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : a.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(a.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, a.vars.animationSpeed, a.vars.easing)), a.vars.smoothHeight && m.smoothHeight();
            else {
                var t, i;
                "init" === e && (a.viewport = $('<div class="' + n + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset = 0, d && (i = $.makeArray(a.slides).reverse(), a.slides = $(i), a.container.empty().append(a.slides))), a.vars.animationLoop && !u && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== e && a.container.find(".clone").remove(), a.container.append(m.uniqueID(a.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(a.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), a.newSlides = $(a.vars.selector, a), t = d ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset, c && !u ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    a.newSlides.css({
                        display: "block"
                    }), a.doMath(), a.viewport.height(a.h), a.setProps(t * a.h, "init")
                }, "init" === e ? 100 : 0)) : (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(t * a.computedW, "init"), setTimeout(function() {
                    a.doMath(), a.newSlides.css({
                        width: a.computedW,
                        "float": "left",
                        display: "block"
                    }), a.vars.smoothHeight && m.smoothHeight()
                }, "init" === e ? 100 : 0))
            }
            u || a.slides.removeClass(n + "active-slide").eq(a.currentSlide).addClass(n + "active-slide"), a.vars.init(a)
        }, a.doMath = function() {
            var e = a.slides.first(),
                t = a.vars.itemMargin,
                n = a.vars.minItems,
                i = a.vars.maxItems;
            a.w = void 0 === a.viewport ? a.width() : a.viewport.width(), a.h = e.height(), a.boxPadding = e.outerWidth() - e.width(), u ? (a.itemT = a.vars.itemWidth + t, a.minW = n ? n * a.itemT : a.w, a.maxW = i ? i * a.itemT - t : a.w, a.itemW = a.minW > a.w ? (a.w - t * (n - 1)) / n : a.maxW < a.w ? (a.w - t * (i - 1)) / i : a.vars.itemWidth > a.w ? a.w : a.vars.itemWidth, a.visible = Math.floor(a.w / a.itemW), a.move = a.vars.move > 0 && a.vars.move < a.visible ? a.vars.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : a.vars.itemWidth > a.w ? a.itemW * (a.count - 1) + t * (a.count - 1) : (a.itemW + t) * a.count - a.w - t) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1), a.computedW = a.itemW - a.boxPadding
        }, a.update = function(e, t) {
            a.doMath(), u || (e < a.currentSlide ? a.currentSlide += 1 : e <= a.currentSlide && 0 !== e && (a.currentSlide -= 1), a.animatingTo = a.currentSlide), a.vars.controlNav && !a.manualControls && ("add" === t && !u || a.pagingCount > a.controlNav.length ? m.controlNav.update("add") : ("remove" === t && !u || a.pagingCount < a.controlNav.length) && (u && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1), m.controlNav.update("remove", a.last))), a.vars.directionNav && m.directionNav.update()
        }, a.addSlide = function(e, t) {
            var n = $(e);
            a.count += 1, a.last = a.count - 1, c && d ? void 0 !== t ? a.slides.eq(a.count - t).after(n) : a.container.prepend(n) : void 0 !== t ? a.slides.eq(t).before(n) : a.container.append(n), a.update(t, "add"), a.slides = $(a.vars.selector + ":not(.clone)", a), a.setup(), a.vars.added(a)
        }, a.removeSlide = function(e) {
            var t = isNaN(e) ? a.slides.index($(e)) : e;
            a.count -= 1, a.last = a.count - 1, isNaN(e) ? $(e, a.slides).remove() : c && d ? a.slides.eq(a.last).remove() : a.slides.eq(e).remove(), a.doMath(), a.update(t, "remove"), a.slides = $(a.vars.selector + ":not(.clone)", a), a.setup(), a.vars.removed(a)
        }, m.init()
    }, $(window).blur(function(e) {
        focused = !1
    }).focus(function(e) {
        focused = !0
    }), $.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "&#x25C5;",
        nextText: "&#x25BB;",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, $.fn.flexslider = function(e) {
        if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function() {
            var t = $(this),
                a = e.selector ? e.selector : ".slides > li",
                n = t.find(a);
            1 === n.length && e.allowOneSlide === !0 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e)
        });
        var t = $(this).data("flexslider");
        switch (e) {
            case "play":
                t.play();
                break;
            case "pause":
                t.pause();
                break;
            case "stop":
                t.stop();
                break;
            case "next":
                t.flexAnimate(t.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                t.flexAnimate(t.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof e && t.flexAnimate(e, !0)
        }
    }
}(jQuery);

/*
 * jQuery mmenu v4.3.6
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT license:
 * http://en.wikipedia.org/wiki/MIT_License
 */
! function(e) {
    function n(n, s, t) {
        if (t) {
            if ("object" != typeof n && (n = {}), "boolean" != typeof n.isMenu) {
                var o = t.children();
                n.isMenu = 1 == o.length && o.is(s.panelNodetype)
            }
            return n
        }
        n = e.extend(!0, {}, e[i].defaults, n), ("top" == n.position || "bottom" == n.position) && ("back" == n.zposition || "next" == n.zposition) && (e[i].deprecated('Using position "' + n.position + '" in combination with zposition "' + n.zposition + '"', 'zposition "front"'), n.zposition = "front");
        for (var a = ["position", "zposition", "modal", "moveBackground"], l = 0, d = a.length; d > l; l++) "undefined" != typeof n[a[l]] && (e[i].deprecated('The option "' + a[l] + '"', "offCanvas." + a[l]), n.offCanvas = n.offCanvas || {}, n.offCanvas[a[l]] = n[a[l]]);
        return n
    }

    function s(n) {
        n = e.extend(!0, {}, e[i].configuration, n);
        for (var s = ["panel", "list", "selected", "label", "spacer"], t = 0, o = s.length; o > t; t++) "undefined" != typeof n[s[t] + "Class"] && (e[i].deprecated('The configuration option "' + s[t] + 'Class"', "classNames." + s[t]), n.classNames[s[t]] = n[s[t] + "Class"]);
        if ("undefined" != typeof n.counterClass && (e[i].deprecated('The configuration option "counterClass"', "classNames.counters.counter"), n.classNames.counters = n.classNames.counters || {}, n.classNames.counters.counter = n.counterClass), "undefined" != typeof n.collapsedClass && (e[i].deprecated('The configuration option "collapsedClass"', "classNames.labels.collapsed"), n.classNames.labels = n.classNames.labels || {}, n.classNames.labels.collapsed = n.collapsedClass), "undefined" != typeof n.header)
            for (var s = ["panelHeader", "panelNext", "panelPrev"], t = 0, o = s.length; o > t; t++) "undefined" != typeof n.header[s[t] + "Class"] && (e[i].deprecated('The configuration option "header.' + s[t] + 'Class"', "classNames.header." + s[t]), n.classNames.header = n.classNames.header || {}, n.classNames.header[s[t]] = n.header[s[t] + "Class"]);
        for (var s = ["pageNodetype", "pageSelector", "menuWrapperSelector", "menuInjectMethod"], t = 0, o = s.length; o > t; t++) "undefined" != typeof n[s[t]] && (e[i].deprecated('The configuration option "' + s[t] + '"', "offCanvas." + s[t]), n.offCanvas = n.offCanvas || {}, n.offCanvas[s[t]] = n[s[t]]);
        return n
    }

    function t() {
        r = !0, u.$wndw = e(window), u.$html = e("html"), u.$body = e("body"), e.each([a, l, d], function(e, n) {
            n.add = function(e) {
                e = e.split(" ");
                for (var s in e) n[e[s]] = n.mm(e[s])
            }
        }), a.mm = function(e) {
            return "mm-" + e
        }, a.add("wrapper menu ismenu inline panel list subtitle selected label spacer current highest hidden opened subopened subopen fullsubopen subclose"), a.umm = function(e) {
            return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
        }, l.mm = function(e) {
            return "mm-" + e
        }, l.add("parent"), d.mm = function(e) {
            return e + ".mm"
        }, d.add("toggle open close setSelected transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend scroll resize click keydown keyup"), e[i]._c = a, e[i]._d = l, e[i]._e = d, e[i].glbl = u
    }
    var i = "mmenu",
        o = "4.3.6";
    if (!e[i]) {
        var a = {},
            l = {},
            d = {},
            r = !1,
            u = {
                $wndw: null,
                $html: null,
                $body: null
            };
        e[i] = function(e, n, s) {
                return this.$menu = e, this.opts = n, this.conf = s, this.vars = {}, this._init(), this
            }, e[i].uniqueId = 0, e[i].prototype = {
                _init: function() {
                    if (this.opts = n(this.opts, this.conf, this.$menu), this._initMenu(), this._initPanels(), this._initLinks(), this._bindCustomEvents(), e[i].addons)
                        for (var s = 0; s < e[i].addons.length; s++) "function" == typeof this["_addon_" + e[i].addons[s]] && this["_addon_" + e[i].addons[s]]()
                },
                _bindCustomEvents: function() {
                    var n = this,
                        s = this.$menu.find(this.opts.isMenu && !this.opts.slidingSubmenus ? "ul, ol" : "." + a.panel);
                    s.off(d.toggle + " " + d.open + " " + d.close).on(d.toggle + " " + d.open + " " + d.close, function(e) {
                        e.stopPropagation()
                    }), this.opts.slidingSubmenus ? s.on(d.open, function() {
                        return n._openSubmenuHorizontal(e(this))
                    }) : s.on(d.toggle, function() {
                        var n = e(this);
                        return n.triggerHandler(n.parent().hasClass(a.opened) ? d.close : d.open)
                    }).on(d.open, function() {
                        return e(this).parent().addClass(a.opened), "open"
                    }).on(d.close, function() {
                        return e(this).parent().removeClass(a.opened), "close"
                    })
                },
                _initMenu: function() {
                    this.opts.offCanvas && this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("*")).filter("[id]").each(function() {
                        e(this).attr("id", a.mm(e(this).attr("id")))
                    })), this.$menu.contents().each(function() {
                        3 == e(this)[0].nodeType && e(this).remove()
                    }), this.$menu.parent().addClass(a.wrapper);
                    var n = [a.menu];
                    n.push(a.mm(this.opts.slidingSubmenus ? "horizontal" : "vertical")), this.opts.classes && n.push(this.opts.classes), this.opts.isMenu && n.push(a.ismenu), this.$menu.addClass(n.join(" "))
                },
                _initPanels: function() {
                    var n = this;
                    this.__refactorClass(e("." + this.conf.classNames.list, this.$menu), this.conf.classNames.list, "list"), this.opts.isMenu && e("ul, ol", this.$menu).not(".mm-nolist").addClass(a.list);
                    var s = e("." + a.list + " > li", this.$menu);
                    this.__refactorClass(s, this.conf.classNames.selected, "selected"), this.__refactorClass(s, this.conf.classNames.label, "label"), this.__refactorClass(s, this.conf.classNames.spacer, "spacer"), s.off(d.setSelected).on(d.setSelected, function(n, t) {
                        n.stopPropagation(), s.removeClass(a.selected), "boolean" != typeof t && (t = !0), t && e(this).addClass(a.selected)
                    }), this.__refactorClass(e("." + this.conf.classNames.panel, this.$menu), this.conf.classNames.panel, "panel"), this.$menu.children().filter(this.conf.panelNodetype).add(this.$menu.find("." + a.list).children().children().filter(this.conf.panelNodetype)).addClass(a.panel);
                    var t = e("." + a.panel, this.$menu);
                    t.each(function() {
                        var s = e(this),
                            t = s.attr("id") || n.__getUniqueId();
                        s.attr("id", t)
                    }), t.find("." + a.panel).each(function() {
                        var s = e(this),
                            t = s.is("ul, ol") ? s : s.find("ul ,ol").first(),
                            i = s.parent(),
                            o = i.find("> a, > span"),
                            d = i.closest("." + a.panel);
                        if (s.data(l.parent, i), i.parent().is("." + a.list)) {
                            var r = e('<a class="' + a.subopen + '" href="#' + s.attr("id") + '" />').insertBefore(o);
                            o.is("a") || r.addClass(a.fullsubopen), n.opts.slidingSubmenus && t.prepend('<li class="' + a.subtitle + '"><a class="' + a.subclose + '" href="#' + d.attr("id") + '">' + o.text() + "</a></li>")
                        }
                    });
                    var i = this.opts.slidingSubmenus ? d.open : d.toggle;
                    if (t.each(function() {
                            var s = e(this),
                                t = s.attr("id");
                            e('a[href="#' + t + '"]', n.$menu).off(d.click).on(d.click, function(e) {
                                e.preventDefault(), s.trigger(i)
                            })
                        }), this.opts.slidingSubmenus) {
                        var o = e("." + a.list + " > li." + a.selected, this.$menu);
                        o.parents("li").removeClass(a.selected).end().add(o.parents("li")).each(function() {
                            var n = e(this),
                                s = n.find("> ." + a.panel);
                            s.length && (n.parents("." + a.panel).addClass(a.subopened), s.addClass(a.opened))
                        }).closest("." + a.panel).addClass(a.opened).parents("." + a.panel).addClass(a.subopened)
                    } else {
                        var o = e("li." + a.selected, this.$menu);
                        o.parents("li").removeClass(a.selected).end().add(o.parents("li")).addClass(a.opened)
                    }
                    var r = t.filter("." + a.opened);
                    r.length || (r = t.first()), r.addClass(a.opened).last().addClass(a.current), this.opts.slidingSubmenus && t.not(r.last()).addClass(a.hidden).end().find("." + a.panel).appendTo(this.$menu)
                },
                _initLinks: function() {
                    var n = this;
                    e("." + a.list + " > li > a", this.$menu).not("." + a.subopen).not("." + a.subclose).not('[rel="external"]').not('[target="_blank"]').off(d.click).on(d.click, function(s) {
                        var t = e(this),
                            i = t.attr("href") || "";
                        n.__valueOrFn(n.opts.onClick.setSelected, t) && t.parent().trigger(d.setSelected);
                        var o = n.__valueOrFn(n.opts.onClick.preventDefault, t, "#" == i.slice(0, 1));
                        o && s.preventDefault(), n.__valueOrFn(n.opts.onClick.blockUI, t, !o) && u.$html.addClass(a.blocking), n.__valueOrFn(n.opts.onClick.close, t, o) && n.$menu.triggerHandler(d.close)
                    })
                },
                _openSubmenuHorizontal: function(n) {
                    if (n.hasClass(a.current)) return !1;
                    var s = e("." + a.panel, this.$menu),
                        t = s.filter("." + a.current);
                    return s.removeClass(a.highest).removeClass(a.current).not(n).not(t).addClass(a.hidden), n.hasClass(a.opened) ? t.addClass(a.highest).removeClass(a.opened).removeClass(a.subopened) : (n.addClass(a.highest), t.addClass(a.subopened)), n.removeClass(a.hidden).addClass(a.current), setTimeout(function() {
                        n.removeClass(a.subopened).addClass(a.opened)
                    }, this.conf.openingInterval), "open"
                },
                _update: function(e) {
                    if (this.updates || (this.updates = []), "function" == typeof e) this.updates.push(e);
                    else
                        for (var n = 0, s = this.updates.length; s > n; n++) this.updates[n].call(this, e)
                },
                __valueOrFn: function(e, n, s) {
                    return "function" == typeof e ? e.call(n[0]) : "undefined" == typeof e && "undefined" != typeof s ? s : e
                },
                __refactorClass: function(e, n, s) {
                    e.filter("." + n).removeClass(n).addClass(a[s])
                },
                __transitionend: function(e, n, s) {
                    var t = !1,
                        i = function() {
                            t || n.call(e[0]), t = !0
                        };
                    e.one(d.transitionend, i), e.one(d.webkitTransitionEnd, i), setTimeout(i, 1.1 * s)
                },
                __getUniqueId: function() {
                    return a.mm(e[i].uniqueId++)
                }
            }, e.fn[i] = function(o, a) {
                return r || t(), o = n(o, a), a = s(a), this.each(function() {
                    var n = e(this);
                    n.data(i) || n.data(i, new e[i](n, o, a))
                })
            }, e[i].version = o, e[i].defaults = {
                classes: "",
                slidingSubmenus: !0,
                onClick: {
                    setSelected: !0
                }
            }, e[i].configuration = {
                panelNodetype: "ul, ol, div",
                transitionDuration: 400,
                openingInterval: 25,
                classNames: {
                    panel: "Panle",
                    list: "List",
                    selected: "Selected",
                    label: "Label",
                    spacer: "Spacer"
                }
            },
            function() {
                var n = window.document,
                    s = window.navigator.userAgent,
                    t = "ontouchstart" in n,
                    o = "WebkitOverflowScrolling" in n.documentElement.style,
                    a = function() {
                        return s.indexOf("Android") >= 0 ? 2.4 > parseFloat(s.slice(s.indexOf("Android") + 8)) : !1
                    }();
                e[i].support = {
                    touch: t,
                    oldAndroidBrowser: a,
                    overflowscrolling: function() {
                        return t ? o ? !0 : a ? !1 : !0 : !0
                    }()
                }
            }(), e[i].debug = function() {}, e[i].deprecated = function(e, n) {
                "undefined" != typeof console && "undefined" != typeof console.warn && console.warn("MMENU: " + e + " is deprecated, use " + n + " instead.")
            }
    }
}(jQuery);
/*
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */
! function(e) {
    function o(e) {
        return e
    }

    function t(e) {
        return "string" != typeof e.pageSelector && (e.pageSelector = "> " + e.pageNodetype), e
    }

    function n() {
        d = !0, s = e[r]._c, i = e[r]._d, a = e[r]._e, s.add("offcanvas modal background opening blocker page"), i.add("style"), a.add("opening opened closing closed setPage"), p = e[r].glbl, p.$allMenus = (p.$allMenus || e()).add(this.$menu), p.$wndw.on(a.keydown, function(e) {
            return p.$html.hasClass(s.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0
        });
        var o = 0;
        p.$wndw.on(a.resize, function(e, t) {
            if (t || p.$html.hasClass(s.opened)) {
                var n = p.$wndw.height();
                (t || n != o) && (o = n, p.$page.css("minHeight", n))
            }
        })
    }
    var s, i, a, p, r = "mmenu",
        l = "offCanvas",
        d = !1;
    e[r].prototype["_addon_" + l] = function() {
        if (!this.opts[l]) return this;
        d || n(), this.opts[l] = o(this.opts[l]), this.conf[l] = t(this.conf[l]), "boolean" != typeof this.vars.opened && (this.vars.opened = !1);
        var e = this.opts[l],
            i = this.conf[l],
            a = [s.offcanvas];
        "left" != e.position && a.push(s.mm(e.position)), "back" != e.zposition && a.push(s.mm(e.zposition)), this.$menu.addClass(a.join(" ")).parent().removeClass(s.wrapper), this[l + "_initPage"](p.$page), this[l + "_initBlocker"](), this[l + "_initOpenClose"](), this[l + "_bindCustomEvents"](), this.$menu[i.menuInjectMethod + "To"](i.menuWrapperSelector)
    }, e[r].addons = e[r].addons || [], e[r].addons.push(l), e[r].defaults[l] = {
        position: "left",
        zposition: "back",
        modal: !1,
        moveBackground: !0
    }, e[r].configuration[l] = {
        pageNodetype: "div",
        pageSelector: null,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend"
    }, e[r].prototype.open = function() {
        if (this.vars.opened) return !1;
        var e = this;
        return this._openSetup(), setTimeout(function() {
            e._openFinish()
        }, 25), "open"
    }, e[r].prototype._openSetup = function() {
        p.$allMenus.not(this.$menu).trigger(a.close), p.$page.data(i.style, p.$page.attr("style") || ""), p.$wndw.trigger(a.resize, [!0]);
        var e = [s.opened];
        this.opts[l].modal && e.push(s.modal), this.opts[l].moveBackground && e.push(s.background), "left" != this.opts[l].position && e.push(s.mm(this.opts[l].position)), "back" != this.opts[l].zposition && e.push(s.mm(this.opts[l].zposition)), this.opts.classes && e.push(this.opts.classes), p.$html.addClass(e.join(" ")), this.$menu.addClass(s.current + " " + s.opened)
    }, e[r].prototype._openFinish = function() {
        var e = this;
        this.__transitionend(p.$page, function() {
            e.$menu.trigger(a.opened)
        }, this.conf.transitionDuration), this.vars.opened = !0, p.$html.addClass(s.opening), this.$menu.trigger(a.opening)
    }, e[r].prototype.close = function() {
        if (!this.vars.opened) return !1;
        var e = this;
        return this.__transitionend(p.$page, function() {
            e.$menu.removeClass(s.current).removeClass(s.opened), p.$html.removeClass(s.opened).removeClass(s.modal).removeClass(s.background).removeClass(s.mm(e.opts[l].position)).removeClass(s.mm(e.opts[l].zposition)), e.opts.classes && p.$html.removeClass(e.opts.classes), p.$page.attr("style", p.$page.data(i.style)), e.vars.opened = !1, e.$menu.trigger(a.closed)
        }, this.conf.transitionDuration), p.$html.removeClass(s.opening), this.$menu.trigger(a.closing), "close"
    }, e[r].prototype[l + "_initBlocker"] = function() {
        var o = this;
        p.$blck || (p.$blck = e('<div id="' + s.blocker + '" />').appendTo(p.$body)), p.$blck.off(a.touchstart).on(a.touchstart, function(e) {
            e.preventDefault(), e.stopPropagation(), p.$blck.trigger(a.mousedown)
        }).on(a.mousedown, function(e) {
            e.preventDefault(), p.$html.hasClass(s.modal) || o.close()
        })
    }, e[r].prototype[l + "_initPage"] = function(o) {
        o || (o = e(this.conf[l].pageSelector, p.$body), o.length > 1 && (e[r].debug("Multiple nodes found for the page-node, all nodes are wrapped in one <" + this.conf[l].pageNodetype + ">."), o = o.wrapAll("<" + this.conf[l].pageNodetype + " />").parent())), o.addClass(s.page), p.$page = o
    }, e[r].prototype[l + "_initOpenClose"] = function() {
        var o = this,
            t = this.$menu.attr("id");
        t && t.length && (this.conf.clone && (t = s.umm(t)), e('a[href="#' + t + '"]').off(a.click).on(a.click, function(e) {
            e.preventDefault(), o.open()
        }));
        var t = p.$page.attr("id");
        t && t.length && e('a[href="#' + t + '"]').on(a.click, function(e) {
            e.preventDefault(), o.close()
        })
    }, e[r].prototype[l + "_bindCustomEvents"] = function() {
        var e = this,
            o = a.open + " " + a.opening + " " + a.opened + " " + a.close + " " + a.closing + " " + a.closed + " " + a.setPage;
        this.$menu.off(o).on(o, function(e) {
            e.stopPropagation()
        }), this.$menu.on(a.open, function() {
            e.open()
        }).on(a.close, function() {
            e.close()
        }).on(a.setPage, function(o, t) {
            e[l + "_initPage"](t), e[l + "_initOpenClose"]()
        })
    }
}(jQuery);

/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;
(function($) {
    $.fn.unveil = function(threshold, callback) {
        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-src-retina" : "data-src",
            images = this,
            loaded;
        this.one("unveil", function() {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
            }
        });

        function unveil() {
            var inview = images.filter(function() {
                var $e = $(this),
                    wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();
                return eb >= wt - th && et <= wb + th;
            });
            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }
        $w.scroll(unveil);
        $w.resize(unveil);
        unveil();
        return this;
    };
})(window.jQuery || window.Zepto);


/*!
 * jQuery Smooth Scroll - v1.5.5 - 2015-02-19
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2015 Karl Swedberg
 * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT)
 */
(function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? t(require("jquery")) : t(jQuery)
})(function(t) {
    function e(t) {
        return t.replace(/(:|\.|\/)/g, "\\$1")
    }
    var l = "1.5.5",
        o = {},
        n = {
            exclude: [],
            excludeWithin: [],
            offset: 0,
            direction: "top",
            scrollElement: null,
            scrollTarget: null,
            beforeScroll: function() {},
            afterScroll: function() {},
            easing: "swing",
            speed: 400,
            autoCoefficient: 2,
            preventDefault: !0
        },
        s = function(e) {
            var l = [],
                o = !1,
                n = e.dir && "left" === e.dir ? "scrollLeft" : "scrollTop";
            return this.each(function() {
                if (this !== document && this !== window) {
                    var e = t(this);
                    e[n]() > 0 ? l.push(this) : (e[n](1), o = e[n]() > 0, o && l.push(this), e[n](0))
                }
            }), l.length || this.each(function() {
                "BODY" === this.nodeName && (l = [this])
            }), "first" === e.el && l.length > 1 && (l = [l[0]]), l
        };
    t.fn.extend({
        scrollable: function(t) {
            var e = s.call(this, {
                dir: t
            });
            return this.pushStack(e)
        },
        firstScrollable: function(t) {
            var e = s.call(this, {
                el: "first",
                dir: t
            });
            return this.pushStack(e)
        },
        smoothScroll: function(l, o) {
            if (l = l || {}, "options" === l) return o ? this.each(function() {
                var e = t(this),
                    l = t.extend(e.data("ssOpts") || {}, o);
                t(this).data("ssOpts", l)
            }) : this.first().data("ssOpts");
            var n = t.extend({}, t.fn.smoothScroll.defaults, l),
                s = t.smoothScroll.filterPath(location.pathname);
            return this.unbind("click.smoothscroll").bind("click.smoothscroll", function(l) {
                var o = this,
                    r = t(this),
                    i = t.extend({}, n, r.data("ssOpts") || {}),
                    c = n.exclude,
                    a = i.excludeWithin,
                    f = 0,
                    h = 0,
                    u = !0,
                    d = {},
                    p = location.hostname === o.hostname || !o.hostname,
                    m = i.scrollTarget || t.smoothScroll.filterPath(o.pathname) === s,
                    S = e(o.hash);
                if (i.scrollTarget || p && m && S) {
                    for (; u && c.length > f;) r.is(e(c[f++])) && (u = !1);
                    for (; u && a.length > h;) r.closest(a[h++]).length && (u = !1)
                } else u = !1;
                u && (i.preventDefault && l.preventDefault(), t.extend(d, i, {
                    scrollTarget: i.scrollTarget || S,
                    link: o
                }), t.smoothScroll(d))
            }), this
        }
    }), t.smoothScroll = function(e, l) {
        if ("options" === e && "object" == typeof l) return t.extend(o, l);
        var n, s, r, i, c, a = 0,
            f = "offset",
            h = "scrollTop",
            u = {},
            d = {};
        "number" == typeof e ? (n = t.extend({
            link: null
        }, t.fn.smoothScroll.defaults, o), r = e) : (n = t.extend({
            link: null
        }, t.fn.smoothScroll.defaults, e || {}, o), n.scrollElement && (f = "position", "static" === n.scrollElement.css("position") && n.scrollElement.css("position", "relative"))), h = "left" === n.direction ? "scrollLeft" : h, n.scrollElement ? (s = n.scrollElement, /^(?:HTML|BODY)$/.test(s[0].nodeName) || (a = s[h]())) : s = t("html, body").firstScrollable(n.direction), n.beforeScroll.call(s, n), r = "number" == typeof e ? e : l || t(n.scrollTarget)[f]() && t(n.scrollTarget)[f]()[n.direction] || 0, u[h] = r + a + n.offset, i = n.speed, "auto" === i && (c = u[h] - s.scrollTop(), 0 > c && (c *= -1), i = c / n.autoCoefficient), d = {
            duration: i,
            easing: n.easing,
            complete: function() {
                n.afterScroll.call(n.link, n)
            }
        }, n.step && (d.step = n.step), s.length ? s.stop().animate(u, d) : n.afterScroll.call(n.link, n)
    }, t.smoothScroll.version = l, t.smoothScroll.filterPath = function(t) {
        return t = t || "", t.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
    }, t.fn.smoothScroll.defaults = n
});

/*! skrollr 0.6.30 (2015-08-12) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
! function(a, b, c) {
    "use strict";

    function d(c) {
        if (e = b.documentElement, f = b.body, T(), ha = this, c = c || {}, ma = c.constants || {}, c.easing)
            for (var d in c.easing) W[d] = c.easing[d];
        ta = c.edgeStrategy || "set", ka = {
            beforerender: c.beforerender,
            render: c.render,
            keyframe: c.keyframe
        }, la = c.forceHeight !== !1, la && (Ka = c.scale || 1), na = c.mobileDeceleration || y, pa = c.smoothScrolling !== !1, qa = c.smoothScrollingDuration || A, ra = {
            targetTop: ha.getScrollTop()
        }, Sa = (c.mobileCheck || function() {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || a.opera)
        })(), Sa ? (ja = b.getElementById(c.skrollrBody || z), ja && ga(), X(), Ea(e, [s, v], [t])) : Ea(e, [s, u], [t]), ha.refresh(), wa(a, "resize orientationchange", function() {
            var a = e.clientWidth,
                b = e.clientHeight;
            (b !== Pa || a !== Oa) && (Pa = b, Oa = a, Qa = !0)
        });
        var g = U();
        return function h() {
            $(), va = g(h)
        }(), ha
    }
    var e, f, g = {
            get: function() {
                return ha
            },
            init: function(a) {
                return ha || new d(a)
            },
            VERSION: "0.6.30"
        },
        h = Object.prototype.hasOwnProperty,
        i = a.Math,
        j = a.getComputedStyle,
        k = "touchstart",
        l = "touchmove",
        m = "touchcancel",
        n = "touchend",
        o = "skrollable",
        p = o + "-before",
        q = o + "-between",
        r = o + "-after",
        s = "skrollr",
        t = "no-" + s,
        u = s + "-desktop",
        v = s + "-mobile",
        w = "linear",
        x = 1e3,
        y = .004,
        z = "skrollr-body",
        A = 200,
        B = "start",
        C = "end",
        D = "center",
        E = "bottom",
        F = "___skrollable_id",
        G = /^(?:input|textarea|button|select)$/i,
        H = /^\s+|\s+$/g,
        I = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
        J = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
        K = /^(@?[a-z\-]+)\[(\w+)\]$/,
        L = /-([a-z0-9_])/g,
        M = function(a, b) {
            return b.toUpperCase()
        },
        N = /[\-+]?[\d]*\.?[\d]+/g,
        O = /\{\?\}/g,
        P = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
        Q = /[a-z\-]+-gradient/g,
        R = "",
        S = "",
        T = function() {
            var a = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            if (j) {
                var b = j(f, null);
                for (var c in b)
                    if (R = c.match(a) || +c == c && b[c].match(a)) break;
                if (!R) return void(R = S = "");
                R = R[0], "-" === R.slice(0, 1) ? (S = R, R = {
                    "-webkit-": "webkit",
                    "-moz-": "Moz",
                    "-ms-": "ms",
                    "-o-": "O"
                }[R]) : S = "-" + R.toLowerCase() + "-"
            }
        },
        U = function() {
            var b = a.requestAnimationFrame || a[R.toLowerCase() + "RequestAnimationFrame"],
                c = Ha();
            return (Sa || !b) && (b = function(b) {
                var d = Ha() - c,
                    e = i.max(0, 1e3 / 60 - d);
                return a.setTimeout(function() {
                    c = Ha(), b()
                }, e)
            }), b
        },
        V = function() {
            var b = a.cancelAnimationFrame || a[R.toLowerCase() + "CancelAnimationFrame"];
            return (Sa || !b) && (b = function(b) {
                return a.clearTimeout(b)
            }), b
        },
        W = {
            begin: function() {
                return 0
            },
            end: function() {
                return 1
            },
            linear: function(a) {
                return a
            },
            quadratic: function(a) {
                return a * a
            },
            cubic: function(a) {
                return a * a * a
            },
            swing: function(a) {
                return -i.cos(a * i.PI) / 2 + .5
            },
            sqrt: function(a) {
                return i.sqrt(a)
            },
            outCubic: function(a) {
                return i.pow(a - 1, 3) + 1
            },
            bounce: function(a) {
                var b;
                if (.5083 >= a) b = 3;
                else if (.8489 >= a) b = 9;
                else if (.96208 >= a) b = 27;
                else {
                    if (!(.99981 >= a)) return 1;
                    b = 91
                }
                return 1 - i.abs(3 * i.cos(a * b * 1.028) / b)
            }
        };
    d.prototype.refresh = function(a) {
        var d, e, f = !1;
        for (a === c ? (f = !0, ia = [], Ra = 0, a = b.getElementsByTagName("*")) : a.length === c && (a = [a]), d = 0, e = a.length; e > d; d++) {
            var g = a[d],
                h = g,
                i = [],
                j = pa,
                k = ta,
                l = !1;
            if (f && F in g && delete g[F], g.attributes) {
                for (var m = 0, n = g.attributes.length; n > m; m++) {
                    var p = g.attributes[m];
                    if ("data-anchor-target" !== p.name)
                        if ("data-smooth-scrolling" !== p.name)
                            if ("data-edge-strategy" !== p.name)
                                if ("data-emit-events" !== p.name) {
                                    var q = p.name.match(I);
                                    if (null !== q) {
                                        var r = {
                                            props: p.value,
                                            element: g,
                                            eventType: p.name.replace(L, M)
                                        };
                                        i.push(r);
                                        var s = q[1];
                                        s && (r.constant = s.substr(1));
                                        var t = q[2];
                                        /p$/.test(t) ? (r.isPercentage = !0, r.offset = (0 | t.slice(0, -1)) / 100) : r.offset = 0 | t;
                                        var u = q[3],
                                            v = q[4] || u;
                                        u && u !== B && u !== C ? (r.mode = "relative", r.anchors = [u, v]) : (r.mode = "absolute", u === C ? r.isEnd = !0 : r.isPercentage || (r.offset = r.offset * Ka))
                                    }
                                } else l = !0;
                    else k = p.value;
                    else j = "off" !== p.value;
                    else if (h = b.querySelector(p.value), null === h) throw 'Unable to find anchor target "' + p.value + '"'
                }
                if (i.length) {
                    var w, x, y;
                    !f && F in g ? (y = g[F], w = ia[y].styleAttr, x = ia[y].classAttr) : (y = g[F] = Ra++, w = g.style.cssText, x = Da(g)), ia[y] = {
                        element: g,
                        styleAttr: w,
                        classAttr: x,
                        anchorTarget: h,
                        keyFrames: i,
                        smoothScrolling: j,
                        edgeStrategy: k,
                        emitEvents: l,
                        lastFrameIndex: -1
                    }, Ea(g, [o], [])
                }
            }
        }
        for (Aa(), d = 0, e = a.length; e > d; d++) {
            var z = ia[a[d][F]];
            z !== c && (_(z), ba(z))
        }
        return ha
    }, d.prototype.relativeToAbsolute = function(a, b, c) {
        var d = e.clientHeight,
            f = a.getBoundingClientRect(),
            g = f.top,
            h = f.bottom - f.top;
        return b === E ? g -= d : b === D && (g -= d / 2), c === E ? g += h : c === D && (g += h / 2), g += ha.getScrollTop(), g + .5 | 0
    }, d.prototype.animateTo = function(a, b) {
        b = b || {};
        var d = Ha(),
            e = ha.getScrollTop(),
            f = b.duration === c ? x : b.duration;
        return oa = {
            startTop: e,
            topDiff: a - e,
            targetTop: a,
            duration: f,
            startTime: d,
            endTime: d + f,
            easing: W[b.easing || w],
            done: b.done
        }, oa.topDiff || (oa.done && oa.done.call(ha, !1), oa = c), ha
    }, d.prototype.stopAnimateTo = function() {
        oa && oa.done && oa.done.call(ha, !0), oa = c
    }, d.prototype.isAnimatingTo = function() {
        return !!oa
    }, d.prototype.isMobile = function() {
        return Sa
    }, d.prototype.setScrollTop = function(b, c) {
        return sa = c === !0, Sa ? Ta = i.min(i.max(b, 0), Ja) : a.scrollTo(0, b), ha
    }, d.prototype.getScrollTop = function() {
        return Sa ? Ta : a.pageYOffset || e.scrollTop || f.scrollTop || 0
    }, d.prototype.getMaxScrollTop = function() {
        return Ja
    }, d.prototype.on = function(a, b) {
        return ka[a] = b, ha
    }, d.prototype.off = function(a) {
        return delete ka[a], ha
    }, d.prototype.destroy = function() {
        var a = V();
        a(va), ya(), Ea(e, [t], [s, u, v]);
        for (var b = 0, d = ia.length; d > b; b++) fa(ia[b].element);
        e.style.overflow = f.style.overflow = "", e.style.height = f.style.height = "", ja && g.setStyle(ja, "transform", "none"), ha = c, ja = c, ka = c, la = c, Ja = 0, Ka = 1, ma = c, na = c, La = "down", Ma = -1, Oa = 0, Pa = 0, Qa = !1, oa = c, pa = c, qa = c, ra = c, sa = c, Ra = 0, ta = c, Sa = !1, Ta = 0, ua = c
    };
    var X = function() {
            var d, g, h, j, o, p, q, r, s, t, u, v;
            wa(e, [k, l, m, n].join(" "), function(a) {
                var e = a.changedTouches[0];
                for (j = a.target; 3 === j.nodeType;) j = j.parentNode;
                switch (o = e.clientY, p = e.clientX, t = a.timeStamp, G.test(j.tagName) || a.preventDefault(), a.type) {
                    case k:
                        d && d.blur(), ha.stopAnimateTo(), d = j, g = q = o, h = p, s = t;
                        break;
                    case l:
                        G.test(j.tagName) && b.activeElement !== j && a.preventDefault(), r = o - q, v = t - u, ha.setScrollTop(Ta - r, !0), q = o, u = t;
                        break;
                    default:
                    case m:
                    case n:
                        var f = g - o,
                            w = h - p,
                            x = w * w + f * f;
                        if (49 > x) {
                            if (!G.test(d.tagName)) {
                                d.focus();
                                var y = b.createEvent("MouseEvents");
                                y.initMouseEvent("click", !0, !0, a.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), d.dispatchEvent(y)
                            }
                            return
                        }
                        d = c;
                        var z = r / v;
                        z = i.max(i.min(z, 3), -3);
                        var A = i.abs(z / na),
                            B = z * A + .5 * na * A * A,
                            C = ha.getScrollTop() - B,
                            D = 0;
                        C > Ja ? (D = (Ja - C) / B, C = Ja) : 0 > C && (D = -C / B, C = 0), A *= 1 - D, ha.animateTo(C + .5 | 0, {
                            easing: "outCubic",
                            duration: A
                        })
                }
            }), a.scrollTo(0, 0), e.style.overflow = f.style.overflow = "hidden"
        },
        Y = function() {
            var a, b, c, d, f, g, h, j, k, l, m, n = e.clientHeight,
                o = Ba();
            for (j = 0, k = ia.length; k > j; j++)
                for (a = ia[j], b = a.element, c = a.anchorTarget, d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], l = h.offset, m = o[h.constant] || 0, h.frame = l, h.isPercentage && (l *= n, h.frame = l), "relative" === h.mode && (fa(b), h.frame = ha.relativeToAbsolute(c, h.anchors[0], h.anchors[1]) - l, fa(b, !0)), h.frame += m, la && !h.isEnd && h.frame > Ja && (Ja = h.frame);
            for (Ja = i.max(Ja, Ca()), j = 0, k = ia.length; k > j; j++) {
                for (a = ia[j], d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], m = o[h.constant] || 0, h.isEnd && (h.frame = Ja - h.offset + m);
                a.keyFrames.sort(Ia)
            }
        },
        Z = function(a, b) {
            for (var c = 0, d = ia.length; d > c; c++) {
                var e, f, i = ia[c],
                    j = i.element,
                    k = i.smoothScrolling ? a : b,
                    l = i.keyFrames,
                    m = l.length,
                    n = l[0],
                    s = l[l.length - 1],
                    t = k < n.frame,
                    u = k > s.frame,
                    v = t ? n : s,
                    w = i.emitEvents,
                    x = i.lastFrameIndex;
                if (t || u) {
                    if (t && -1 === i.edge || u && 1 === i.edge) continue;
                    switch (t ? (Ea(j, [p], [r, q]), w && x > -1 && (za(j, n.eventType, La), i.lastFrameIndex = -1)) : (Ea(j, [r], [p, q]), w && m > x && (za(j, s.eventType, La), i.lastFrameIndex = m)), i.edge = t ? -1 : 1, i.edgeStrategy) {
                        case "reset":
                            fa(j);
                            continue;
                        case "ease":
                            k = v.frame;
                            break;
                        default:
                        case "set":
                            var y = v.props;
                            for (e in y) h.call(y, e) && (f = ea(y[e].value), 0 === e.indexOf("@") ? j.setAttribute(e.substr(1), f) : g.setStyle(j, e, f));
                            continue
                    }
                } else 0 !== i.edge && (Ea(j, [o, q], [p, r]), i.edge = 0);
                for (var z = 0; m - 1 > z; z++)
                    if (k >= l[z].frame && k <= l[z + 1].frame) {
                        var A = l[z],
                            B = l[z + 1];
                        for (e in A.props)
                            if (h.call(A.props, e)) {
                                var C = (k - A.frame) / (B.frame - A.frame);
                                C = A.props[e].easing(C), f = da(A.props[e].value, B.props[e].value, C), f = ea(f), 0 === e.indexOf("@") ? j.setAttribute(e.substr(1), f) : g.setStyle(j, e, f)
                            }
                        w && x !== z && ("down" === La ? za(j, A.eventType, La) : za(j, B.eventType, La), i.lastFrameIndex = z);
                        break
                    }
            }
        },
        $ = function() {
            Qa && (Qa = !1, Aa());
            var a, b, d = ha.getScrollTop(),
                e = Ha();
            if (oa) e >= oa.endTime ? (d = oa.targetTop, a = oa.done, oa = c) : (b = oa.easing((e - oa.startTime) / oa.duration), d = oa.startTop + b * oa.topDiff | 0), ha.setScrollTop(d, !0);
            else if (!sa) {
                var f = ra.targetTop - d;
                f && (ra = {
                    startTop: Ma,
                    topDiff: d - Ma,
                    targetTop: d,
                    startTime: Na,
                    endTime: Na + qa
                }), e <= ra.endTime && (b = W.sqrt((e - ra.startTime) / qa), d = ra.startTop + b * ra.topDiff | 0)
            }
            if (sa || Ma !== d) {
                La = d > Ma ? "down" : Ma > d ? "up" : La, sa = !1;
                var h = {
                        curTop: d,
                        lastTop: Ma,
                        maxTop: Ja,
                        direction: La
                    },
                    i = ka.beforerender && ka.beforerender.call(ha, h);
                i !== !1 && (Z(d, ha.getScrollTop()), Sa && ja && g.setStyle(ja, "transform", "translate(0, " + -Ta + "px) " + ua), Ma = d, ka.render && ka.render.call(ha, h)), a && a.call(ha, !1)
            }
            Na = e
        },
        _ = function(a) {
            for (var b = 0, c = a.keyFrames.length; c > b; b++) {
                for (var d, e, f, g, h = a.keyFrames[b], i = {}; null !== (g = J.exec(h.props));) f = g[1], e = g[2], d = f.match(K), null !== d ? (f = d[1], d = d[2]) : d = w, e = e.indexOf("!") ? aa(e) : [e.slice(1)], i[f] = {
                    value: e,
                    easing: W[d]
                };
                h.props = i
            }
        },
        aa = function(a) {
            var b = [];
            return P.lastIndex = 0, a = a.replace(P, function(a) {
                return a.replace(N, function(a) {
                    return a / 255 * 100 + "%"
                })
            }), S && (Q.lastIndex = 0, a = a.replace(Q, function(a) {
                return S + a
            })), a = a.replace(N, function(a) {
                return b.push(+a), "{?}"
            }), b.unshift(a), b
        },
        ba = function(a) {
            var b, c, d = {};
            for (b = 0, c = a.keyFrames.length; c > b; b++) ca(a.keyFrames[b], d);
            for (d = {}, b = a.keyFrames.length - 1; b >= 0; b--) ca(a.keyFrames[b], d)
        },
        ca = function(a, b) {
            var c;
            for (c in b) h.call(a.props, c) || (a.props[c] = b[c]);
            for (c in a.props) b[c] = a.props[c]
        },
        da = function(a, b, c) {
            var d, e = a.length;
            if (e !== b.length) throw "Can't interpolate between \"" + a[0] + '" and "' + b[0] + '"';
            var f = [a[0]];
            for (d = 1; e > d; d++) f[d] = a[d] + (b[d] - a[d]) * c;
            return f
        },
        ea = function(a) {
            var b = 1;
            return O.lastIndex = 0, a[0].replace(O, function() {
                return a[b++]
            })
        },
        fa = function(a, b) {
            a = [].concat(a);
            for (var c, d, e = 0, f = a.length; f > e; e++) d = a[e], c = ia[d[F]], c && (b ? (d.style.cssText = c.dirtyStyleAttr, Ea(d, c.dirtyClassAttr)) : (c.dirtyStyleAttr = d.style.cssText, c.dirtyClassAttr = Da(d), d.style.cssText = c.styleAttr, Ea(d, c.classAttr)))
        },
        ga = function() {
            ua = "translateZ(0)", g.setStyle(ja, "transform", ua);
            var a = j(ja),
                b = a.getPropertyValue("transform"),
                c = a.getPropertyValue(S + "transform"),
                d = b && "none" !== b || c && "none" !== c;
            d || (ua = "")
        };
    g.setStyle = function(a, b, c) {
        var d = a.style;
        if (b = b.replace(L, M).replace("-", ""), "zIndex" === b) isNaN(c) ? d[b] = c : d[b] = "" + (0 | c);
        else if ("float" === b) d.styleFloat = d.cssFloat = c;
        else try {
            R && (d[R + b.slice(0, 1).toUpperCase() + b.slice(1)] = c), d[b] = c
        } catch (e) {}
    };
    var ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa = g.addEvent = function(b, c, d) {
            var e = function(b) {
                return b = b || a.event, b.target || (b.target = b.srcElement), b.preventDefault || (b.preventDefault = function() {
                    b.returnValue = !1, b.defaultPrevented = !0
                }), d.call(this, b)
            };
            c = c.split(" ");
            for (var f, g = 0, h = c.length; h > g; g++) f = c[g], b.addEventListener ? b.addEventListener(f, d, !1) : b.attachEvent("on" + f, e), Ua.push({
                element: b,
                name: f,
                listener: d
            })
        },
        xa = g.removeEvent = function(a, b, c) {
            b = b.split(" ");
            for (var d = 0, e = b.length; e > d; d++) a.removeEventListener ? a.removeEventListener(b[d], c, !1) : a.detachEvent("on" + b[d], c)
        },
        ya = function() {
            for (var a, b = 0, c = Ua.length; c > b; b++) a = Ua[b], xa(a.element, a.name, a.listener);
            Ua = []
        },
        za = function(a, b, c) {
            ka.keyframe && ka.keyframe.call(ha, a, b, c)
        },
        Aa = function() {
            var a = ha.getScrollTop();
            Ja = 0, la && !Sa && (f.style.height = ""), Y(), la && !Sa && (f.style.height = Ja + e.clientHeight + "px"), Sa ? ha.setScrollTop(i.min(ha.getScrollTop(), Ja)) : ha.setScrollTop(a, !0), sa = !0
        },
        Ba = function() {
            var a, b, c = e.clientHeight,
                d = {};
            for (a in ma) b = ma[a], "function" == typeof b ? b = b.call(ha) : /p$/.test(b) && (b = b.slice(0, -1) / 100 * c), d[a] = b;
            return d
        },
        Ca = function() {
            var a, b = 0;
            return ja && (b = i.max(ja.offsetHeight, ja.scrollHeight)), a = i.max(b, f.scrollHeight, f.offsetHeight, e.scrollHeight, e.offsetHeight, e.clientHeight), a - e.clientHeight
        },
        Da = function(b) {
            var c = "className";
            return a.SVGElement && b instanceof a.SVGElement && (b = b[c], c = "baseVal"), b[c]
        },
        Ea = function(b, d, e) {
            var f = "className";
            if (a.SVGElement && b instanceof a.SVGElement && (b = b[f], f = "baseVal"), e === c) return void(b[f] = d);
            for (var g = b[f], h = 0, i = e.length; i > h; h++) g = Ga(g).replace(Ga(e[h]), " ");
            g = Fa(g);
            for (var j = 0, k = d.length; k > j; j++) - 1 === Ga(g).indexOf(Ga(d[j])) && (g += " " + d[j]);
            b[f] = Fa(g)
        },
        Fa = function(a) {
            return a.replace(H, "")
        },
        Ga = function(a) {
            return " " + a + " "
        },
        Ha = Date.now || function() {
            return +new Date
        },
        Ia = function(a, b) {
            return a.frame - b.frame
        },
        Ja = 0,
        Ka = 1,
        La = "down",
        Ma = -1,
        Na = Ha(),
        Oa = 0,
        Pa = 0,
        Qa = !1,
        Ra = 0,
        Sa = !1,
        Ta = 0,
        Ua = [];
    "function" == typeof define && define.amd ? define([], function() {
        return g
    }) : "undefined" != typeof module && module.exports ? module.exports = g : a.skrollr = g
}(window, document);