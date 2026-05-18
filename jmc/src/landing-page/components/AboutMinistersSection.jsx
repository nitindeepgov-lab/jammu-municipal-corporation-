import MinistersCarousel from './MinistersCarousel'

export default function AboutMinistersSection() {
  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-[#f5f7fa] to-white border-t border-gray-200">
      <div className="max-w-[1800px] mx-auto px-2 sm:px-4">
        <MinistersCarousel />
      </div>
    </section>
  )
}
