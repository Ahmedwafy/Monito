import CardsSection from "@/components/molecules/CardsSection";
import HeroCover from "@/components/molecules/HeroCover";
import AdoptionCover from "@/components/molecules/AdoptionCover";
import HeroSection from "@/components/molecules/HeroSection";
import Sellers from "@/components/molecules/Sellers";
import Knowledge from "@/components/molecules/usefulKnowledge";
import RegisterBar from "@/app/layouts/RegisterBar";
import * as images from "@/assets/images/images";

const HomePage = () => {
  return (
    <main className="dark:bg-(--color-neutral-0)">
      <HeroSection />
      <CardsSection
        type="pets"
        question="Whats new?"
        title="Take A Look At Some Of Our Pets"
        images={[
          images.cat1,
          images.cat2,
          images.cat3,
          images.cat4,
          images.dog1,
          images.dog2,
          images.dog3,
          images.dog4,
        ]}
      />
      <HeroCover />
      <CardsSection
        type="products"
        question="Hard to choose right products for your pets?"
        title="Our Products"
        images={[
          images.product1,
          images.product2,
          images.product3,
          images.product4,
          images.product5,
          images.product6,
          images.product7,
          images.product8,
        ]}
      />
      <Sellers />
      <AdoptionCover />
      <Knowledge />
      <RegisterBar />
    </main>
  );
};

export default HomePage;
