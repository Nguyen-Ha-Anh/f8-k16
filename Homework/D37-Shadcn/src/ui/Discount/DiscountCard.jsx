export default function DiscountCard({ item }) {
  return (
    <div className="relative h-[260px] rounded-2xl overflow-hidden">
      {/* image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
      />

      {/* overlay */}
      <div
        className="
      absolute 
      bottom-0 left-0 right-0
    h-2/3
    bg-gradient-to-t
    from-black/80
    to-transparent"
      />

      {/* discount badge */}
      <span
        className="
      absolute 
      top-0 right-4 
      flex 
      justify-center 
      items-center 
      bg-black 
      text-white text-sm 
      font-bold
      text-[18px]
      w-[88px] h-[66px] 
      rounded-b-lg"
      >
        -{item.discountPercent}%
      </span>

      {/* text*/}
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-sm text-orange-400">Restaurant</p>
        <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
      </div>
    </div>
  );
}
