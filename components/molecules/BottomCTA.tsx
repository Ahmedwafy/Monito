import Link from "next/link";
import Button from "../atoms/Button";

type BottomCtaType = {
  title: string;
  description: string;
  btnName: string;
  btnName2?: string;
  href1: string;
  href2?: string;
  handleClick?: () => void;
};

const BottomCTA = ({
  title,
  description,
  btnName,
  btnName2,
  href1,
  href2,
  handleClick,
}: BottomCtaType) => {
  return (
    <section className="px-4 py-16 text-center">
      <div className="container mx-auto max-w-4xl rounded-3xl bg-(--cta-bg) border border-(--cta-border) py-12 px-8 transition-colors duration-300 shadow-lg">
        <h3 className="text-2xl md:text-3xl font-bold text-(--cta-title)!">
          {title}
        </h3>
        <p className="mt-4 text-lg text-(--cta-description)">{description}</p>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <Link href={href1}>
            <Button variant="outline">{btnName}</Button>
          </Link>

          {btnName2 && href2 && (
            <Link href={href2}>
              <Button variant="outline">{btnName2}</Button>
            </Link>
          )}

          {btnName2 && (
            <Button variant="outline" onClick={handleClick}>
              {btnName2}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;
