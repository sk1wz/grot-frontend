import { Advantages } from "@/widgets/advantages";
import { Checks } from "@/widgets/checks";
import { Footer } from "@/widgets/footer";
import { Hero } from "@/widgets/hero";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px]">
      <Hero />
      <Advantages />
      <Checks />
      <Footer />
    </main>
  );
}
