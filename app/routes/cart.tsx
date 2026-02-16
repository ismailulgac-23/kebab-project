import React, { useState } from "react";
import { Topbar } from "./home";
import { Head } from "./product-detail";
import classNames from "classnames";
import { Icon } from "@iconify/react";

const Cart = () => {
  return (
    <div>
      <Topbar />

      <div className="container mx-auto mt-12 pb-12">
        <Head>Revenir</Head>

        <h1 className="mt-12 font-zipper text-[84px] font-medium text-primary">
          Panier
        </h1>

        <div className="mb-10 w-full h-0.5 bg-primary"></div>

        <div className="flex flex-col md:flex-row items-start gap-15.5 w-full">
          <div className="w-full md:w-[calc(100%-395px)] space-y-5">
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="w-98.75 rounded-3xl border-2 border-primary p-6">
            <h3 className="font-zipper font-medium text-[40px] mb-3">
              Récapitulatif de commande
            </h3>

            <SummaryItem title="Sous-total" value="20,99€" />
            <SummaryItem title="Livraison" value="?" />
            <SummaryItem title="TVA" value="-" />
            <SummaryItem
              title="Total"
              value="10,99€"
              isPrimary
              className="mb-7"
            />

            <button className="w-full h-12 bg-primary text-white rounded-full flex items-center justify-between px-5">
              <span className="font-frankfurter text-base">Paiement</span>
              <Icon icon="mdi:arrow-right" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleQuantitySelect = (qty: number) => {
    setQuantity(qty);
    setIsDropdownOpen(false);
  };

  return (
    <div className="rounded-3xl w-full border-2 border-primary h-[160px] flex items-center">
      <img
        src="/assets/images/t-shirt.png"
        className="h-full rounded-tl-3xl rounded-bl-3xl w-[120px] md:w-[160px] object-cover"
      />

      <div className="w-full mx-2.5 md:mx-6">
        <h3 className="text-[20px] md:text-[34px] font-cooper text-primary mb-2">
          Bob de Baba
        </h3>
        <p className="underline font-frankfurter text-lg md:text-xl mb-2 cursor-pointer hover:text-primary/80 transition-colors">
          Supprimer
        </p>

        <div className="w-full flex items-center justify-between">
          {/* Custom Dropdown */}
          <div className="relative">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border-2 border-primary h-10 px-4 rounded-full flex items-center justify-center gap-4 w-max cursor-pointer hover:bg-primary/5 transition-colors"
            >
              <span className="font-frankfurter text-base">Quantité {quantity}</span>
              <Icon
                icon="mdi:chevron-down"
                className={classNames("w-5 h-5 transition-transform", {
                  "rotate-180": isDropdownOpen
                })}
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-12 left-0 bg-white border-2 border-primary rounded-2xl shadow-lg z-10 min-w-[140px]">
                <div className="py-2">
                  {quantities.map((qty) => (
                    <div
                      key={qty}
                      onClick={() => handleQuantitySelect(qty)}
                      className={classNames(
                        "px-4 py-2 cursor-pointer font-frankfurter text-base hover:bg-primary/10 transition-colors",
                        {
                          "bg-primary text-white": qty === quantity,
                          "text-primary": qty !== quantity,
                        }
                      )}
                    >
                      Quantité {qty}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overlay to close dropdown */}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-5"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}
          </div>

          <span className="text-2xl font-frankfurter text-primary">5,99€</span>
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({ title, value, isPrimary = false, className }: any) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between w-full",
        className
      )}
    >
      <h1
        className={classNames("text-base font-frankfurter", {
          "text-primary": isPrimary,
        })}
      >
        {title}
      </h1>
      <h1
        className={classNames("text-base font-frankfurter", {
          "text-primary": isPrimary,
        })}
      >
        {value}
      </h1>
    </div>
  );
};

export default Cart;
