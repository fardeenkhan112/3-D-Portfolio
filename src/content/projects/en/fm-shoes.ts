import thumbnailFMShoes from "../../../assets/thumbnails/fm-shoes.png";
import type { ProjectContent } from "../../types";

export default {
  title: "FM Shoes E-Commerce",
  theme: "dark",
  tags: ["ecommerce", "javascript", "html", "css"],
  live: "https://fm-shoes.surge.sh/",
  source: "https://github.com/fardeenkhan112/FM-SHOES",
  description:
    "FM Shoes is a responsive footwear e-commerce website built with JavaScript and Firebase.<br/><br/>It includes product browsing, shopping cart functionality, Google Sign-In authentication, EmailJS email notifications, and WhatsApp ordering.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: thumbnailFMShoes,
        alt: "FM Shoes e-commerce website",
        caption: "Footwear storefront with cart and Firebase authentication",
      },
    },
  ],
} as const satisfies ProjectContent;