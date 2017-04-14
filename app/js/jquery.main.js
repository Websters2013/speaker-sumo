"use strict";

( function(){

    $(function () {

        $.each( $( '.site' ), function() {
            new Sliders ( $( this ) );
        } );

        $.each( $( '.site__menu' ), function() {
            new SubMenu( $(this) );
            new Menu( $(this) );
        } );

        $.each( $( '.site__footer-menu' ), function() {
            new SubMenu( $(this) );
            new Menu( $(this) );
        } );

        $.each( $( '.form-validation' ), function() {
            new FormValidation ( $( this ) )
        } );

    } );

    var SubMenu = function (obj) {

        //private properties
        var _obj = obj,
            _items = _obj.find('.menu-item'),
            _arrow = _obj.find('.fa-chevron-down'),
            _window = $(window),
            _startWinWidth = _window.width();

        //private methods

        var _addEvents = function () {

                _window.on( {
                    resize: function () {

                        if( _startWinWidth > _window.width() ) {

                            _startWinWidth = _window.width();

                            _window.find('.opened').removeClass('opened');

                        }

                    }
                } );

                $('body').on('click', '.fa-chevron-down', function() {

                    if( jQuery(window).width() < 1000 ) {

                        var curItem = jQuery(this),
                            parent = curItem.parent('li');

                        if ( parent.hasClass('opened') ) {

                            parent.removeClass('opened');

                        } else {

                            parent.addClass('opened');

                        }

                    }

                    return false;

                });
                _arrow.on( {
                    click: function () {

                        var curItem = jQuery(this),
                            parent = curItem.parent('li');

                        if( _window.width() < 1024 ) {
                            if ( parent.hasClass('opened') ) {

                                parent.removeClass('opened');

                            } else {

                                parent.addClass('opened');

                            }
                        }


                        return false;
                    }
                } );
                _items.on( {
                    mouseenter: function() {

                        if( _window.width() >= 1024 ) {

                            var curItem = $(this),
                                parent = curItem.parent('ul');

                            curItem.addClass('opened');

                            if( parent.hasClass('sub-menu') ) {

                                var subMenu = curItem.find('.sub-menu');

                                if( ( _window.width() - ( curItem.width() + curItem.offset().left ) ) < 180 ) {

                                    subMenu.css( {
                                        left: -( subMenu.width() ),
                                        top: 0
                                    } );

                                } else {

                                    subMenu.css( {
                                        left: curItem.width(),
                                        top: 0
                                    } );

                                }


                            }

                        }

                    }
                } );
                _obj.on( 'mouseleave', function(){

                    if( _window.width() >= 1024 ) {

                        $(this).find('.opened').removeClass('opened');

                    }

                } );
                _obj.find('ul').on( 'mouseleave', function(){

                    if( _window.width() >= 1024 ) {

                        $(this).find('.opened').removeClass('opened');

                    }

                } );
                _obj.find('li').on( 'mouseleave', function(){

                    if( _window.width() >= 1024 ) {

                        $(this).removeClass('opened');

                    }

                } );

            },
            _init = function () {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Sliders = function( obj ) {

        //private properties
        var _obj = obj,
            _window = $( window ),
            _presentationSlider = _obj.find( '.presentation__list' ),
            _booksSlider = _obj.find( '.books__list' ),
            _blogSlider = _obj.find( '.blog__list' ),
            _postSlider = _obj.find( '.posts__list' ),
            _pastSlider = _obj.find( '.past__list' ),
            _presentationPrev = _obj.find( '.presentation__button-prev' ),
            _booksPrev = _obj.find( '.books__button-prev' ),
            _blogPrev = _obj.find( '.blog__button-prev' ),
            _postPrev = _obj.find( '.posts__button-prev' ),
            _pastPrev = _obj.find( '.past__button-prev' ),
            _presentationNext = _obj.find( '.presentation__button-next' ),
            _booksNext = _obj.find( '.books__button-next' ),
            _blogNext = _obj.find( '.blog__button-next' ),
            _postNext = _obj.find( '.posts__button-next' ),
            _pastNext = _obj.find( '.past__button-next' ),
            _books,
            _blog,
            _post,
            _past,
            _presentation,
            _initFlag = false;

        //private methods
        var _initSlider = function() {

                if ( _window.width() >= 1200  || _initFlag ) {
                    return false
                }

                _initFlag = true;

                _presentation = new Swiper ( _presentationSlider, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 1,
                    loop: false,
                    prevButton: _presentationPrev,
                    nextButton: _presentationNext
                } );

                _blog = new Swiper ( _blogSlider, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 1,
                    loop: false,
                    prevButton: _blogPrev,
                    nextButton: _blogNext
                } );

                _post = new Swiper ( _postSlider, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 1,
                    loop: false,
                    prevButton: _postPrev,
                    nextButton: _postNext
                } );

                _past = new Swiper ( _pastSlider, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 1,
                    loop: false,
                    prevButton: _pastPrev,
                    nextButton: _pastNext
                } );

                _books = new Swiper ( _booksSlider, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 2,
                    loop: false,
                    prevButton: _booksPrev,
                    nextButton: _booksNext,
                    breakpoints: {
                        768: {
                            slidesPerView: 1
                        }
                    }
                } );

            },
            _onEvent = function() {

                _window.on(
                    'resize', function () {

                        if ( _window.width() < 1200 ) {

                            _initSlider();

                        } else if ( _window.width() >= 1200 && _initFlag ) {

                            $( '.presentation__list' )[0].swiper.destroy( true, true );
                            $( '.books__list' )[0].swiper.destroy(true, true);
                            $( '.blog__list' )[0].swiper.destroy(true, true);
                            $( '.posts__list' )[0].swiper.destroy(true, true);
                            $( '.past__list' )[0].swiper.destroy(true, true);

                            _initFlag = false;

                        }

                    }
                )

            },
            _constructor = function() {
                _initSlider();
                _onEvent();
            };

        //public properties

        //public methods

        _constructor();
    };

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _menu = obj,
            _window = $(window),
            _action = false,
            _lastPos,
            _header = $('.site__header'),
            _showBtn = $('.site__menu-btn');

        //private methods
        var _addEvents = function () {

                _showBtn.on({
                    click: function () {

                        _openMenu($(this));

                    }
                });

                _window.on( {
                    scroll: function () {
                        _fixedHeader();
                        _action = _window.scrollTop() >= _header.innerHeight();

                    },
                    DOMMouseScroll: function (e) {

                        var delta = e.originalEvent.detail;

                        if (delta) {
                            var direction = (delta > 0) ? 1 : -1;

                            _checkScroll(direction);

                        }

                    },
                    mousewheel: function (e) {

                        var delta = e.originalEvent.wheelDelta;

                        if (delta) {
                            var direction = (delta > 0) ? -1 : 1;

                            _checkScroll(direction);

                        }

                    },
                    touchmove: function (e) {

                        var currentPos = e.originalEvent.touches[0].clientY;

                        if (currentPos > _lastPos) {

                            _checkScroll(-1);


                        } else if (currentPos < _lastPos) {

                            _checkScroll(1);

                        }

                        _lastPos = currentPos;

                    },
                    keydown: function (e) {
                        switch (e.which) {

                            case 32:
                                _checkScroll(1);
                                break;
                            case 33:
                                _checkScroll(-1);
                                break;
                            case 34 :
                                _checkScroll(1);
                                break;
                            case 35 :
                                _checkScroll(1);
                                break;
                            case 36 :
                                _checkScroll(-1);
                                break;
                            case 38:
                                _checkScroll(-1);
                                break;
                            case 40:
                                _checkScroll(1);
                                break;

                            default:
                                return;
                        }
                    }


                } );

            },
            _checkScroll = function (direction) {

                if (direction > 0 && !_header.hasClass('site__header_hidden') && !_showBtn.hasClass('opened') && _action) {

                    _header.addClass('site__header_hidden');

                }

                if (direction < 0 && _header.hasClass('site__header_hidden') && !_showBtn.hasClass('opened') && _action) {

                    _header.removeClass('site__header_hidden');

                }

            },
            _fixedHeader = function () {

                if (_window.scrollTop() > 0) {

                    _header.addClass('fixed');

                } else {

                    _header.removeClass('fixed');

                }

            },
            _openMenu = function (elem) {

                var curItem = elem;

                if (curItem.hasClass('opened')) {

                    curItem.removeClass('opened');

                } else {

                    curItem.addClass('opened');

                }

            },
            _init = function () {
                _menu[0].obj = _self;
                _addEvents();
            };

        _init();
    };

    var FormValidation = function( obj ) {

        var _self = this,
            _obj = obj,
            _path = _obj.attr( 'action' ),
            _inputs = _obj.find( '[required]' ),
            _request = new XMLHttpRequest();

        var _addEvents = function() {

                _obj.on({

                    'submit': function(){

                        $.each( _inputs, function(){

                            var curItem = $(this),
                                curAttr = curItem.attr( 'type' );

                            if ( curItem.val() == '' ) {
                                curItem.addClass( 'form-validation__error' );
                            }

                            if ( curAttr == 'email' ){
                                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                                if ( pattern.test( curItem.val() ) == false ){
                                    curItem.addClass( 'form-validation__error' );
                                }
                            }

                        } );

                        if ( _obj.find( '.form-validation__error' ).length ){
                            return false;
                        } else {
                            _ajaxRequest();
                        }

                        return false;

                    }

                });

                _inputs.on({

                    'focus': function(){

                        var curItem = $( this );

                        if( curItem.hasClass( 'form-validation__error' )){
                            curItem.removeClass( 'form-validation__error' );
                        }

                    }

                });

            },
            _ajaxRequest = function() {

                _request.abort();
                _request = $.ajax({
                    url: _path,
                    data: _obj.serialize(),
                    dataType: 'html',
                    timeout: 20000,
                    type: "GET",
                    success: function () {



                    },
                    error: function ( XMLHttpRequest ) {
                        if( XMLHttpRequest.statusText != "abort" ) {
                            alert( 'Error!' );
                        }
                    }
                });

            },
            _init = function () {
                _addEvents();
                _obj[ 0 ].obj = _self;
            };

        _init();

    };

} )();
