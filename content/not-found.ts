import type { NotFoundContent } from "./types";

export const notFound: NotFoundContent = {
  eyebrow: "Error 404",
  title: "Page not found",
  body: "The page you are looking for does not exist or has moved.",
  homeLink: { label: "Back to home", href: "/" },
  he: {
    body: "הדף שחיפשת לא נמצא.",
    homeLink: { label: "לדף הבית בעברית", href: "/he" },
  },
};
