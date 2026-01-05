import { Button } from "@/components/ui/button";

export default function PartnerCard({ badge, subtitle, title, image }) {
  return (
    <div className="relative h-[420px] rounded-[32px] font-poppins overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* badge */}
      <div
        className="
      absolute 
      top-0 left-13 
      bg-white px-6 py-3 
      rounded-b-xl 
      font-semibold
      w-[288px]
      h-[63px]
      flex
      justify-center
      items-center
      text-lg"
      >
        {badge}
      </div>

      {/* content */}
      <div className="absolute bottom-10 left-10 text-white">
        <p className="text-orange-400 font-medium mb-2">{subtitle}</p>

        <h2 className="text-4xl font-bold mb-6">{title}</h2>

        <Button className="bg-[#FC8A06] hover:bg-orange-500 w-[205px] h-[52px] px-8 py-3 rounded-full font-semibold">
          Get Started
        </Button>
      </div>
    </div>
  );
}
