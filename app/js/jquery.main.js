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
        } );

        $.each( $( '.form-validation' ), function() {
            new FormValidation ( $( this ) )
        } );

        $.each( $( '.schedule' ), function() {
            new Schedule ( $( this ) )
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
            _scheduleSlider = _obj.find( '.schedule__month' ),
            _presentationPrev = _obj.find( '.presentation__button-prev' ),
            _booksPrev = _obj.find( '.books__button-prev' ),
            _blogPrev = _obj.find( '.blog__button-prev' ),
            _postPrev = _obj.find( '.posts__button-prev' ),
            _pastPrev = _obj.find( '.past__button-prev' ),
            _schedulePrev = _obj.find( '.schedule__button-prev' ),
            _presentationNext = _obj.find( '.presentation__button-next' ),
            _booksNext = _obj.find( '.books__button-next' ),
            _blogNext = _obj.find( '.blog__button-next' ),
            _postNext = _obj.find( '.posts__button-next' ),
            _pastNext = _obj.find( '.past__button-next' ),
            _scheduleNext = _obj.find( '.schedule__button-next' ),
            _books,
            _blog,
            _post,
            _past,
            _presentation,
            _schedule,
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
                        767: {
                            slidesPerView: 1
                        }
                    }
                } );

            },
            _onEvent = function() {

                _window.on(
                    'resize', function () {

                        if ( _window.width() < 1200 && !_initFlag ) {

                            _initSlider();

                            _initFlag = true;

                        } else if ( _window.width() >= 1200 && _initFlag ) {

                            _presentation.destroy( true, true );
                            _books.destroy(true, true);
                            _blog.destroy(true, true);
                            _post.destroy(true, true);
                            _past.destroy(true, true);

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
                        console.log('_openMenu');
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

    var Schedule = function( obj ) {

        var _obj = obj,
            _select = _obj.find( '.schedule-dates' ),
            _calendar = _obj.find( '#calendar' ),
            _eventWrap = _obj.find( '.schedule__venue-frame' ),
            _monthWrap = _obj.find( '.schedule__month' ),
            _monthItem = _obj.find( '.schedule__month-item' ),
            _window = $(window),
            _initMobileFlag = true,
            _initDesktopFlag = true,
            _prevMonth = _obj.find( '.schedule__calendar-prev' ),
            _nextMonth = _obj.find( '.schedule__calendar-next' ),
            _monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
            _arr = [];

        var _onEvents = function() {

                _select.on( {
                    change: function() {
                        _setEventsBySelect();
                    }
                } );

                _monthItem.on( {
                    click: function() {

                        _monthItem.removeClass( 'active' );

                        var curDate = $( this ).data( 'time' );

                        $( this ).addClass( 'active' );

                        _calendar.fullCalendar( 'gotoDate', curDate );

                        _checkCalendarArrows();

                        return false;
                    }
                } );

                _window.on( {
                    'resize': function() {

                        if ( _window.width() < 1200 && _initMobileFlag ){
                            _initController();
                            _initMobileFlag = false;
                        } else if ( _window.width() >= 1200 && _initDesktopFlag ) {
                            _initController();
                            _initDesktopFlag = false;
                        };

                    }
                } );

                _prevMonth.on( {
                    'click': function() {

                        if ( $( this ).hasClass( 'disabled' ) ){
                            return false;
                        }

                        var activeElem = _monthWrap.find( '.active' );

                        activeElem.next().addClass( 'active' );
                        activeElem.removeClass( 'active' );

                        activeElem = _monthWrap.find( '.active' );
                        activeElem.trigger( 'click' );

                        return false;

                    }
                } );

                _nextMonth.on( {
                    'click': function() {

                        if ( $( this ).hasClass( 'disabled' ) ){
                            return false;
                        }

                        var activeElem = _monthWrap.find( '.active' );

                        activeElem.prev().addClass( 'active' );
                        activeElem.removeClass( 'active' );

                        activeElem = _monthWrap.find( '.active' );
                        activeElem.trigger( 'click' );

                        return false;

                    }
                } );

            },
            _checkCalendarArrows = function () {

                var activeElem = _monthWrap.find( '.active' );

                if ( activeElem.index() == 0 ){
                    _nextMonth.addClass( 'disabled' );
                } else if ( activeElem.index() == _monthItem.length - 1 ) {
                    _prevMonth.addClass( 'disabled' );
                } else {
                    _prevMonth.removeClass( 'disabled' );
                    _nextMonth.removeClass( 'disabled' );
                }

            },
            _initCalendar = function () {

                _calendar.fullCalendar( {
                        dayNamesShort: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
                        allDayText: 'all-day',
                        header: {
                            left: '',
                            center: '',
                            right: ''
                        },
                        firstDay: 1,
                        editable: false,
                        defaultDate: '2017-04-12',
                        navLinks: true,
                        eventLimit: true,
                        events: {
                            url: 'php/get-events.php',
                            error: function() {
                                $( '#script-warning' ).show();
                            }
                        },
                        loading: function( bool ) {
                            $('#loading').toggle( bool );
                        },
                        eventRender: function( event, element, view ) {

                            var time = new Date(event.start._i).getTime()/1000;

                            var timestamp = time;

                            var xx = new Date();
                            xx.setTime( timestamp * 1000 );

                            var objDate = new Date(xx),
                                locale = "en-us",
                                month = objDate.toLocaleString(locale, { month: "long" });

                            return $('<a href="'+ event.url +'" class="schedule__track">' +
                                '<time datetime="'+ xx.getFullYear() +'-'+ xx.getMonth() +'-'+ xx.getDate() +'" class="schedule__track-time">' + _ordinalSuffixOf(xx.getDate()) + ' ' + month + '</time>' +
                                '<p><b>' + event.title + '</b></p>' +
                                '<p><b>' + event.city + '</b></p></a>'
                            );

                        }

                    } );

            },
            _initController = function() {

                var flag = true,
                    monthArr = [],
                    setEvents = $.ajax( 'php/events.json' )
                        .done(function( msg ) {

                            $( msg ).each(function() {

                                var time = new Date( this.start ).getTime()/1000,
                                    timestamp = time;

                                _arr.push( timestamp );

                            } );

                            for( var i = 0; i <= _arr.length - 1; i++ ) {

                                var xx = new Date();
                                xx.setTime( _arr[i] * 1000 );

                                if( flag ){
                                    monthArr.push( [xx.getMonth(), xx.getFullYear() ] );
                                    flag = false;
                                }

                                if ( monthArr [ monthArr.length - 1 ].indexOf( xx.getMonth() ) == -1 ) {
                                    monthArr.push( [ xx.getMonth(), xx.getFullYear() ] );
                                }

                            }

                            if ( _window.width() < 1200 ){
                                _setMobileEvents( monthArr );
                                _initMobileFlag = false;
                            } else {
                                _setDesktopEvents( monthArr );
                                _initDesktopFlag = false;
                            };

                        } )
                        .fail( function() {
                            alert( 'error' );
                        } );


            },
            _setMobileEvents = function ( monthArr ) {

                for( var i = 0; i <= monthArr.length-1; i++ ) {

                    var lengthMonth = String( monthArr[i][0] ).length,
                        numMoth = ( lengthMonth == '1' ) ? ( '0'+ ( monthArr[i][0] + 1 ) ) : monthArr[i][0] + 1;

                    _select.append( '<option value="'+ monthArr[i][0] +'"><span>'+ _monthNames[monthArr[i][0]] +'</span> '+ monthArr[i][1] +'</option>' );

                }

                _setEventsBySelect();

                _select.each( function(){
                    new WebstersSelect( {
                        obj: $( this ),
                        optionType: 1,
                        showType: 2
                    } );
                } );

                _onEvents();

            },
            _setDesktopEvents = function ( monthArr ) {

                var swiper = $( '<div class="swiper-wrapper"></div>' ),
                    initSwiper = false;

                for( var i = 0; i <= monthArr.length-1; i++ ) {

                    var lengthMonth = String( monthArr[i][0] ).length,
                        numMoth = ( lengthMonth == '1' ) ? ( '0'+ ( monthArr[i][0] + 1 ) ) : monthArr[i][0] + 1;

                    if ( monthArr.length > 3 ) {

                        swiper.append( '<a href="#" class="schedule__month-item swiper-slide" data-time="'+ monthArr[i][1] +'-'+ numMoth +'-01"><strong>'+ _monthNames[monthArr[i][0]] +'</strong><p>'+ monthArr[i][1] +'</p></a>' );



                        initSwiper = true;

                    } else {

                        _monthWrap.append( '<a href="#" class="schedule__month-item" data-time="'+ monthArr[i][1] +'-'+ numMoth +'-01"><strong>'+ _monthNames[monthArr[i][0]] +'</strong><p>'+ monthArr[i][1] +'</p></a>' );

                    }

                }

                if ( initSwiper ) {

                    _monthWrap.append( swiper );
                    _monthWrap.parent().append( '<div class="schedule__button-prev"></div><div class="schedule__button-next"></div>' );

                    var _scheduleSlider = _obj.find( '.schedule__month' ),
                        _schedulePrev = _obj.find( '.schedule__button-prev' ),
                        _scheduleNext = _obj.find( '.schedule__button-next' ),
                        _schedule;

                    _schedule = new Swiper ( _scheduleSlider, {
                        autoplay: false,
                        speed: 500,
                        effect: 'slide',
                        slidesPerView: 3,
                        spaceBetween: 18,
                        loop: false,
                        prevButton: _schedulePrev,
                        nextButton: _scheduleNext
                    } );

                }

                _monthItem = _obj.find( '.schedule__month-item' );
                _monthItem.eq( 0 ).addClass( 'active' );

                _initCalendar();
                _checkCalendarArrows();
                _onEvents();

            },
            _setEventsBySelect = function () {

                var valueMonth = _select.find( 'option:selected' ).val(),
                    setEvents = $.ajax( 'php/events.json' )
                        .done(function( msg ) {

                            _eventWrap.empty();

                            $( msg ).each( function() {

                                var time = new Date(this.start).getTime()/1000,
                                    timestamp = time,
                                    xx = new Date();
                                xx.setTime( timestamp * 1000 );

                                xx.getMonth();

                                if( xx.getMonth() == valueMonth ) {

                                    var objDate = new Date( xx ),
                                        locale = "en-us",
                                        month = objDate.toLocaleString(locale, { month: "long" } );

                                    _eventWrap.append( '<li class="schedule__frame-li"><a href="'+ this.url +'" class="schedule__track">' +
                                        '<time datetime="'+ xx.getFullYear() +'-'+ xx.getMonth() +'-'+ xx.getDate() +'" class="schedule__track-time">' + _ordinalSuffixOf( xx.getDate() ) + ' ' + month + '</time>' +
                                        '<p><b>' + this.title + '</b></p>' +
                                        '<p><b>' + this.city + '</b></p>' +
                                        '</a></li>'
                                    );

                                }

                            } );

                        } )
                        .fail( function () {
                            alert( 'error' );
                        } );

            },
            _ordinalSuffixOf = function( i ) {
                var j = i % 10,
                    k = i % 100;
                if ( j == 1 && k != 11 ) {
                    return i + "st";
                }
                if ( j == 2 && k != 12 ) {
                    return i + "nd";
                }
                if ( j == 3 && k != 13 ) {
                    return i + "rd";
                }
                return i + "th";
            },
            _constuctor = function () {
                _initController();
            };

        _constuctor();

    };

} )();
