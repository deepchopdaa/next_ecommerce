"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Box } from "@mui/material";
import slider1 from "../../../public/images/slider001.png";
import slider2 from "../../../public/images/slider002.png";
import slider3 from "../../../public/images/slider003.png";
import slider4 from "../../../public/images/slider001.png";
import slider5 from "../../../public/images/slider002.png";
import slider6 from "../../../public/images/slider003.png";
import banner from "../../../public/images/banner.jpg";
import coupan from "../../../public/images/perfumebanner.png";

export default function Carousel() {
    const slideHeight = 400;

    return (
        <>
            {/* <Box sx={{ width: "100%", height: `${300}px`, my: "20px", position: "relative" }}>
                <Image
                    src={banner}
                    alt="banner image"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </Box> */}
            <Box sx={{ width: "100%", height: `${500}px`, scale: "1", my: "10px", position: "relative" }}>
                <Image
                    src={coupan}
                    alt="coupan image"
                    fill
                    // style={{ objectFit: "cover" }}
                    priority={0}
                />
            </Box>

            <Box sx={{ width: "100%" }}>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    style={{ width: "100%", height: `${slideHeight}px`, padding: "32px" }}
                >
                    {[slider1, slider2, slider3, slider4, slider5, slider6].map((img, i) => (
                        <SwiperSlide key={i}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: `${slideHeight}px`,
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src={img}
                                    alt="carousel image"
                                    fill
                                    priority={i === 0}
                                />
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </>
    );
}
