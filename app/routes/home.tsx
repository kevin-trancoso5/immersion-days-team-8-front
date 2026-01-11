import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marmaris Restaurant" },
    { name: "description", content: "Welcome to Marmaris Restaurant!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
