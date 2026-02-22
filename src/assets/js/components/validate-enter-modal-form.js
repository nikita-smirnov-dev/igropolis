import { validateForms } from "@/assets/js/helpers/validate-forms";

const initValidateEnterModalForm = () => {
  const form = document.querySelector("[data-enter-modal-form]");

  if (!form) return;

  const rules = [
    {
      ruleSelector: "[data-email-input]",
      rules: [
        {
          rule: "email",
          value: true,
          errorMessage: "Введите корректный E-mail!",
        },
        {
          rule: "required",
          value: true,
          errorMessage: "Заполните E-mail!",
        },
      ],
    },
  ];

  const afterForm = () => {
    console.log("Отправлено");
  };

  validateForms("[data-enter-modal-form]", rules, afterForm);
};

initValidateEnterModalForm();
