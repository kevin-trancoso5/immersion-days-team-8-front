import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Restaurant Marmaris" },
    { name: "description", content: "Bienvenue au Restaurant Marmaris!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
