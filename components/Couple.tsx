import FadeIn from "./FadeIn";

export default function Couple() {
  return (
    <section
      className="py-section-gap px-margin-edge bg-surface-container-low relative"
      id="profile"
    >
      <FadeIn className="max-w-container-max mx-auto text-center">
        <h2 className="font-headline-lg text-headline-lg text-primary italic mb-16">
          Chú Rể &amp; Cô Dâu
        </h2>
        <div className="grid md:grid-cols-2 gap-16 md:gap-8">
          {/* Groom */}
          <div className="flex flex-col items-center">
            <div className="w-64 h-80 overflow-hidden mb-8 relative group scale-x-[-1]">
              <div className="absolute inset-0 border border-custom-gold m-2 pointer-events-none z-10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Chân dung chú rể trong bộ vest lịch lãm, ánh sáng tương phản nhẹ, phong cách sang trọng tinh tế."
                className="w-full h-full object-cover bg-surface-variant transition-transform duration-700 ease-out group-hover:scale-110"
                src="/images/groom.jpg"
              />
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              Văn Tuấn
            </h3>
            <p className="font-label-caps text-label-caps text-custom-burgundy mb-6 tracking-widest">
              CHÚ RỂ
            </p>
            <div className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-2">
              <span className="uppercase tracking-widest text-[10px] text-custom-gold mb-1">
                Nhà Trai
              </span>
              <p>Ông: Nguyễn Văn A &amp; Bà: Trần Thị B</p>
              <p className="text-xs opacity-70">
                123 Đường Di Sản, Hà Nội, Việt Nam
              </p>
            </div>
          </div>
          {/* Bride */}
          <div className="flex flex-col items-center md:pt-12">
            <div className="w-64 h-80 overflow-hidden mb-8 relative group">
              <div className="absolute inset-0 border border-custom-gold m-2 pointer-events-none z-10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Chân dung cô dâu trong tà áo dài lụa trắng ngà tối giản, ánh sáng tự nhiên dịu dàng, nét đẹp vượt thời gian."
                className="w-full h-full object-cover bg-surface-variant transition-transform duration-700 ease-out group-hover:scale-110"
                src="/images/bride.jpg"
              />
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              Diệu Thanh
            </h3>
            <p className="font-label-caps text-label-caps text-custom-burgundy mb-6 tracking-widest">
              CÔ DÂU
            </p>
            <div className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-2">
              <span className="uppercase tracking-widest text-[10px] text-custom-gold mb-1">
                Nhà Gái
              </span>
              <p>Ông: Lê Văn C &amp; Bà: Phạm Thị D</p>
              <p className="text-xs opacity-70">
                456 Đại Lộ Hoa Nở, TP. Hồ Chí Minh, Việt Nam
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
