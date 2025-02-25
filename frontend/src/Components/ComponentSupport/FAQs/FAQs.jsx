import React from 'react';

const items = [
  { value: "a", title: "First Item", text: "Some value 1..." },
  { value: "b", title: "Second Item", text: "Some value 2..." },
  { value: "c", title: "Third Item", text: "Some value 3..." },
];

const FAQs = () => {
  return (
    <div className="accordion" id="faqAccordion">
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`heading-${item.value}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${item.value}`}
              aria-expanded="true"
              aria-controls={`collapse-${item.value}`}
            >
              {item.title}
            </button>
          </h2>
          <div
            id={`collapse-${item.value}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading-${item.value}`}
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              {item.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
