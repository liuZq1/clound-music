import React,{ useEffect,useState } from 'react';
import "swiper/css/swiper.css";
import Swiper from 'swiper';
import { SliderContainer } from './style';

function Slider( props ) {
    const [sliderSwiper,setSliderSwiper] = useState(null);
    const { bannerList } = props;

    useEffect (() => {
        if (bannerList.length && !sliderSwiper){
            let sliderSwiper = new Swiper (".slider-container", {
              loop: true,
              autoplay: true,
              autoplayDisableOnInteraction: false,
              pagination: {el:'.swiper-pagination'},
            });
            setSliderSwiper (sliderSwiper);
        }
        //可以使用 useEffect 处理副作用
        return () => {
            setSliderSwiper(null)
        }
      }, []);
 
    
    return (
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-container">
                <div className="swiper-wrapper">
                {
                     bannerList.map(slider => {
                         return (
                              <div key={slider.imgUrl} className="swiper-slide">
                                <img src={slider.imgUrl} width="100%" height="100%" alt="推荐"/>
                             </div>
                            )
                     })
                 }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    )
}

export default React.memo(Slider);