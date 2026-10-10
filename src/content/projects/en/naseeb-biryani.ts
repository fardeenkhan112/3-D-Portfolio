import thumbnail from "../../../assets/thumbnails/naseeb-biryani.png";
import type { ProjectContent } from "../../types";

export default {
  title: "Naseeb Biryani",
  theme: "dark",
  tags: ["react", "tailwind", "javascript"],
  live: "https://naseebbiryani.netlify.app/",
  source: "https://github.com/fardeenkhan112/naseeb-biryani",
  description:
    "Naseeb Biryani is a responsive restaurant website built with React, Tailwind CSS and Firebase.<br/><br/>It features a dynamic menu, customer reviews, authentication, admin content management and WhatsApp ordering for customers.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: thumbnail,
        alt: "Naseeb Biryani restaurant website",
        caption: "Restaurant menu and WhatsApp ordering experience",
      },
    },
  ],
} as const satisfies ProjectContent;