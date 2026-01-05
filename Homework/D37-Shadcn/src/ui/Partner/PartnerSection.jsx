import PartnerCard from "./PartnerCard";

export default function PartnerSection() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PartnerCard
          badge="Earn more with lower fees"
          subtitle="Signup as a business"
          title="Partner with us"
          image="/images/chef.jpg"
        />
        <PartnerCard
          badge="Avail exclusive perks"
          subtitle="Signup as a rider"
          title="Ride with us"
          image="/images/rider.jpg"
        />
      </div>
    </div>
  );
}
