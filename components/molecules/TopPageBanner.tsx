// import Link from "next/link";
import Link from "next/link";
// import Button from "../atoms/Button";
// import * as icons from "@/assets/icons";

interface TopBannerTypes {
  handleClick?: () => void;
  title: string;
  subTitle?: string;
  description: string;
  btnTitle?: string;
  btnTitle2?: string;
  href?: string;
}

const TopPageBanner = ({
  handleClick,
  title,
  subTitle,
  description,
  btnTitle,
  btnTitle2,
  href,
}: TopBannerTypes) => {
  return (
    <section className="relative container overflow-hidden rounded-3xl bg-linear-to-br from-(--bg-from) via-(--bg-via) to-(--bg-to) px-10 py-20 text-center shadow-2xl mt-20 w-[90%] mx-auto">
      <div className="absolute -right-24 -top-36 h-[500px] w-[500px] rounded-full bg-(--shape-1-bg)"></div>
      <div className="absolute -bottom-24 -left-20 h-[400px] w-[400px] rounded-full bg-(--shape-2-bg)"></div>

      <div className="relative z-10">
        <h1 className="mb-3 text-5xl font-bold text-(--title-color)">
          {title}
        </h1>
        {subTitle && (
          <h2 className="mb-6 text-2xl font-medium text-(--sub-titele-color)">
            {subTitle}
          </h2>
        )}

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-(--description-color)">
          {description}
        </p>

        <div className="flex justify-center gap-4">
          {btnTitle && handleClick && (
            <button
              onClick={handleClick}
              className="inline-flex items-center gap-2 rounded-full border 
            border-(border-2) px-7 py-3 font-semibold 
            text-(--btn-1-title) transition  
            hover:bg-(--btn-2-hover-bg)
            cursor-pointer"
            >
              {btnTitle}
            </button>
          )}

          {href && (
            <Link
              href={href}
              className="rounded-full border border-(--border-1) px-7 py-3 font-semibold 
                text-(--btn-2-title) transition 
                hover:bg-(--btn-2-hover-bg)"
            >
              {btnTitle2}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopPageBanner;
