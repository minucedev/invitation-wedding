import FadeIn from "./FadeIn";

export default function WelcomeRemarks() {
  return (
    <section
      className="py-section-gap px-margin-edge bg-custom-light text-center"
      id="welcome"
    >
      <FadeIn className="max-w-3xl mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-primary italic mb-8">
          Lời Tri Ân
        </h2>
        <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface-variant leading-relaxed opacity-80">
          &ldquo;Sự hiện diện và tình cảm của mọi người sẽ là niềm vui thật lớn, là điều khiến ngày trọng đại của chúng mình trở nên trọn vẹn, ấm áp và đáng nhớ hơn bao giờ hết.&rdquo;
        </p>
      </FadeIn>
    </section>
  );
}
