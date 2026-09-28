import * as images from "@/assets/images/images";
import Image from "next/image";

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src={images.comingSoon}
        alt="Coming Soon"
        className="mx-auto my-10"
        width={500}
        height={500}
      />
    </div>
  );
};

export default ComingSoon;
