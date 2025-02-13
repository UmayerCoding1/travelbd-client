import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const ImageSlider = ({image,imageTitle,style}) => {
    return (
        <div className={style}>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
           {image?.map((img, i) => (
              <SwiperSlide key={i}>
                 <img className="w-full h-full object-cover " src={img} alt="" title={imageTitle || null}/>
              </SwiperSlide>
           ))}
        </Swiper>
     </div>
    );
};

export default ImageSlider;