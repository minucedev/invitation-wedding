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
          &ldquo;Sự hiện diện của bạn là món quà trân quý nhất khi chúng mình mở
          ra chương mới của cuộc đời. Chúng mình mong được sẻ chia niềm vui, nét
          truyền thống và những khoảnh khắc ấm áp, thanh lịch bên những người
          thân thương.&rdquo;
        </p>
      </FadeIn>
    </section>
  );
}
