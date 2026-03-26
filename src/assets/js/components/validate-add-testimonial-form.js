import { validateForms } from "@/assets/js/helpers/validate-forms";

const initValidateTestimonialForm = () => {
  const form = document.querySelector("[data-add-testimonial-form]");
  if (!form) return;

  const rules = [
    {
      ruleSelector: "[data-testimonial-title-input]",
      rules: [
        {
          rule: "required",
          value: true,
          errorMessage: "Заполните Заголовок!",
        },
      ],
    },
    {
      ruleSelector: "[data-testimonial-descr-textarea]",
      rules: [
        {
          rule: "required",
          value: true,
          errorMessage: "Заполните Описание!",
        },
      ],
    },
  ];

  const afterForm = () => {
    console.log("Отправлено");
  };

  validateForms("[data-add-testimonial-form]", rules, afterForm);
};

initValidateTestimonialForm();
