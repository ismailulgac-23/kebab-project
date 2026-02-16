import { Link } from "react-router";
import type { Route } from "./+types/home";
import cn from "classnames";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import Input from "~/components/Input";
import { Icon } from "@iconify/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kebs Baba | Home" },
    { name: "description", content: "Kebs Baba | Home" },
  ];
}

export default function Home() {
  return (
    <div className="">
      {/* topbar */}
      <Topbar />

      {/* marquee */}
      <Marquee />

      {/* Intro Text */}
      <IntroText />

      {/* Swiper slider */}
      <Slider />

      {/* Address */}
      <Address />

      {/* Who is the fucking baba */}
      <WhoIsTheFuckingBaba />

      <Marquee text="SALADE TOMATE JAMAIS MALADE SALADE TOMATE JAMAIS MALADE SALADE TOMATE JAMAIS MALADE" />
      <Marquee
        text="DÖNER - MÜZİK - BİRA - DÜRÜM - LAHMACUN - HALLOUMI - MEZZES - DÖNER - MÜZİK - BİRA - DÜRÜM - LAHMACUN - HALLOUMI - MEZZES -"
        bgColor="bg-white"
        textColor="text-primary"
      />

      <Menu />

      <Marquee
        text="BONHEUR KEBAB - BONHEUR KEBAB - BONHEUR KEB - BONHEUR KEBAB - BONHEUR KEBAB - BONHEUR KEB -"
        bgColor="bg-white"
        textColor="text-primary"
        textSize="text-[65px]"
      />

      <Comments />

      <Quality />

      <Truk />

      <NotrePlaylist />

      <Contact />

      <Gallery />

      <Products />

      <Footer />
    </div>
  );
}

