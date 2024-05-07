import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import {CarouselItem, Image} from "react-bootstrap";

import img1 from "../images/rock_group_1.jpg"
import img2 from "../images/rock_group_2.jpg"
import img3 from "../images/rock_group_3.jpg"
const Home = () => {

    return (
        <div>
        <Carousel>
            <Carousel.Item>
                <Image src={img1} width="100%" height="1000"/>
            </Carousel.Item>
            <CarouselItem>
                <Image src={img2} width="100%" height="1000"/>
            </CarouselItem>
            <CarouselItem>
                <Image src={img3} width="100%" height="1000"/>
            </CarouselItem>
        </Carousel>
        </div>
    );
};

export default Home;