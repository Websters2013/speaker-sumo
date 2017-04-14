<?php

$loadedGroup = $_GET['loadedGroup'];

if ( $loadedGroup == 0 ){

    //  "has_items" - the number of not downloaded images
    //  "title" - text which shows at hover on element
    //  "dummy" - path to preview picture
    //  "href" - path to main picture, which shows in popup, or a link to the video
    //  "video" - if it is a block with a link to video frame

    $json_data = '{
                    "has_items": 1,
                    "items":[

                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-1.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-1.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-2.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-2.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-3.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-3.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-4.jpg",
                            "video": "https://www.youtube.com/embed/ckpwSAv5we8"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-5.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-5.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-6.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-6.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-7.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-7.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-8.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-8.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-9.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-9.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-10.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-10.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-11.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-11.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-12.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-12.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-13.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-13.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-14.jpg",
                            "video": "https://www.youtube.com/embed/3PYLnSrP3eE"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-15.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-15.jpg"
                        }

                    ]
                }';


} else if ( $loadedGroup == 1 ){

    $json_data = '{
                    "has_items": 1,
                    "items":[

                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-1.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-1.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-3.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-3.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-5.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-5.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-6.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-6.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-4.jpg",
                            "video": "https://www.youtube.com/embed/3PYLnSrP3eE"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-7.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-7.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-2.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-2.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-8.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-8.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-9.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-9.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-10.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-10.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-11.jpg",
                            "href": "pic/media-gallery/big/gallery__pic11.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-12.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-12.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-13.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-13.jpg"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-4.jpg",
                            "video": "https://www.youtube.com/embed/3PYLnSrP3eE"
                        },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-15.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-15.jpg"
                        }

                    ]
                }';

} else {

    $json_data = '{
                    "has_items": 0,
                    "items":[

                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-1.jpg",
                            "href": "pic/media-gallery/big/gallery__pic-1.jpg"
                            },
                        {
                            "title": "VIEW",
                            "dummy": "pic/media-gallery/gallery__pic-3.jpg",
                            "video": "https://www.youtube.com/embed/YykjpeuMNEk"
                            }

                    ]
                }';

};

echo $json_data;
exit;
?>
