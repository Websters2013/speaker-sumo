<?php

$loadedCount = $_GET['loadedCount'];

if ( $loadedCount == 4 ){

//  "has_items" - the number of not downloaded images
//  "title" - title of news
//  "picture" - preview picture
//  "date" - date of news
//  "href" - link to main news

    $json_data = '{
        "has_items": 1,
                    "items":[

                        {
                            "id":1,
                            "picture": "pic/testimonial-pic_1.jpg",
                            "name": "JANE DOE",
                            "post": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            "href": "#",
                            "favorite": " "
                            },
                        {
                            "id":2,
                            "picture": "pic/speaker-002.jpg",
                            "name": "James Smith",
                            "post": "Founder of Smart Tech Co.",
                            "href": "#",
                            "favorite": "speakers-favorite"
                            },
                        {
                            "id":3,
                            "picture": "pic/speaker-003.jpg",
                            "name": "DanielA Lewis",
                            "post": "Founder of Something Eventualy",
                            "href": "#",
                            "favorite": " "
                            },
                        {
                            "id":4,
                            "picture": "pic/speaker-004.jpg",
                            "name": "Robert J.",
                            "post": "Founder of Something Eventualy",
                            "href": "#",
                            "favorite": " "
                            }

                    ]
    }';

} else {

//  "has_items" - the number of not downloaded news
//  "title" - title of news
//  "picture" - preview picture
//  "date" - date of news
//  "href" - link to main news

    $json_data = '{

        "has_items": 0,
                    "items":[

                        {
                            "id":5,
                            "picture": "pic/speaker-001.jpg",
                            "name": "Jane ROTENBERG",
                            "post": "Design Director and Co-founder of Stellar Artworks",
                            "href": "#",
                            "favorite": " "
                            },
                        {
                            "id":6,
                            "picture": "pic/speaker-002.jpg",
                            "name": "James Smith",
                            "post": "Founder of Smart Tech Co.",
                            "href": "#",
                            "favorite": "speakers-favorite"
                            }

                    ]
        }';

};
echo $json_data;
exit;
?>
