import CardsSection from "@/app/components/molecules/CardsSection";
import HeroCover from "@/app/components/molecules/HeroCover";
import AdoptionCover from "@/app/components/molecules/AdoptionCover";
import HeroSection from "@/app/components/molecules/HeroSection";
import Sellers from "@/app/components/molecules/Sellers";
import Knowledge from "@/app/components/molecules/usefulKnowledge";
import RegisterBar from "@/app/layouts/RegisterBar";
import * as images from "@/assets/images/images";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CardsSection
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
