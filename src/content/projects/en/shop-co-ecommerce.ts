import thumbnailShopCoEcommerce from "../../../assets/thumbnails/shop-co-ecommerce.png";
import type { ProjectContent } from "../../types";

export default {
  title: "SHOP.CO E-Commerce",
  theme: "dark",
  tags: ["ecommerce", "react", "node", "express", "mongodb", "mern"],
  live: "https://shop-1-co.netlify.app/",
  source: "https://github.com/fardeenkhan112/shop-co",
  description:
    "SHOP.CO is a responsive full-stack fashion e-commerce platform built with React and Vite, supported by a Node.js and Express REST API with MongoDB and Mongoose.<br/><br/>It includes product categories, product detail pages, product browsing, and shopping cart state management using React Context API.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: thumbnailShopCoEcommerce,
        alt: "SHOP.CO E-Commerce Platform",
        caption: "Full-stack fashion e-commerce platform",
      },
    },
  ],
} as const satisfies ProjectContent;