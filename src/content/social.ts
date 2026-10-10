export const social = [
  {
    url: "https://wa.me/923248227557",
    name: "whatsapp",
  },
  {
    url: "https://github.com/fardeenkhan112",
    name: "github",
  },
  {
    url: "https://www.linkedin.com/in/fardeen-sharukh/",
    name: "linkedin",
  },
] as const satisfies {
  url: string;
  name: "mail" | "github" | "instagram" | "x" | "linkedin" | "whatsapp";
}[];