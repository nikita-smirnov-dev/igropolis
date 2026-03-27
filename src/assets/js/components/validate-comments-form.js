import { validateForms } from "@/assets/js/helpers/validate-forms";

const initValidateCommentsForm = () => {
  const form = document.querySelector("[data-comments-form]");
  if (!form) return;

  const rules = [
    {
      ruleSelector: "[data-comments-textarea]",
      rules: [
        {
          rule: "required",
          value: true,
          errorMessage: "Заполните текст комментария!",
        },
      ],
    },
  ];

  const afterForm = () => {
    console.log("Отправлено");
  };

  validateForms("[data-comments-form]", rules, afterForm);
};

initValidateCommentsForm();
