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
            Có những tình yêu đến rất khẽ, như một cơn gió hiền ngang qua hiên nhà, như một giọt nắng nhỏ đậu lên vai áo. Không ồn ào, không vội vã, cũng chẳng cần những lời hứa thật lớn lao, chỉ là hai người gặp nhau giữa cuộc đời rộng dài, rồi bỗng thấy lòng mình dịu lại.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Tình yêu của chúng mình cũng bắt đầu như thế. Nó giống như một ngọn đèn nhỏ được thắp lên trong những ngày bình thường: đủ ấm để xua đi những xa cách, đủ sáng để hai đứa nhìn thấy nhau giữa bộn bề cuộc sống.
          </p>
        </FadeIn>
        <FadeIn className="md:col-span-7 order-1 md:order-2 relative h-[600px]">
          <StoryImages />
        </FadeIn>
      </div>
    </section>
  );
}
