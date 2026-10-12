import thumbnailUnoCards from "../../../assets/thumbnails/uno-cards.png";
import thumbnailShopCoEcommerce from "../../../assets/thumbnails/shop-co-ecommerce.png";
import thumbnailNaseeb from "../../../assets/thumbnails/naseeb-biryani.png";
import thumbnailFMShoes from "../../../assets/thumbnails/fm-shoes.png";
import type { ProjectPreview } from "../../types";

export default [
  {
    title: "UNO-Kartenspiel",
    slug: "uno-cards",
    thumbnail: thumbnailUnoCards,
    description: "Echtzeit-Multiplayer mit Chat und Sprachfunktion",
  },
  {
    title: "SHOP.CO E-Commerce",
    slug: "shop-co-ecommerce",
    thumbnail: thumbnailShopCoEcommerce,
    description: "Mode-Shop mit REST-API und Warenkorb",
  },
  {
    title: "Naseeb Biryani",
    slug: "naseeb-biryani",
    thumbnail: thumbnailNaseeb,
    description:
      "Restaurant-Website mit dynamischer Speisekarte und WhatsApp-Bestellung",
  },
  {
    title: "FM Shoes",
    slug: "fm-shoes",
    thumbnail: thumbnailFMShoes,
    description:
      "Schuh-Shop mit Firebase-Anmeldung und Warenkorb",
  },
] as const satisfies ProjectPreview[];