export const Topbar = () => {
  return (
    <div className="container mx-auto h-[63px] flex justify-between items-center">
      <a href="https://maps.app.goo.gl/gDYfEgXUjfrR6xq38" target="_blank" className="hover:underline hover:decoration-primary hidden md:flex flex-col items-start">
        <p className="text-primary text-sm font-normal font-cooper">
          BABA CENTRE, 26 rue du vieux marché aux vins{" "}
        </p>
        <p className="text-primary text-sm font-normal font-cooper">
          BABA KRUT, 14 rue Munch Krutenau
        </p>
      </a>

      <InstagramButton className="block md:hidden w-[90px]" />

      <Link to="/">
        <img
          className="md:w-[141px] md:h-[49px] w-[97px] select-none"
          src="/assets/images/logo.png"
          alt="logo"
        />
      </Link>
      <div className="flex items-center gap-[17px]">
        <MerchsButton className="md:w-[107px] md:h-[34px] w-[90px]" />
        <InstagramButton className="hidden md:block w-[107px] h-[34px]" />
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <div className="border-[3px] border-primary rounded-tl-[45px] md:rounded-tl-[87px] rounded-tr-[45px] md:rounded-tr-[87px] w-full relative">
      {/* Desktop Layout */}
      <div className="hidden md:block px-[50px] pt-[50px] pb-5">
        <h1 className="font-cooper text-[85px] text-primary mb-14.25">
          Salade tomate jamais malade
        </h1>

        <div className="flex items-start gap-25 mb-20">
          <FooterLinkGroup
            title="CONTACT"
            contents={[
              { title: "kebsbaba.fr" },
              { title: "contact@kebsbaba.fr" },
            ]}
          />
          <FooterLinkGroup
            title="Infos pratiques"
            contents={[
              {
                title:
                  "KEBS BABA CENTRE,<br /> 26 rue du Vieux Marché aux Vins, 67000 STRASBOURG",
              },
              {
                title:
                  "Ouvert tous les jours de 11h45 à 22h00 et<br/> de 12h00 à 22h00 le dimanche",
              },
            ]}
          />

          <FooterLinkGroup
            title="&nbsp;"
            contents={[
              {
                title: "KEBS BABA KRUT,<br />14 rue Munch, 67000 STRASBOURG",
              },
              {
                title:
                  "Ouvert tous les jours de 11h45 à 23h00 et<br/> de 11h45 à 01h00 le vendredi et samedi",
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-7">
          <h3 className="text-sm font-frankfurter text-primary">
            CGV & Mentions légales
          </h3>
          <h3 className="text-sm font-frankfurter text-primary">
            2026 Kebs Baba — Tous droits réservés{" "}
          </h3>
        </div>

        <img
          src="/assets/images/footer-baba.png"
          className="w-[210px] absolute bottom-[10%] right-[3%]"
        />
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden px-6 pt-8 pb-5 relative">
        <h1 className="font-cooper text-[32px] text-primary leading-tight max-w-[300px] mb-12">
          Salade tomate jamais malade
        </h1>

        <div className="space-y-8">
          {/* Contact Section */}
          <div>
            <h2 className="font-cooper text-primary text-xl mb-4 uppercase">
              CONTACT
            </h2>
            <div className="space-y-2">
              <p className="text-primary font-frankfurter text-sm">
                Numéro de tel
              </p>
              <p className="text-primary font-frankfurter text-sm">
                kebsbaba.fr
              </p>
              <p className="text-primary font-frankfurter text-sm">
                contact@kebsbaba.fr
              </p>
            </div>
          </div>

          {/* Infos Pratiques Section */}
          <div>
            <h2 className="font-cooper text-primary text-xl mb-4 uppercase">
              INFOS PRATIQUES
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-primary font-frankfurter font-bold text-sm mb-2">
                  KEBS BABA CENTRE,
                </h3>
                <p className="text-primary font-frankfurter text-sm mb-2">
                  26 rue du Vieux Marché aux Vins,
                </p>
                <p className="text-primary font-frankfurter text-sm mb-3">
                  67000 STRASBOURG
                </p>
                <p className="text-primary font-frankfurter text-sm">
                  Ouvert tous les jours de 11h45 à 22h00 et de 12h00 à 22h00 le
                  dimanche
                </p>
              </div>

              <div>
                <h3 className="text-primary font-frankfurter font-bold text-sm mb-2">
                  KEBS BABA KRUT,
                </h3>
                <p className="text-primary font-frankfurter text-sm mb-2">
                  14 rue Munch,
                </p>
                <p className="text-primary font-frankfurter text-sm mb-3">
                  67000 STRASBOURG
                </p>
                <p className="text-primary font-frankfurter text-sm">
                  Ouvert tous les jours de 11h45 à 23h00 et de 11h45 à 01h00 le
                  vendredi et samedi
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-8 pt-4 border-t border-primary/20">
          <h3 className="text-xs font-frankfurter text-primary text-center">
            CGV & Mentions légales
          </h3>
          <h3 className="text-xs font-frankfurter text-primary text-center">
            ©2025 Kebs Baba — Tous droits réservés
          </h3>
        </div>

        <img
          src="/assets/images/footer-baba.png"
          className="w-[100px] absolute top-5 right-5"
        />
      </div>
    </div>
  );
};

const FooterLinkGroup = ({ title, contents }: any) => {
  return (
    <div>
      <h1 className="text-[32px] mb-3 font-medium font-zipper text-primary">
        {title}
      </h1>
      <ul className="space-y-2.5">
        {contents.map((item: any, index: number) => {
          return (
            <li
              key={index}
              className="font-frankfurter text-lg text-primary"
              dangerouslySetInnerHTML={{ __html: item.title }}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};

export const Products = () => {
  return (
    <div className="w-full bg-primary relative py-15 mb-28.25">
      <div className="container mx-auto">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={20}
          slidesPerView={1.2}
          freeMode={true}
          grabCursor={true}
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="w-full"
        >
          {Array.from(Array(12).keys()).map((index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/products/${index}`}
                className="w-full cursor-pointer select-none"
              >
                <img
                  src="/assets/images/t-shirt.png"
                  className="w-full aspect-square rounded-2xl mb-1.5 object-cover"
                />

                <h1 className="text-white text-[23px] font-cooper">
                  Tee-shirt {index + 1} - PRIX €
                </h1>

                <p className="font-frankfurter text-xs text-white mb-4">
                  Tatio totas dolorectae. Nempos ant rectatemos sim eaquunt
                  eossit, nossinus moluptas simporehent{" "}
                </p>

                <div className="flex items-center justify-end w-full">
                  <h3 className="font-cooper text-base text-white uppercase underline">
                    VOIR PLUS
                  </h3>
                  <Icon
                    icon="uis:arrow-down-right"
                    className="text-2xl text-white"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <Link
          to="/products"
          className="w-max font-zipper font-medium text-2xl flex items-center justify-center h-10 px-4 pt-2 mx-auto mt-10 cursor-pointer bg-white rounded-full"
        >
          Voir tous les produits
        </Link>
      </div>
      <img
        src="/assets/images/merchs.png"
        className="w-50 md:w-70 absolute -top-[5%] right-[5%]"
      />
    </div>
  );
};

const Gallery = () => {
  return (
    <div className="container mx-auto py-17 md:py-38.75">
      {/* Desktop Layout */}
      <div className="hidden md:block w-full">
        <div className="w-full grid grid-cols-2 gap-5 h-170 relative">
          <img src="/assets/images/gallery-1.png" className="w-full h-full" />
          <div className="grid grid-cols-2 gap-2 h-full">
            <img
              src="/assets/images/gallery-2.png"
              className="w-full h-full object-cover aspect-square"
            />
            <img
              src="/assets/images/gallery-3.png"
              className="w-full h-full object-cover aspect-square"
            />
            <img
              src="/assets/images/gallery-4.png"
              className="w-full h-full object-cover aspect-square"
            />
            <img
              src="/assets/images/gallery-5.png"
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          <img
            src="/assets/images/galerie.png"
            className="absolute -top-[7%] -left-[7%] w-70"
            alt=""
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden w-full relative">
        <div className="space-y-4">
          <img
            src="/assets/images/gallery-1.png"
            className="w-full h-auto rounded-lg"
          />
          <div className="grid grid-cols-2 gap-2">
            <img
              src="/assets/images/gallery-2.png"
              className="w-full h-[197px] object-cover rounded-lg"
            />
            <img
              src="/assets/images/gallery-3.png"
              className="w-full h-[197px] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img
              src="/assets/images/gallery-4.png"
              className="w-full h-[197px] object-cover rounded-lg"
            />
            <img
              src="/assets/images/gallery-5.png"
              className="w-full h-[197px] object-cover rounded-lg"
            />
          </div>
        </div>

        <img
          src="/assets/images/galerie.png"
          className="absolute -top-[5%] -left-[5%] w-40"
          alt=""
        />
      </div>
    </div>
  );
};

export const Contact = () => {
  return (
    <div className="max-w-full md:container mx-auto h-188.5 flex items-center justify-center">
      <div className="w-full md:w-[50%] h-full bg-primary py-12 px-5 md:px-16">
        <h1 className="uppercase font-zipper text-center md:text-left text-[72px] md:text-[120px] text-white mb-9.5">
          Contactez-nous
        </h1>

        <div className="grid grid-cols-2 w-full gap-2 mb-3">
          <Input label="Nom et prénom" />
          <Input label="Email" />
        </div>
        <Input label="Raison" className="mb-3" />
        <Input label="Message" inputType="textarea" className="mb-4" rows={8} />

        <button className="font-zipper font-medium text-2xl flex items-center justify-center h-10 px-4 pt-2 ml-auto cursor-pointer bg-white rounded-full">
          Envoyer
        </button>

        <div className="grid grid-cols-2 w-full max-w-113 mx-auto mt-14 md:mt-0">
          <div className="flex flex-col items-center">
            <div className="w-full mb-1">
              <img src="/assets/images/telephone.png" className="w-32" />
            </div>
            <h3 className="font-zipper font-medium text-white text-[38px]">
              07 88 62 42 14
            </h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full mb-1">
              <img src="/assets/images/instagram.png" className="w-32" />
            </div>
            <h3 className="underline font-zipper font-medium text-white text-[38px]">
              kebsbaba.fr
            </h3>
          </div>
        </div>
      </div>
      <div className="w-[50%] h-full hidden md:block">
        <img src="/assets/images/breakdancer.png" className="w-full h-full" />
      </div>
    </div>
  );
};

export const NotrePlaylist = () => {
  return (
    <div className="container mx-auto py-12 h-screen md:h-auto md:py-32.5 relative">
      <h1 className="text-center text-primary uppercase font-zipper text-[70px] md:text-[100px] mb-20 md:mb-9">
        notre <br className="block md:hidden" /> playlist
      </h1>

      <div className="z-50 relative rounded-2xl max-w-137.5 w-full mx-auto">
        <div className="bg-[#b9120a] rounded-tl-2xl rounded-tr-2xl p-6 relative">
          <div className="flex items-center gap-4">
            <img
              src="/assets/images/album.png"
              className="w-30 h-30 rounded-2xl"
            />
            <div className="">
              <h3 className="font-frankfurter text-xl text-white">Kebs Baba</h3>
              <h3 className="text-sm text-white/70 mb-2.5">111737373737122</h3>

              <div className="flex items-center gap-3 cursor-pointer select-none mb-4">
                <Icon
                  icon="simple-line-icons:plus"
                  className="w-6 h-6 text-white"
                />

                <span className="text-sm text-white">Save on Spotify</span>
              </div>

              <div className="flex items-center">
                <div className="flex items-center gap-2 mr-4">
                  <Icon
                    icon="fluent:previous-32-filled"
                    className="w-5 h-5 text-white"
                  />
                  <div className="bg-[#761107] w-50 h-1.5 rounded-full"></div>
                  <Icon
                    icon="fluent:next-32-filled"
                    className="w-5 h-5 text-white"
                  />
                </div>

                <span className="text-sm text-white">00:00</span>
              </div>
            </div>
          </div>

          <Icon
            icon="oi:play-circle"
            className="w-10 h-10 text-white absolute bottom-5 right-5"
          />
          <Icon
            icon="mdi:spotify"
            className="w-7 h-7 text-white absolute top-4 right-4"
          />
        </div>

        <div className="bg-[#991008] rounded-br-2xl rounded-bl-2xl w-full">
          <div className="flex items-center justify-between w-full p-5">
            <div className="flex items-center gap-4">
              <span className="text-base font-frankfurter text-white/70">
                1
              </span>
              <div className="flex flex-col items-start">
                <span className="text-white text-base font-frankfurter">
                  Çöpçüler
                </span>
                <span className="text-xs text-white/70">Erkin Koray</span>
              </div>
            </div>

            <span className="text-sm text-white">03:32</span>
          </div>

          <div className="flex items-center justify-between w-full p-5">
            <div className="flex items-center gap-4">
              <span className="text-base font-frankfurter text-white/70">
                1
              </span>
              <div className="flex flex-col items-start">
                <span className="text-white text-base font-frankfurter">
                  Namus Belası
                </span>
                <span className="text-xs text-white/70">Cem Karaca</span>
              </div>
            </div>

            <span className="text-sm text-white">04:32</span>
          </div>
        </div>
      </div>

      <AnimatedLabel className="absolute bottom-[50%] -right-[14%] md:bottom-[5%] md:right-[10%]">
        <img src="/assets/images/play-baba.png" className="w-62.5" />
      </AnimatedLabel>
      <AnimatedLabel className="absolute bottom-0 md:top-[15%] -left-[10%] md:left-[2.5%]">
        <img src="/assets/images/listen-baba.png" className="w-62.5" />
      </AnimatedLabel>

      <img
        src="/assets/images/magic-1.png"
        className="w-34 absolute top-[5%] -left-[5%] md:top-[5%] md:left-[20%]"
      />
      <img
        src="/assets/images/magic-2.png"
        className="w-28.5 md:w-42.5 absolute right-[30%] bottom-[15%] md:bottom-0 md:left-[5%]"
      />
      <img
        src="/assets/images/magic-4.png"
        className="w-14.5 absolute top-[1%] right-[1%] md:top-[3%] md:right-[22%]"
      />
      <img
        src="/assets/images/magic-3.png"
        className="w-18 md:w-21.75 absolute bottom-[15%] right-[10%] md:top-[10%] md:right-[25%]"
      />
    </div>
  );
};

const Truk = () => {
  const trukImages = [
    "/assets/images/truk-1.png",
    "/assets/images/truk-2.png",
    "/assets/images/truk-3.png",
    "/assets/images/truk-4.png",
  ];
  return (
    <div className="bg-primary rounded-tl-[48px] rounded-tr-[48px] w-full py-7 md:py-17.5 relative">
      <div className="container mx-auto flex flex-col md:flex-row items-start gap-8">
        <div className="max-w-300 w-full">
          <img
            src="/assets/images/baba-truk.png"
            className="block md:hidden w-50 ml-auto mb-8"
          />

          <img
            src={trukImages[0]}
            className="mb-4 w-full h-149.25 object-cover rounded-[34px]"
          />
          <div className="grid grid-cols-3 gap-3.5 w-full">
            {trukImages.slice(1).map((e) => {
              return (
                <img
                  src={e}
                  className="w-full h-45 object-cover rounded-[34px]"
                />
              );
            })}
          </div>
        </div>

        <div>
          <img
            src="/assets/images/baba-truk.png"
            className="hidden md:block w-125 mb-8"
          />

          <p className="font-frankfurter text-lg text-white mb-6">
            Tatio totas dolorectae. Nempos ant rectatemos sim eaquunt eossit,
            nossinus moluptas simporehent aut rehendis quosae nonsequo bea
            denihit, ut fugitis denim eaquis di occaborem dit{" "}
          </p>

          <p className="font-frankfurter text-lg text-white mb-8">
            modicat iumendem nemporem. Itae vo lo eum veliciaTatio totas
            dolorectae. Nempos ant rectatemos sim
          </p>

          <div className="space-y-5">
            <Input label="Nom et prénom" />
            <Input label="Email" />
            <Input label="Raison" />
            <Input label="Message" inputType="textarea" rows={7} />

            <button className="font-zipper font-medium text-2xl flex items-center justify-center h-10 px-4 pt-2 ml-auto cursor-pointer bg-white rounded-full">
              Envoyer
            </button>
          </div>
        </div>
      </div>

      <img
        src="/assets/images/baba-fuck.png"
        className="w-40 md:w-50 absolute -top-[5%] left-0 md:-top-[7%] md:left-[6%] -rotate-8"
      />
    </div>
  );
};

const Quality = () => {
  return (
    <div className="container mx-auto my-20 relative">
      <h1 className="uppercase font-zipper text-[80px] md:text-[132px] mb-12 md:mb-18.75 font-medium text-primary text-center">
        A cheval <br className="block md:hidden" /> sur la qualité
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <div className="w-full space-y-8">
          <p className="text-xl text-primary font-frankfurter">
            Les broches de Baba sont montées chaque matin à l’huile de coude de
            nos chefs kebabier. On travaille avec du boeuf frais, tranché, pas
            haché ! Comme à Instanbul
          </p>

          <p className="text-xl text-primary font-frankfurter">
            Le poulet quant à lui est un mélange de cuisses et d’escalopes, pour
            2x plus de kiff et 2 x mois de gras ! Nos marinades, à base de
            yaourt et d’épices, subliment le goût de la viande, sans le masquer
          </p>
        </div>

        <div className="w-full space-y-8">
          <p className="text-xl text-primary font-frankfurter">
            Notre pain crousti-moelleux sort tous les jours du four de notre
            artisan boulanger.
          </p>

          <p className="text-xl text-primary font-frankfurter">
            Sons secret ? Du levain naturel ! C’est pour ça qu’il se digère bien
            et que t’as pas l’impression d’avoir avalé une enclume après avoir
            mangé un de nos kebabs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full mt-10">
        <img src="/assets/images/kebab-1.png" />
        <img src="/assets/images/kebab-2.png" />
        <img src="/assets/images/kebab-3.png" />
        <img src="/assets/images/kebab-4.png" />
      </div>

      <img
        src="/assets/images/bonheur-cuisine.png"
        className="w-40 md:w-43.5 absolute -top-[8.5%] md:-top-[10%] right-[5%] rotate-20"
      />

      <img
        src="/assets/images/grillade.png"
        className="w-28 md:w-35 absolute -bottom-[7%] -right-[4%]"
      />
    </div>
  );
};

const Comments = () => {
  // Mock data - 12 adet yorum
  const comments = Array.from(Array(12).keys()).map((index) => ({
    id: index + 1,
    pseudo: `Pseudo${index + 1}`,
    text: "Tatio totas dolorectae. Nempos ant rectatemos sim eaquunt eossit, nossinus moluptas simporehent aut rehendis quosae nonsequo bea denihit, ut fugitis denim eaquis di occaborem dit facepro voloreptas unt laborem nihil modicat iumendem nemporem. Itae vo",
  }));

  return (
    <div className="relative py-12">
      <div className="container mx-auto">
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            navigation={{
              prevEl: ".comments-prev",
              nextEl: ".comments-next",
            }}
            breakpoints={{
              768: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
            }}
            className="w-full"
          >
            {comments.map((comment) => (
              <SwiperSlide key={comment.id}>
                <div className="w-full max-w-75 mx-auto border-2 border-primary h-60 rounded-[18px] px-4 flex items-center justify-center flex-col">
                  <h3 className="mb-2 text-sm font-cooper">{comment.pseudo}</h3>
                  <img
                    src="/assets/images/stars.png"
                    className="w-27.5 h-5 mb-4"
                  />
                  <p className="font-frankfurter text-sm text-center">
                    {comment.text}
                  </p>
                  <div className="w-full mt-1">
                    <img src="/assets/images/google.png" className="w-11.5" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="comments-prev absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-10">
            <img
              className="w-10 h-10"
              src="/assets/images/arrow-left-red.png"
              alt="Previous"
            />
          </button>
          <button className="comments-next absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-10">
            <img
              className="w-10 h-10"
              src="/assets/images/arrow-right-red.png"
              alt="Next"
            />
          </button>
        </div>
      </div>

      <img
        src="/assets/images/avis.png"
        className="w-47.5 h-18.25 absolute top-3 left-5 z-20"
      />
    </div>
  );
};

const Menu = () => {
  const ArrowLeft = ({ className }: { className?: string }) => {
    return (
      <button className={className}>
        <img src="/assets/images/arrow-left.png" className="w-10 h-10" />
      </button>
    );
  };

  const ArrowRight = ({ className }: { className?: string }) => {
    return (
      <button className={className}>
        <img src="/assets/images/arrow-right.png" className="w-10 h-10" />
      </button>
    );
  };

  return (
    <div className="bg-primary w-full h-auto py-8">
      <img
        src="/assets/images/la-carte.png"
        className="w-[350px] md:w-[400px] mx-auto mb-8"
      />

      <div className="flex items-center justify-center gap-10 mb-4 md:mb-0">
        <ArrowLeft className="hidden md:block" />
        <img
          src="/assets/images/menu-pc-1.png"
          className="hidden md:block w-[90%]"
        />
        <img
          src="/assets/images/menu-mobile-1.png"
          className="block md:hidden w-full"
        />
        <ArrowRight className="hidden md:block" />
      </div>

      <div className="flex md:hidden items-center justify-center gap-5">
        <ArrowLeft />
        <ArrowRight />
      </div>

      {/* Address Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div className="opacity-70 cursor-pointer hover:opacity-100 transition-all address-item w-full py-8 px-4">
          {/* Main Title */}
          <h2 className="address-title mb-4">KEBS BABA KRUTENAU</h2>

          {/* Opening Hours */}
          <div className="space-y-2">
            <p className="address-text">de 11h45 à 23h du dimanche au jeudi</p>
            <p className="address-text">
              et de 11h45 à 01h le vendredi et samedi
            </p>
          </div>
        </div>

        <div className="opacity-70 cursor-pointer hover:opacity-100 transition-all address-item w-full py-8 px-4">
          {/* Main Title */}
          <h2 className="address-title mb-4">KEBS BABA KRUTENAU</h2>

          {/* Opening Hours */}
          <div className="space-y-2">
            <p className="address-text">de 11h45 à 23h du dimanche au jeudi</p>
            <p className="address-text">
              et de 11h45 à 01h le vendredi et samedi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhoIsTheFuckingBaba = () => {
  return (
    <div className="container mx-auto py-12 flex flex-col md:flex-row items-center justify-center md:justify-between relative">
      <div className="max-w-[600px] flex items-center md:items-start justify-center flex-col w-full">
        <img
          src="/assets/images/who-is-the-fucking-baba.png"
          className="w-[472px] hidden mb-12 md:block"
        />
        <img
          src="/assets/images/who-is-the-fucking-baba-mobile.png"
          className="w-[342px] block md:hidden mb-12"
        />

        <p className="text-primary mb-4 text-lg font-frankfurter">
          C’était un mardi pluvieux d’avril 2022, à quelques pas d’la Place de
          l’homme de fer.
        </p>

        <p className="text-primary mb-4 text-lg font-frankfurter">
          Il est apparu comme ça, avec sa grosse stache, sa casquette rouge et
          son pantalon pattes d’eph. Certains disent qu’il viendrait d’Istanbul,
          d’autre de Berlin. D’autres encore, qu’il a toujours été là. En
          Alsace, on rigole zéro avec le Döner Kebab, c’est sacré !
        </p>

        <p className="text-primary mb-4 text-lg font-frankfurter">
          C’est le rituel des dimanches midi en famille (ou en gueule de bois).
          C’est la valeur sure, celle qui remplit bien l’bide, celle qui
          réchauffe et qui rassemble ! 
        </p>

        <p className="text-primary mb-4 text-lg font-frankfurter">
          Alors quand il a ouvert son premier établissement, autant dire que
          tout le monde l’attendait au tournant. Deux ans plus tard, Baba s’est
          imposé dans le coeur de Alsaciens, avec ses kebs maisons, frais et
          gourmands, inspirées des voyages aventures de Baba entre l’Allemagne
          et la Turquie. 
        </p>
        <p className="text-primary mb-4 text-lg font-frankfurter">
          Mais alors qu’on pensait tout savoir sur Baba, on raconte depuis peu
          qu’il viverait une double vie, et que le boug serait aussi un fou de
          Disco. 
        </p>
        <p className="text-primary mb-4 text-lg font-frankfurter">
          On raconte que certains soirs, dans sa deuxième maison, à la Krutenau,
          Baba organise des soirées Disco jusqu’à l’aube, et qu’il aurait même
          une broche à facettes… 
        </p>
        <p className="text-primary mb-4 text-lg font-frankfurter">
          Mais ça, il faut le voir pour le croire.
        </p>
      </div>
      <img
        src="/assets/images/ozgur-hamza.png"
        className="relative w-[700px]"
      />

      <img
        src="/assets/images/sticker-baba.png"
        className="hidden md:block w-[309px] absolute bottom-0 right-0"
      />
      <img
        src="/assets/images/sticker-baba-mobile.png"
        className="z-30 block md:hidden w-[209px] absolute bottom-0 -left-5"
      />
    </div>
  );
};

const Address = () => {
  return (
    <div className="relative py-12 mt-12 h-auto w-full container mx-auto bg-cover bg-no-repeat bg-[url('/assets/images/address-bg.png')]">
      <img
        src="/assets/images/addresses-title.png"
        alt="address title"
        className="pb-14 w-[440px] mx-auto h-auto object-contain"
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 w-full max-w-full md:max-w-6xl mx-auto h-auto">
        <div className="h-auto p-7 pb-12 relative w-full bg-cover md:bg-contain bg-no-repeat bg-center bg-[url('/assets/images/paper.png')]">
          <img
            src="/assets/images/krutenau.png"
            className="w-full my-4 object-contain"
          />
          <div className="w-full h-0.5 bg-black mb-2"></div>
          <h3 className="font-frankfurter text-2xl font-bold">Addresse</h3>
          <div className="flex items-center justify-between w-full">
            <div className="max-w-[200px] w-full">
              <p className="font-frankfurter text-lg">
                14 rue Munch Krutenau 67000 STRASBOURG
              </p>
            </div>

            <div className="flex flex-col items-end justify-center">
              <p className="text-lg font-frankfurter">Voir sur la carte</p>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/images/arrow-external-icon.png"
                  className="w-2.5 h-2.5 object-contain"
                />
                <p className="underline cursor-pointer text-lg font-frankfurter">
                  Google Map
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-0.5 bg-black mb-2 mt-2"></div>
          <div className="w-full h-0.5 bg-black mb-5"></div>

          <img
            src="/assets/images/krutenau-img.png"
            className="w-full h-auto object-contain"
          />

          <img
            src="/assets/images/order-btn.png"
            className="ml-auto w-[232px] h-10 mt-6"
          />
        </div>

        <div className="h-auto p-7 pb-12 relative w-full bg-cover md:bg-contain bg-no-repeat bg-center bg-[url('/assets/images/paper.png')]">
          <img
            src="/assets/images/centre.png"
            className="w-full my-4 object-contain"
          />
          <div className="w-full h-0.5 bg-black mb-2"></div>
          <h3 className="font-frankfurter text-2xl font-bold">Addresse</h3>
          <div className="flex items-center justify-between w-full">
            <div className="max-w-[200px] w-full">
              <p className="font-frankfurter text-lg">
                14 rue Munch Krutenau 67000 STRASBOURG
              </p>
            </div>

            <div className="flex flex-col items-end justify-center">
              <p className="text-lg font-frankfurter">Voir sur la carte</p>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/images/arrow-external-icon.png"
                  className="w-2.5 h-2.5 object-contain"
                />
                <p className="underline cursor-pointer text-lg font-frankfurter">
                  Google Map
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-0.5 bg-black mb-2 mt-2"></div>
          <div className="w-full h-0.5 bg-black mb-5"></div>

          <img
            src="/assets/images/centre-img.png"
            className="w-full h-auto object-contain"
          />

          <img
            src="/assets/images/order-btn.png"
            className="ml-auto w-[232px] h-10 mt-6"
          />
        </div>
      </div>

      <img
        src="/assets/images/baba.png"
        className="z-20 absolute -bottom-10 left-0 md:bottom-[4%] md:left-[2.5%] w-[120px] md:w-[213px] object-contain"
      />
    </div>
  );
};

const Slider = () => {
  const slides = [
    "/assets/images/slide-1.png",
    "/assets/images/slide-2.png",
    "/assets/images/slide-3.png",
  ];

  return (
    <div className="relative overflow-visible z-10 container mx-auto">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        breakpoints={{
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const IntroText = () => {
  return (
    <div className="py-8 md:py-12 container mx-auto relative z-20">
      <img
        src="/assets/images/kebs-baba.png"
        alt="intro text"
        className="z-20 hidden md:block"
      />

      <img
        src="/assets/images/kebs-baba-mobile.png"
        alt="intro text"
        className="z-20 block md:hidden"
      />

      <div className="hidden md:block">
        <AnimatedLabel
          className="absolute top-0 right-5 w-[125px] h-[161px]"
          style={{ transform: "rotate(-12deg)", transformOrigin: "50% 75%" }}
        >
          <img
            src="/assets/images/kebs-lover.png"
            className="w-full h-full object-contain"
          />
        </AnimatedLabel>

        <img
          src="/assets/images/ouvert.png"
          className="w-[152px] h-[138px] object-contain absolute top-0 left-1/3"
        />

        {/* bonheur kebabs */}
        <img
          src="/assets/images/bonheur-kebab.png"
          className="w-[143px] object-contain absolute top-[6%] left-[57%]"
        />
        <img
          src="/assets/images/bonheur-kebab.png"
          className="w-[143px] object-contain absolute bottom-8 left-[20%]"
        />
        {/* bonheur kebabs end  */}

        <AnimatedLabel className="w-[158px] object-contain absolute bottom-[6%] left-[2%]">
          <img
            src="/assets/images/bonheur-cuisine.png"
            className="w-full h-full object-contain"
          />
        </AnimatedLabel>

        <img
          src="/assets/images/sur-place.png"
          className="w-[220px] absolute -bottom-[6%] right-[9%]"
        />
      </div>

      <div className="block md:hidden">
        <AnimatedLabel
          className="absolute top-1/2 -translate-y-1/2 left-[20%] w-[110px]"
          style={{ transform: "rotate(-12deg)", transformOrigin: "50% 75%" }}
        >
          <img
            src="/assets/images/kebs-lover.png"
            className="w-full h-full object-contain"
          />
        </AnimatedLabel>
        <img
          src="/assets/images/ouvert.png"
          className="absolute -bottom-12 -left-5 w-[136px] object-contain"
        />
        <img
          src="/assets/images/bonheur-kebab.png"
          className="absolute -bottom-2 right-8 w-[116px] object-contain"
        />
        <img
          src="/assets/images/sur-place.png"
          className="w-[123px] absolute top-0 right-[11%]"
        />
      </div>
    </div>
  );
};

const AnimatedLabel = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        rotate: [0, -1.5, 1.5, -1.5, 1.5, 0],
        x: [0, 4, -4, 4, -4, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

const InstagramButton = ({ className }: { className?: string }) => {
  return (
    <img
      className={cn("cursor-pointer select-none", className)}
      src="/assets/images/insta-button.png"
      alt="facebook"
    />
  );
};

const MerchsButton = ({ className }: { className?: string }) => {
  return (
    <Link to="/products">
      <img
        className={cn("cursor-pointer select-none", className)}
        src="/assets/images/merchs-button.png"
        alt="merchs"
      />
    </Link>
  );
};

export const Marquee = ({
  text = "ÉVÈNEMENTS DISCO KEBAB de 21h à 3h30 à Kebs BABA Krutenau le vendredi 3 octobre 2025",
  textColor = "text-white",
  bgColor = "bg-primary",
  textSize = "text-[32px]",
}) => {
  return (
    <div
      className={cn("pt-2 flex items-center w-full overflow-hidden", bgColor)}
    >
      <motion.div
        className="flex items-center"
        animate={{
          x: [0, -33.333 + "%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          },
        }}
      >
        {[...Array(3)].map((_, i) => (
          <p
            key={i}
            className={cn(
              "ml-2 font-bold font-zipper whitespace-nowrap p-0 leading-none shrink-0",
              textColor,
              textSize
            )}
          >
            {text}
          </p>
        ))}
      </motion.div>
    </div>
  );
};
