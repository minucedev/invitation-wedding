export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-section-gap border-t border-outline-variant/30 flex flex-col items-center gap-unit px-margin-edge text-center">
      <h2 className="font-headline-md text-headline-md text-primary italic mb-4">
        Thanh &amp; Tuấn
      </h2>
      <div className="flex gap-6 mb-8">
        <a
          className="font-body-md text-body-md text-on-surface-variant opacity-60 hover:text-secondary transition-colors duration-300"
          href="#"
        >
          Quà Cưới
        </a>
        <a
          className="font-body-md text-body-md text-on-surface-variant opacity-60 hover:text-secondary transition-colors duration-300"
          href="#"
        >
          Liên Hệ
        </a>
        <a
          className="font-body-md text-body-md text-on-surface-variant opacity-60 hover:text-secondary transition-colors duration-300"
          href="#"
        >
          Bản Đồ
        </a>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant opacity-60">
        © 2026 · Thực hiện với yêu thương
      </p>
    </footer>
  );
}
