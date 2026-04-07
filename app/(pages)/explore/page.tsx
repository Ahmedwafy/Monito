import * as images from "@/assets/images/images";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Explore Page</h1>
      <div>
        <Image
          src={images.soon}
          alt="Coming Soon"
          className="mx-auto my-10 w-1/2"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default page;
