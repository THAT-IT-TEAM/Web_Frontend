interface PriceProp {
  title: string;
  features: string[];
  bool: boolean[];
  price: number;
  color: string;
}
interface PriceCardProp {
  items: PriceProp[];
}

const PricingCard = ({ items }: PriceCardProp) => {
  return (
    <div className="flex justify-center items-center gap-32 mt-[20vh] ">
      {items.map((tier, index) => (
        <div key={index} className="flex justify-center items-center">
          <div className="w-[360px] h-[580px] flex flex-col rounded-3xl bg-[#141414] p-6 shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-gray-50">
            <p
              className="text-5xl font-semibold leading-none max-w-max"
              style={{
                color: tier.color,
                textShadow: `1px 1px 20px ${tier.color}`,
              }}
            >
              {tier.title}
            </p>
            <span className="text-gray-500 text-3xl font-semibold leading-none max-w-max mt-2">
              ${tier.price}
            </span>

            <ul className="mt-10 flex flex-col gap-4 text-xl leading-5 text-white">
              {tier.features.map((item, index) => (
                <li className="flex items-center" key={index}>
                  {tier.bool[index] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path
                        fill="#00FF00"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-4 h-4"
                    >
                      <path
                        fill="#FF0000"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.364 5.63604C18.7545 6.02656 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9735 18.7545 17.3403 18.7545 16.9498 18.364L12 13.4142L7.05025 18.364C6.65973 18.7545 6.02656 18.7545 5.63604 18.364C5.24551 17.9734 5.24551 17.3403 5.63604 16.9497L10.5858 12L5.63604 7.05025C5.24551 6.65973 5.24551 6.02656 5.63604 5.63604C6.02656 5.24551 6.65973 5.24551 7.05025 5.63604L12 10.5858L16.9498 5.63604C17.3403 5.24551 17.9735 5.24551 18.364 5.63604Z"
                      />
                    </svg>
                  )}

                  <span className="ml-4">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 w-full rounded-full border-2 border-white bg-white px-6 py-2.5 text-center text-sm font-semibold text-black transition-all duration-200 hover:bg-transparent hover:text-white"
            >
              Get started
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCard;
