"use client";

import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-list fade-up">
      {items.map((item, i) => {
        const isActive = openIndex === i;
        return (
          <div className={`faq-item${isActive ? " active" : ""}`} key={item.question}>
            <button
              className="faq-question"
              onClick={() => setOpenIndex(isActive ? null : i)}
            >
              {item.question}
              <span className="faq-icon">+</span>
            </button>
            <div
              className="faq-answer"
              style={{ maxHeight: isActive ? "400px" : "0" }}
            >
              <div className="faq-answer-inner">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
