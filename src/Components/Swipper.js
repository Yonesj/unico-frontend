import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MySwiper() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      modules={[ Pagination, Autoplay]}
      className="w-full h-full flex justify-center items-center"
    >
      <SwiperSlide className="  text-right items-center flex flex-col p-5 gap-4 px-6 space-y-4 "> 
      <div className="title slider-title font-medium text-base text-gray-900 text-right w-full"> لورم ایپسوم متن</div>
      <div className="desc slider-desc font-normal text-sm text-gray-700">   لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</div>
    </SwiperSlide>
    <SwiperSlide className="  text-right items-center flex flex-col p-5 gap-4 px-6  space-y-4 "> 
      <div className="title slider-title font-medium text-base text-gray-900 text-right w-full"> لورم ایپسوم متن</div>
      <div className="desc slider-desc font-normal text-sm text-gray-700">   لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</div>
    </SwiperSlide>
    <SwiperSlide className="  text-right items-center flex flex-col p-5 gap-4 px-6  space-y-4 "> 
      <div className="title slider-title font-medium text-base text-gray-900 text-right w-full"> لورم ایپسوم متن</div>
      <div className="desc slider-desc font-normal text-sm text-gray-700">   لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</div>
    </SwiperSlide>
    <SwiperSlide className="  text-right items-center flex flex-col p-5 gap-4 px-6   space-y-4"> 
      <div className="title slider-title font-medium text-base text-gray-900 text-right w-full"> لورم ایپسوم متن</div>
      <div className="desc slider-desc font-normal text-sm text-gray-700">   لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</div>
    </SwiperSlide>
    </Swiper>
  );
}