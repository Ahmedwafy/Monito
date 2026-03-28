import * as images from "@/assets/images/images";
import Image from "next/image";

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src={images.comingSoon}
        alt="Coming Soon"
        // width={1000}
        // height={1000}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default ComingSoon;
