"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

const HERO_IMAGE =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85";

const SECTION2_IMAGE =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85";

const SECTION3_IMG1 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85";

const SECTION3_IMG2 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85";

const SECTION3_BG =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85";

const featureBars = ["Advanced Dentistry", "High Quality Equipment", "Friendly Staff"];

const serviceCards: { name: string; num: string | null; active: boolean; slug: string }[] = [
  { name: "Dental\nVeneers", num: "01", active: true, slug: "dental-veneers" },
  { name: "Dental\nCrowns", num: "02", active: false, slug: "dental-crowns" },
  { name: "Teeth\nWhitening", num: "03", active: false, slug: "teeth-whitening" },
  { name: "Dental\nImplants", num: null, active: false, slug: "dental-implants" },
];

const arrowIconPath = "M1 7h12m0 0L8 2m5 5L8 12";

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

type MaskPosition = { x: number; y: number; sw: number; sh: number };

function useMaskPositions(
  sectionRef: React.RefObject<HTMLElement | null>,
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>,
  count: number,
) {
  const [positions, setPositions] = useState<MaskPosition[]>(() =>
    Array.from({ length: count }, () => ({ x: 0, y: 0, sw: 0, sh: 0 })),
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const compute = () => {
      const sectionRect = section.getBoundingClientRect();
      const sw = sectionRect.width;
      const sh = sectionRect.height;
      const next: MaskPosition[] = [];
      for (let i = 0; i < count; i++) {
        const card = cardRefs.current[i];
        if (!card) {
          next.push({ x: 0, y: 0, sw, sh });
          continue;
        }
        const cardRect = card.getBoundingClientRect();
        next.push({
          x: cardRect.left - sectionRect.left,
          y: cardRect.top - sectionRect.top,
          sw,
          sh,
        });
      }
      setPositions(next);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(section);
    return () => ro.disconnect();
  }, [sectionRef, cardRefs, count]);

  return positions;
}

function useImageWidth(src: string, sectionHeight: number) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!src || !sectionHeight) return;
    const img = new Image();
    img.onload = () => {
      setWidth(img.naturalWidth * (sectionHeight / img.naturalHeight));
    };
    img.src = src;
  }, [src, sectionHeight]);

  return width;
}

function useStaggeredReveal(_count: number, threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getAnimStyle = useCallback(
    (index: number): CSSProperties => ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
    }),
    [visible],
  );

  return { containerRef, getAnimStyle };
}

function setCardRef(refsArray: React.RefObject<(HTMLDivElement | null)[]>, index: number) {
  return (el: HTMLDivElement | null) => {
    refsArray.current[index] = el;
  };
}

// ---------------------------------------------------------------------------
// MaskedCard
// ---------------------------------------------------------------------------

interface MaskedCardProps {
  bgImage: string;
  position: MaskPosition;
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: ReactNode;
  cardRef?: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
}

