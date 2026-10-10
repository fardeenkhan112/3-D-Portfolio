import thumbnailUnoCards from "../../../assets/thumbnails/uno-cards.png";
import thumbnailShopCoEcommerce from "../../../assets/thumbnails/shop-co-ecommerce.png";
import thumbnailNaseeb from "../../../assets/thumbnails/naseeb-biryani.png";
import thumbnailFMShoes from "../../../assets/thumbnails/fm-shoes.png";
import type { ProjectPreview } from "../../types";

export default [
  {
    title: "UNO Cards",
    slug: "uno-cards",
    thumbnail: thumbnailUnoCards,
    description: "Real-time multiplayer UNO with chat and voice",
  },
  {
    title: "SHOP.CO E-Commerce",
    slug: "shop-co-ecommerce",
    thumbnail: thumbnailShopCoEcommerce,
    description: "Full-stack fashion store with REST API and cart",
  },
  {
    title: "Naseeb Biryani",
    slug: "naseeb-biryani",
    thumbnail: thumbnailNaseeb,
    description: "Restaurant website with dynamic menu and WhatsApp ordering",
  },
  {
    title: "FM Shoes",
    slug: "fm-shoes",
    thumbnail: thumbnailFMShoes,
    description: "Footwear store with Firebase authentication and cart",
  },
] as const satisfies ProjectPreview[];