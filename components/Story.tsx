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
            Chuyện tụi mình
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
            Có những tình yêu đến thật khẽ, không ồn ào, không vội vã, chỉ là hai người gặp nhau giữa cuộc đời rộng dài rồi bỗng thấy lòng mình dịu lại.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
            Từ những điều bình dị, chúng mình đã cùng gom góp yêu thương, chọn tin nhau, thương nhau và bước về phía nhau bằng tất cả sự dịu dàng.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Hôm nay, khi cùng nhau bước sang một chương mới, chúng mình mong được đón nhận những lời chúc phúc yêu thương từ gia đình, bạn bè và những người thân quý.
          </p>
        </FadeIn>
        <FadeIn className="md:col-span-7 order-1 md:order-2 relative h-[600px]">
          <StoryImages />
        </FadeIn>
      </div>
    </section>
  );
}
