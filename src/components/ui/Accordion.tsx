import { useState } from "react";

interface QuestionProp {
  question: string;
  answer: string;
}

const Accordion = ({ question, answer }: QuestionProp) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="w-[90vh]  rounded-2xl mx-[10px] boxShadow-md "
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <h1 className="text-white text-3xl font-semibold leading-relaxed text-center font-eudoxussans">
        {question}
      </h1>
      <p
        className={`text-white text-2xl mt-4 font-nikea ${
          !isOpen ? "hidden" : ""
        }`}
      >
        {answer}
      </p>
    </div>
  );
};

export default Accordion;
