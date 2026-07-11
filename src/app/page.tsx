import { Advantages } from "@/widgets/main/advantages";
import { Checks } from "@/widgets/main/checks";
import { Footer } from "@/widgets/main/footer";
import { Hero } from "@/widgets/main/hero";

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
