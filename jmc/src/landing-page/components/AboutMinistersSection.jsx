import MinistersCarousel from './MinistersCarousel'

export default function AboutMinistersSection() {
  return (
    <section className="py-8 md:py-6 bg-[#f5f7fa] border-t border-gray-200">
      <div className="max-w-[1800px] mx-auto px-1">
        {/* Full-width Ministers Section */}
        <MinistersCarousel />
      </div>
    </section>
  )
}