function MaskedCard({ bgImage, position, imageWidth, focalX, className, children, cardRef, style }: MaskedCardProps) {
  const overflow = imageWidth > position.sw ? imageWidth - position.sw : 0;
  const focalOffset = overflow * focalX;

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: `auto ${position.sh}px`,
        backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

export default function Home() {
  const isMobile = useIsMobile();

  const section1Ref = useRef<HTMLElement | null>(null);
  const section1CardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const s1Reveal = useStaggeredReveal(4);
  const s1Positions = useMaskPositions(section1Ref, section1CardRefs, 4);
  const s1ImageWidth = useImageWidth(HERO_IMAGE, s1Positions[0]?.sh ?? 0);
  const s1FocalX = isMobile ? 0.7 : 0.8;

  const section2Ref = useRef<HTMLElement | null>(null);
  const section2CardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const s2Reveal = useStaggeredReveal(4);
  const s2Positions = useMaskPositions(section2Ref, section2CardRefs, 4);
  const s2ImageWidth = useImageWidth(SECTION2_IMAGE, s2Positions[0]?.sh ?? 0);
  const s2FocalX = isMobile ? 0.65 : 0.8;

  const s3Reveal = useStaggeredReveal(4);

  return (
    <>
      {/* Section 1 - Hero */}
      <section
        ref={(el) => {
          section1Ref.current = el;
          s1Reveal.containerRef.current = el;
        }}
        className="h-screen w-full overflow-hidden flex flex-col pt-24 md:pt-24 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        {featureBars.map((label, i) => (
          <MaskedCard
            key={label}
            bgImage={HERO_IMAGE}
            position={s1Positions[i]}
            imageWidth={s1ImageWidth}
            focalX={s1FocalX}
            cardRef={setCardRef(section1CardRefs, i)}
            className="w-full h-14 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative"
            style={s1Reveal.getAnimStyle(i)}
          >
            <span className="flex items-center justify-center h-full text-black text-lg md:text-3xl font-bold text-center relative z-10">
              {label}
            </span>
          </MaskedCard>
        ))}

        <MaskedCard
          bgImage={HERO_IMAGE}
          position={s1Positions[3]}
          imageWidth={s1ImageWidth}
          focalX={s1FocalX}
          cardRef={setCardRef(section1CardRefs, 3)}
          className="w-full flex-1 min-h-0 rounded-xl md:rounded-2xl overflow-hidden relative"
          style={s1Reveal.getAnimStyle(3)}
        >
          <p className="absolute top-4 left-4 md:top-7 md:left-7 text-black text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[200px] md:max-w-[300px] z-10">
            We wish to provide professional dental services
            <br />
            that match the current technologies
          </p>
          <div className="absolute bottom-5 left-3 md:bottom-8 md:left-4 z-10">
            <span className="block text-black text-xs md:text-sm font-semibold mb-1 md:mb-2">
              Trusted Dentist in West New York
            </span>
            <h1 className="text-black text-[clamp(3rem,11vw,11rem)] font-bold leading-[0.79] tracking-tight">
              Dental
              <br />
              Care
            </h1>
          </div>
          <span className="absolute bottom-6 right-4 md:bottom-10 md:right-8 text-white text-xs md:text-sm font-semibold z-10">
            Free Consultation
          </span>
        </MaskedCard>
      </section>

      {/* Section 2 - Smile Gallery */}
      <section
        ref={(el) => {
          section2Ref.current = el;
          s2Reveal.containerRef.current = el;
        }}
        className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto_auto] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Positions[0]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={setCardRef(section2CardRefs, 0)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
            style={s2Reveal.getAnimStyle(0)}
          >
            <h3 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-2xl md:text-3xl font-bold z-10">
              Smile Gallery
            </h3>
            <p className="absolute bottom-4 left-5 md:bottom-6 md:left-7 text-white md:text-black text-xs md:text-sm font-semibold z-10">
              Our cosmetic dental work
            </p>
          </MaskedCard>

          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Positions[1]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={setCardRef(section2CardRefs, 1)}
            className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
            style={s2Reveal.getAnimStyle(1)}
          >
            <p className="absolute bottom-16 left-5 md:bottom-20 md:left-7 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 z-10">
              If you want a gorgeous smile,
              <br />
              call us to ask about a smile makeover.
            </p>
            <button className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold z-10 hover:scale-105 transition-transform">
              Call Us
            </button>
          </MaskedCard>

          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Positions[2]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={setCardRef(section2CardRefs, 2)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
            style={s2Reveal.getAnimStyle(2)}
          >
            <h2 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] z-10">
              Smile
              <br />
              makeover
            </h2>
          </MaskedCard>

          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Positions[3]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={setCardRef(section2CardRefs, 3)}
            className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
            style={s2Reveal.getAnimStyle(3)}
          >
            <div className="absolute inset-0 z-10 flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2 p-2 md:p-3">
              {serviceCards.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className={`flex-1 min-w-[calc(50%-4px)] md:min-w-0 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between ${
                    svc.active ? "bg-white/90 backdrop-blur-md" : "bg-white/20 backdrop-blur-xl"
                  }`}
                >
                  <h3
                    className={`text-xl md:text-4xl font-bold leading-[1.05] whitespace-pre-line ${
                      svc.active ? "text-black" : "text-white"
                    }`}
                  >
                    {svc.name}
                  </h3>
                  {svc.num ? (
                    <span
                      className={`self-end w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-xs md:text-sm font-semibold ${
                        svc.active ? "border-black text-black" : "border-white text-white"
                      }`}
                    >
                      {svc.num}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </MaskedCard>
        </div>
      </section>

      {/* Section 3 - Implant Dentistry */}
      <section
        ref={(el) => {
          s3Reveal.containerRef.current = el;
        }}
        className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <div
              className="rounded-xl md:rounded-2xl bg-stone-50 p-5 md:p-7 flex flex-col justify-between flex-[1.2] min-h-[180px] md:min-h-0"
              style={s3Reveal.getAnimStyle(0)}
            >
              <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.95] text-black">
                Implant
                <br />
                Dentistry
              </h2>
              <p className="text-xs md:text-sm font-semibold text-black">Restore Missing Teeth</p>
            </div>

            <div className="flex gap-1.5 md:gap-2 flex-1 min-h-[140px] md:min-h-0" style={s3Reveal.getAnimStyle(1)}>
              <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={SECTION3_IMG1} alt="Dental implant procedure" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={SECTION3_IMG2} alt="Dental restoration" className="w-full h-full object-cover" />
              </div>
            </div>

            <div
              className="rounded-xl md:rounded-2xl bg-zinc-200 p-5 md:p-7 flex items-end justify-between flex-[0.8] min-h-[160px] md:min-h-0"
              style={s3Reveal.getAnimStyle(2)}
            >
              <div>
                <p className="text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">Consultation</p>
                <h3 className="text-xl md:text-3xl font-bold text-black leading-6 md:leading-8">
                  Dental
                  <br />
                  Restoration
                  <br />
                  Services
                </h3>
              </div>
              <Link
                href="/book"
                className="px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform"
              >
                Book Online
              </Link>
            </div>
          </div>

          <div
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[350px] md:min-h-0"
            style={s3Reveal.getAnimStyle(3)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SECTION3_BG} alt="Smiling patient" className="w-full h-full object-cover" />
            <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 flex gap-1.5 md:gap-2">
              <div className="flex-1 bg-white rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52">
                <h4 className="text-lg md:text-2xl font-bold text-black leading-5 md:leading-7">
                  The Process
                  <br />
                  of Installing
                  <br />
                  Implants
                </h4>
                <span className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg]">
                    <path
                      d={arrowIconPath}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52">
                <h4 className="text-lg md:text-2xl font-bold text-white leading-5 md:leading-7">
                  Caring
                  <br />
                  for Dental
                  <br />
                  Implants
                </h4>
                <span className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-white flex items-center justify-center text-white">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg]">
                    <path
                      d={arrowIconPath}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
