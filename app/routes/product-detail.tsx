import React, { useState } from "react";
import {
  Contact,
  Footer,
  Marquee,
  NotrePlaylist,
  Products,
  Topbar,
} from "./home";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductDetail = () => {
  return (
    <div>
      <Topbar />
      <Marquee />

      <div className="container mx-auto py-4">
        <Head>Revenir aux merchs</Head>

        <ProductCard />
      </div>

      <Products />
      <NotrePlaylist />
      <Contact />
      <div className="my-50"></div>
      <Footer />
    </div>
  );
};

const ProductCard = () => {
  return (
    <div className="mt-6 w-full flex items-start gap-9 flex-col md:flex-row">
      <Carousel />
      <ProductInfo />
    </div>
  );
};

const ProductInfo = () => {
  const [selectedOption, setSelectedOption] = useState(0);

  const Option = ({ children, isSelected, onClick }: any) => {
    return (
      <div
        onClick={onClick}
        className={cn(
          "cursor-pointer select-none w-10 h-10 border-2 text-primary flex items-center justify-center text-2xl font-frankfurter",
          {
            "border-transparent bg-primary text-white": isSelected,
            "border-primary bg-white": !isSelected,
          }
        )}
      >
        {children}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-[32px] md:text-[56px] text-primary font-cooper mb-2.5">
        Tee-shirt baba
      </h1>

      <h3 className="mb-2.5 text-xl md:text-2xl font-cooper text-primary">
        Description
      </h3>

      <p className="text-lg text-primary font-frankfurter mb-2.5">
        Pièce iconique du moment, le t-shirt Kebs Baba allie confort et
        caractère.
      </p>

      <p className="text-lg text-primary font-frankfurter mb-1">Details:</p>

      <ul className="w-full space-y-1.5 mb-4">
        <li className="text-primary flex items-center gap-2">
          <Icon
            icon="icon-park-outline:dot"
            className="rounded-full w-2.5 h-2.5 bg-primary"
          />
          <span className="font-frankfurter">Coupe : oversize unisexe</span>
        </li>
        <li className="text-primary flex items-center gap-2">
          <Icon
            icon="icon-park-outline:dot"
            className="rounded-full w-2.5 h-2.5 bg-primary"
          />
          <span className="font-frankfurter">
            Impression : sérigraphie rouge haute tenue
          </span>
        </li>
        <li className="text-primary flex items-center gap-2">
          <Icon
            icon="icon-park-outline:dot"
            className="rounded-full w-2.5 h-2.5 bg-primary"
          />
          <span className="font-frankfurter">
            Matière : 100 % coton biologique
          </span>
        </li>
        <li className="text-primary flex items-center gap-2">
          <Icon
            icon="icon-park-outline:dot"
            className="rounded-full w-2.5 h-2.5 bg-primary"
          />
          <span className="font-frankfurter">
            Fabriqué avec amour (et un peu de sauce kipik)
          </span>
        </li>
      </ul>

      <h3 className="mb-2.5 text-2xl font-cooper text-primary">Taille</h3>

      <div className="flex items-center w-full gap-3 mb-8">
        <Option
          onClick={() => setSelectedOption(0)}
          isSelected={selectedOption === 0}
        >
          XS
        </Option>
        <Option
          onClick={() => setSelectedOption(1)}
          isSelected={selectedOption === 1}
        >
          S
        </Option>
        <Option
          onClick={() => setSelectedOption(2)}
          isSelected={selectedOption === 2}
        >
          M
        </Option>
        <Option
          onClick={() => setSelectedOption(3)}
          isSelected={selectedOption === 3}
        >
          L
        </Option>
        <Option
          onClick={() => setSelectedOption(4)}
          isSelected={selectedOption === 4}
        >
          XL
        </Option>
      </div>

      <p className="text-2xl font-cooper font-medium mb-5">25,00€</p>

      <div className="flex items-center w-full gap-5">
        <div className="flex items-center justify-center h-10 border-2 border-primary rounded-full px-4 gap-5">
          <Icon className="cursor-pointer select-none" icon="mdi:minus" />
          <span className="font-zipper text-2xl font-medium mt-2">1</span>
          <Icon className="cursor-pointer select-none" icon="mdi:add" />
        </div>

        <button className="font-zipper font-medium text-2xl uppercase flex items-center justify-center h-10 px-4 pt-2 cursor-pointer bg-white border-2 border-primary rounded-full">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

const Carousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // Gallery images - farklı resimler kullanıyorum
  const images = [
    "/assets/images/t-shirt.png",
    "/assets/images/gallery-1.png",
    "/assets/images/gallery-2.png",
    "/assets/images/gallery-3.png",
    "/assets/images/gallery-4.png",
    "/assets/images/gallery-5.png",
  ];

  return (
    <div className="w-full md:w-[747px]">
      {/* Main Swiper */}
      <div className="relative mb-6">
        <Swiper
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className="main-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="h-[450px] md:h-[621px] rounded-2xl object-cover w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
          <Icon icon="ri:arrow-left-line" className="w-6 h-6 text-primary" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
          <Icon icon="ri:arrow-right-line" className="w-6 h-6 text-primary" />
        </button>
      </div>

      {/* Thumbnails Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={16}
        slidesPerView={4}
        watchSlidesProgress={true}
        className="thumbs-swiper"
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-[140px] rounded-2xl object-cover cursor-pointer hover:opacity-80 transition-opacity"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const Head = ({ children }: any) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="cursor-pointer select-none flex items-center gap-4 w-full"
    >
      <Icon icon="ri:arrow-left-line" className="w-6 h-6 text-primary" />
      <h3 className="text-lg font-frankfurter text-primary">{children}</h3>
    </div>
  );
};

export default ProductDetail;
