import { Advantages } from "@/widgets/advantages/ui/Advantages";
import { Hero } from "@/widgets/hero/ui/Hero";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px]">
      <Hero />
      <Advantages />
    </main>
  );
}
