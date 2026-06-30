import FadeIn from "./FadeIn";
import StoryImages from "./StoryImages";

export default function Story() {
  return (
    <section
      className="py-section-gap px-margin-edge max-w-container-max mx-auto overflow-hidden"
      id="story"
    >
      <div className="grid md:grid-cols-12 gap-12 items-center">
        <FadeIn className="md:col-span-5 order-2 md:order-1 relative">
          <div className="absolute -left-12 -top-12 w-32 h-32 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMTAgNTBRMTAgMjAgNTAgMjBUNTAgNTBRNTAgODAgMTAgODBUMTAgNTBaIiBmaWxsPSIjNkExRTI1Ii8+PC9zdmc+')] bg-contain bg-no-repeat pointer-events-none"></div>
          <h2 className="font-headline-lg text-headline-lg text-custom-burgundy italic mb-8">
            Một Niềm Trân Quý
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
            Trong sự tĩnh lặng dịu dàng của thời gian, hai con đường đã gặp nhau.
            Chuyện tình của chúng mình không ồn ào, mà là một niềm trân quý lặng
            thầm — sự thấu hiểu tìm thấy trong từng ánh nhìn và những lời hẹn ước
            bền lâu.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Như đoá sen vươn mình cùng ban mai, tình yêu của chúng mình đã nở hoa
            bằng sự chân thành và dịu dàng. Chúng mình trân trọng mời bạn cùng
            chứng kiến ngày hai đứa nên duyên, gắn kết cội nguồn và tương lai
            trong một lễ cưới ấm áp và đong đầy yêu thương.
          </p>
        </FadeIn>
        <FadeIn className="md:col-span-7 order-1 md:order-2 relative h-[600px]">
          <StoryImages />
        </FadeIn>
      </div>
    </section>
  );
}
