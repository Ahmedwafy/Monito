import * as images from "@/assets/images/images";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div>
        <Image
          src={images.comingSoon}
          alt="Coming Soon"
          className="mx-auto my-10 h-screen object-contain"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default page;
