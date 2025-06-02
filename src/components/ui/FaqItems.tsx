import { motion } from "motion/react";
import Accordion from "./Accordion";

interface Question {
  question: string;
  answer: string;
}

interface QuestionsProp {
  questions: Question[];
  from: number | string;
  to: number | string;
}

const FaqItems = ({ questions, from, to }: QuestionsProp) => {
  return (
    <div>
      <div
        className="flex my-[50px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
        }}
      >
        <motion.div
          initial={{ x: `${from}` }}
          animate={{ x: `${to}` }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {questions.map(({ question, answer }, index) => {
            return (
              <Accordion
                key={`first-${index}`}
                question={question}
                answer={answer}
              />
            );
          })}
        </motion.div>
        <motion.div
          initial={{ x: `${from}` }}
          animate={{ x: `${to}` }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {questions.map(({ question, answer }, index) => {
            return (
              <Accordion
                key={`second-${index}`}
                question={question}
                answer={answer}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default FaqItems;
