import thumbnailUnoCards from "../../../assets/thumbnails/uno-cards.png";
import type { ProjectContent } from "../../types";

export default {
  title: "UNO Cards — Real-Time Multiplayer",
  theme: "dark",
  tags: ["websockets", "react", "typescript", "node", "express"],
  live: "https://uno-king.dockhosting.dev/",
  source: "https://github.com/fardeenkhan112/UNO-king",
  description:
    "A real-time multiplayer UNO card game built with React, TypeScript, Node.js, Express and Socket.IO.<br/><br/>Players can create or join rooms using room codes, play with up to eight players, chat during games, and communicate through in-game voice chat. Game interactions are validated on the server.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: thumbnailUnoCards,
        alt: "UNO Cards multiplayer game",
        caption: "Multiplayer rooms, real-time chat and voice",
      },
    },
  ],
} as const satisfies ProjectContent;