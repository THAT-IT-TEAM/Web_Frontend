import PricingCard from "./Price";

interface CardProp {
  title: string;
  features: string[];
  bool: boolean[];
  price: number;
  color: string;
}

const PriceComponent = () => {
  const items: CardProp[] = [
    {
      title: "Gold",
      features: [
        "Upto 5 users",
        "50 uploads/month",
        "Basic pinning",
        "On-chain logging",
        "Encryption",
        "Roles/permissions",
        "Basic PDF",
        "Branding",
        "Email support",
      ],
      bool: [true, true, true, false, false, false, true, false, true],
      price: 8.99,
      color: "#D4AF37",
    },
    {
      title: "Platinum",
      features: [
        "Upto 25 users",
        "Unlimited uploads",
        "Persistent Pinning",
        "On-chain logging",
        "Basic",
        "Single-signature",
        "CSV, JSON, PDF",
        "Branding",
        "Priority + Discord",
      ],
      bool: [true, true, true, true, true, true, true, false, true],
      price: 28.99,
      color: "#C0C0C0",
    },
    {
      title: "Diamond",
      features: [
        "Unlimited users",
        "Unlimited uploads",
        "Custom IPFS Gateways",
        "On-chain logging + SC",
        "Full End-to-End",
        " Multi-signature",
        "Auto-generated & Signed",
        "Custom Branding",
        "Dedicated Engineer",
      ],
      bool: [true, true, true, true, true, true, true, true, true],
      price: 98.99,
      color: "#0A74DA",
    },
  ];
  return (
    <div>
      <PricingCard items={items} />
    </div>
  );
};

export default PriceComponent;
