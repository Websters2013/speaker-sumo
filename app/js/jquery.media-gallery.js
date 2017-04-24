( function(){

    "use strict";

    $(function () {

        $.each( $( '.media-gallery' ), function(){

            new MediaGallery ( $( this ) )

        } );

    } );

    var MediaGallery = function( obj ) {

        var _self = this,
            _obj = obj,
            _wrapper = _obj.find( '.media-gallery__wrap' ),
            _innerWrapper = _obj.find( '.media-gallery__inner' ),
            _cover = _obj.find( '.media-gallery__cover' ),
            _btnCheck = _obj.find( '.media-gallery__check' ),
            _galleryItemClass = null,
            _window = $( window ),
            _btnMore = _obj.find( '.media-gallery__more' ),
            _btnAction = _btnMore.attr( 'href' ),
            _isGallery = false,
            _request = new XMLHttpRequest(),
            _firstGroup = true,
            _swiper = null,
            _swiperNextBtn = _innerWrapper.find( '.swiper-button-next' ),
            _swiperPrevBtn = _innerWrapper.find( '.swiper-button-prev' ),
            _switcherType = _obj.attr( 'data-loaded-type' ),
            _btnCheckClick = false;

        var _addGalleryContent = function( msg ){

                var hasItems = msg.has_items,
                    wrapperHeight = _innerWrapper.innerHeight(),
                    path = null,
                    newBlock = null;

                $.each( msg.items, function( i ){

                    if ( this.video == undefined ){

                        path = this.href;

                    } else {

                        path = this.video;

                    }

                    newBlock = $( '<a href="' + path + '" title="' + this.title + '" class="media-gallery__item hidden swiper-slide" style="background-image: url(' + this.dummy + ');"><span class="media-gallery__item-title">' + this.title + '</span></a>' );

                    if ( this.video ){
                        newBlock.addClass( 'media-gallery__item_video' );
                    }

                    _wrapper.append( newBlock );

                } );

                var newItems = _wrapper.find( '.hidden' );

                if ( _window.width() >= 768 ) {

                    setTimeout( function(){

                        _heightAnimation( hasItems, newItems );

                    }, 50 );

                }

                if ( _window.width() < 768 ) {

                    _initSwiper();

                } else {

                    _initGallery();
                }

                _obj.attr( 'data-loaded-group', +_obj.attr( 'data-loaded-group' )+1 );
            },
            _addEvents = function () {

                _btnMore.on( {
                    click: function() {
                        _loadNewItems();
                        return false;
                    }

                } );

                _obj.on( 'click', '.media-gallery__item', function() {

                    SwiperPopup( $( this ), $( this ).index() );
                    return false;

                } );

                _btnCheck.on( {

                    click: function() {

                        _btnCheckClick = true;

                        var curElem = $( this );

                        if ( curElem.hasClass( 'active' ) ) {

                            curElem.removeClass( 'active' );
                            _obj.attr( 'data-loaded-type', 'all' );
                            _switcherType = 'all';

                            if ( _window.width() < 768  ) {

                                _swiper.update();
                                _swiper.updateProgress();
                                _swiper.slideTo( 0 );

                            } else {

                                _destroyGallery();
                                _initGallery();
                            }

                        } else {

                            _btnCheck.removeClass( 'active' );
                            curElem.addClass( 'active' );
                            _obj.attr( 'data-loaded-type', curElem.data( 'type' ) );
                            _switcherType = curElem.data( 'type' );

                            if ( _window.width() < 768 ) {

                                _swiper.update();
                                _swiper.updateProgress();
                                _swiper.slideTo( 0 );

                            } else {

                                _destroyGallery();
                                _initGallery();
                            }
                        }
                    }
                } );

                _window.on( {
                    resize: function() {

                        if ( _window.width() < 768 && !_swiper ) {

                            _destroyGallery();
                            _initSwiper();


                        } else if ( _window.width() >= 768 && _swiper ) {

                            _swiper.destroy();
                            _swiper = null;
                            _initGallery();

                        }
                    }
                } );
            },
            _destroyGallery = function() {

                _wrapper.isotope( 'destroy' );
                _isGallery = false;

            },
            _getScrollWidth = function() {
                var div = document.createElement( 'div' ),
                    scrollWidth = null;

                div.style.overflowY = 'scroll';
                div.style.width = '50px';
                div.style.height = '50px';
                div.style.visibility = 'hidden';
                document.body.appendChild( div );
                scrollWidth = div.offsetWidth - div.clientWidth;
                document.body.removeChild( div );
                return scrollWidth ;
            },
            _heightAnimation = function( hasItems, newItems ){

                var duration = 500;

                if ( _firstGroup ){
                    duration = 1
                }

                _cover.animate( {
                    height: _wrapper.height()
                }, {
                    duration: duration,
                    complete: function(){

                        _cover.css( 'height', '' );

                        newItems.each( function( i ){
                            _showNewItems( $( this ),i );
                        } );

                        if ( hasItems == 0 ){
                            _removeBtnMore();
                        }

                    }
                } );

                if ( _firstGroup ){
                    setTimeout( function() {
                        _firstGroup = false;
                    },500 );
                }

                _btnCheckClick = false;

            },
            _initGallery = function() {

                _wrapper = _obj.find( '.media-gallery__wrap' );
                _galleryItemClass = '.media-gallery__item';

                _wrapper.isotope({
                    itemSelector: _galleryItemClass,
                    masonry: {
                        columnWidth: 0
                    },
                    layoutMode: 'fitRows'
                });

                _isGallery = true;

            },
            _init = function () {

                _loadNewItems();
                _addEvents();
                _obj[0].obj = _self;

            },
            _loadNewItems = function(){

                var path;

                if ( _obj.hasClass( 'media-gallery_profile' ) ) {
                    path = _obj.data( 'action' );
                }else{
                    path = _btnAction
                }

                _request.abort();
                _request = $.ajax({
                    url: path,
                    data: {
                        loadedGroup: _obj.attr( 'data-loaded-group' )
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: "GET",
                    success: function ( msg ) {

                        if( _window.width() + _getScrollWidth() >= 1000 ) {
                            _cover.height( _cover.height() );
                        }

                        if ( _obj.attr( 'data-loaded-group' ) !== 0 ){

                            if ( _window.width() >= 768 && _isGallery ) {

                                _destroyGallery();

                            } else {

                                if ( _swiper ) {

                                    _swiper.destroy();
                                    _swiper = null;

                                }
                            }
                        }

                        _addGalleryContent( msg );

                    },
                    error: function ( XMLHttpRequest ) {
                        if( XMLHttpRequest.statusText != 'abort' ) {
                            alert( 'Error!' );
                        }
                    }
                });

            },
            _removeBtnMore = function(){

                _btnMore.css( 'opacity', 0 );

                setTimeout( function(){

                    _btnMore.css( 'padding', 0 );

                    _btnMore.animate({
                        height: 0
                    }, {
                        duration: 500,
                        complete: function(){
                            _btnMore.remove();
                        }
                    } );

                }, 300 );

            },
            _initSwiper = function () {

                _swiper = new Swiper ( _cover, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 1,
                    loop: false,
                    prevButton: _swiperPrevBtn,
                    nextButton: _swiperNextBtn,
                    onSlideChangeStart: function( swiper ) {

                        if ( swiper.isEnd ) {

                            _loadNewItems();

                        }
                    }
                } );

                _swiper.update();
            },
            _showNewItems = function( item, index ){

                var delay = 100;

                if ( _firstGroup ) {
                    delay = 1
                }

                setTimeout( function() {
                    item.removeClass( 'hidden' );
                }, index * delay );

            };

        _init();

    };

    var SwiperPopup = function ( obj, index ) {

        var _self = this,
            _obj = obj,
            _body = $( 'body' ),
            _wrapper = _obj.parent(),
            _galleryWrap = _obj.parents( '.media-gallery' ),
            _html = $( 'html' ),
            _window = $( window ),
            _links,
            _popup = null,
            _popupInner = null,
            _popupClose = null,
            _swiperWrapper = null,
            _swiperContainer = null,
            _swiperPagination = null,
            _swiperBtnNext = null,
            _swiperBtnPrev = null,
            _swiper = null;

        var _addEvents = function(){

                _window.on({

                    resize: function (){

                        _setPictureSizeWhenResize();

                    }

                });

                _popupInner.parent().on({

                    click: function(){

                        _closePopup();

                    }

                });

                _popupInner.on({

                    click: function( event ){

                        event.stopPropagation();

                    }

                });

                _popupClose.on({
                    click: function(){

                        _closePopup();
                        return false;

                    }
                })

            },
            _addingVariables = function(){

                var type = _galleryWrap.attr( 'data-loaded-type' );

                if ( type == 'all' ){
                    _links = _wrapper.find( '.media-gallery__item' );
                } else if ( type == 'photo' ){
                    _links = _wrapper.find( '.media-gallery__item:not(.media-gallery__item_video)' );
                } else if ( type == 'video' ){
                    _links = _wrapper.find( '.media-gallery__item_video' );
                }

                _popup = $( '<div class="swiper-popup">\
                                    <div class="swiper-container">\
                                        <div class="swiper-wrapper"></div>\
                                        <div class="swiper-pagination"></div>\
                                        <div class="swiper-button-next"></div>\
                                        <div class="swiper-button-prev"></div>\
                                    </div>\
                                </div>' );
                _swiperWrapper = _popup.find( '.swiper-wrapper' );
                _swiperContainer = _popup.find( '.swiper-container' );
                _swiperPagination = _popup.find( '.swiper-pagination' );
                _swiperBtnNext = _popup.find( '.swiper-button-next' );
                _swiperBtnPrev = _popup.find( '.swiper-button-prev' );

            },
            _addVideo = function () {

                var activeSlide = _popup.find( '.swiper-slide-active' ),
                    src = activeSlide.find( '[data-src]' ).data( 'src' ),
                    innerContent = $( '<iframe src="' + src + '"> frameborder="0" allowfullscreen></iframe>' );

                $( '.swiper-slide-active' ).find( '.swiper-popup__video' ).prepend( innerContent );

            },
            _buildPopup = function(){

                _addingVariables();
                _contentFilling();
                _initSwiper();
                _swiper.slideTo( index, 0 );
                _popup.addClass( 'active' );
                _setStyles();
                _swiper.onResize();
            },
            _closePopup = function(){

                _popup.removeClass( 'active' );
                setTimeout( function(){
                    _html.css({overflow: '', paddingRight: ''});
                    _popup.remove();
                }, 300 );

            },
            _contentFilling = function(){

                $.each( _links, function(){

                    var innerContent = null,
                        dataSRC = null,
                        preloader = null;

                    if ( $( this ).hasClass( 'media-gallery__item_video' ) ){

                        preloader = '<i class="fa fa-spinner fa-spin"></i>';
                        innerContent = '<div class="swiper-popup__video"/>';
                        dataSRC = 'data-src="' + $(this).attr( "href" ) + '"';

                    } else {

                        preloader = '';
                        innerContent = '<img src="' + $( this ).attr( 'href' ) + '">';
                        dataSRC = '';

                    }

                    var newItem = $( '<div class="swiper-slide">\
                                        <div class="swiper-popup__inner" ' + dataSRC + '>\
                                            <a href="#" class="swiper-popup__close"></a>\
                                            ' + preloader + '\
                                            ' + innerContent + '\
                                            <span class="swiper-slide__title">' + $( this ).attr( 'title' ) + '</span>\
                                        </div>\
                                    </div>' );

                    _swiperWrapper.append( newItem );

                    newItem.find( 'img' ).on({
                        load: function(){
                            $( this ).attr( 'data-width', this.width );
                            $( this ).attr( 'data-height', this.height );
                            _setPictureSize( this.width, this.height, $( this ) );
                        }
                    });

                } );

                _body.append( _popup );

                _popupInner = _popup.find( '.swiper-popup__inner' );
                _popupClose = _popup.find( '.swiper-popup__close' );

            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div' ),
                    scrollbarWidth = null;
                document.body.appendChild( scrollDiv );
                scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild( scrollDiv );
                return scrollbarWidth;
            },
            _initSwiper = function(){

                _swiper = new Swiper( _swiperContainer, {
                    pagination: _swiperPagination,
                    nextButton: _swiperBtnNext,
                    prevButton: _swiperBtnPrev,
                    slidesPerView: 1,
                    paginationClickable: true,
                    onSlideChangeEnd: function(){
                        _removeVideo();
                        if ( $( '.swiper-slide-active' ).find( '[data-src]' ).length ){
                            _addVideo();
                        }
                    }
                });

            },
            _init = function () {
                _buildPopup();
                _addEvents();
                _obj[ 0 ].obj = _self;
            },
            _removeVideo = function(){

                var items = _popup.find( '.swiper-slide' ),
                    videoFrame = items.find( '.swiper-popup__video iframe' );
                videoFrame.remove();

            },
            _setPictureSize = function( picWidth, picHeight, pic ){

                var k = 0;

                if ( ( _popup.width()/picWidth ) > ( _popup.height()/picHeight ) ) {
                    k = _popup.height()/picHeight ;
                } else {
                    k = _popup.width()/picWidth;
                }

                if ( k >= 1 ){

                    pic.css({
                        "width": picWidth*0.85,
                        "height": picHeight*0.85
                    });

                } else {

                    pic.css({
                        "width": k*picWidth*0.85,
                        "height": k*picHeight*0.85
                    });

                }

            },
            _setPictureSizeWhenResize = function(){

                $.each( _swiperWrapper.find( 'img' ), function () {

                    _setPictureSize( $( this ).data( 'width' ), $( this ).data( 'height' ), $( this ) );

                } );

            },
            _setStyles = function(){

                _html.css({
                    overflow: 'hidden',
                    paddingRight: _getScrollWidth()
                });

            };

        _init();

    };

} )();
