import Link from "next/link";
import * as images from "@/assets/images/images";
import Image from "next/image";

const petsFamily = () => {
  return (
    <div>
      {/* <span>petsFamily</span>
      <Link href="login">Login</Link>
      <Link href="signUp">Sign Up</Link> */}

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

export default petsFamily;
