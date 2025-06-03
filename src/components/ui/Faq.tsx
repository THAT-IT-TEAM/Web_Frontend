import Accordion from "./Accordion";
import FaqItems from "./FaqItems";

const Faq = () => {
  const upperQuestion = [
    {
      question: "Do I need a crypto wallet to use this platform?",
      answer:
        "No! You can log in using your Google, GitHub, or social accounts via Web3Auth, which automatically creates a secure, non-custodial wallet for you in the background.",
    },
    {
      question: "How is my data stored and protected?",
      answer:
        "Your data is encrypted and stored on IPFS, a decentralized file system. Sensitive metadata and files are secured end-to-end, and we never store your data on centralized servers.",
    },
    {
      question: "What if I don’t want to use blockchain features?",
      answer:
        "No problem. You can use the platform entirely in off-chain mode — just like a regular expense tracker — while still benefiting from encrypted storage and collaboration tools. On-chain logging is optional.",
    },
    {
      question: "How do receipts stay tamper-proof?",
      answer:
        "Receipts are uploaded to IPFS, and optionally, a hash of each expense is stored on-chain. This guarantees immutability and verifiability — no one can alter or fake an expense after it's submitted.",
    },
    {
      question: "Who can view my submitted expenses?",
      answer:
        "Only authorized collaborators in your team or project space can view expenses. You control who can view, add, or approve entries with role-based permissions.",
    },
  ];
  const lowerQuestion = [
    {
      question: "What are the differences between the price plans?",
      answer:
        "Each plan supports different team sizes and features. Gold is for small teams, Platinum unlocks advanced collaboration, and Diamond offers enterprise features like smart contract automation, custom IPFS gateways, and multi-signature approvals.",
    },
    {
      question: "Can I integrate this with my DAO or treasury system?",
      answer:
        "Yes! The Diamond plan supports smart contract integrations and can work with Gnosis Safe, DAO tools, and custom treasury workflows. Contact us to discuss custom setups.",
    },
    {
      question: "Is this platform open-source or audit-ready?",
      answer:
        "While the base product is closed-source during the hackathon phase, we aim to make parts of it open-source or auditable for transparency — especially the smart contract and IPFS handling logic.",
    },
    {
      question: "Can I export my data or receipts?",
      answer:
        "Yes. You can export individual or full-project reports in PDF, CSV, or JSON formats — with verifiable IPFS links and audit logs.",
    },
    {
      question: "How do I get help or support?",
      answer:
        "Gold users get email support. Platinum users have priority access via Discord. Diamond users get a dedicated support engineer and onboarding assistance.",
    },
  ];
  return (
    <div className="container mx-auto mt-[20vh] ">
      <FaqItems questions={upperQuestion} from={0} to={"-100%"} />
      <FaqItems questions={lowerQuestion} from={"-100%"} to={0} />
    </div>
  );
};

export default Faq;
