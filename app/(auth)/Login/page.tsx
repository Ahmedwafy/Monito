import * as images from "@/assets/images/images";
import Image from "next/image";

const Login = () => {
  return (
    <div>
      <Image
        src={images.soon}
        alt="Coming Soon"
        className="mx-auto my-10 w-1/2"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Login;
