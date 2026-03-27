import { validateForms } from "@/assets/js/helpers/validate-forms";

const initValidatePasswordForm = () => {
  const form = document.querySelector("[data-settings-password-form]");
  if (!form) return;

  const rules = [
    {
      ruleSelector: "[data-new-password-input]",
      rules: [
        {
          rule: "password",
          value: true,
          errorMessage: "Заполните Пароль!",
        },
        {
          rule: "required",
          value: true,
          errorMessage: "Заполните Пароль!",
        },
      ],
    },
    {
      ruleSelector: "[data-check-password-input]",
      rules: [
        {
          rule: "password",
          value: true,
          errorMessage: "Заполните Пароль!",
        },
        {
          rule: "required",
          value: true,
          errorMessage: "Заполните Пароль!",
        },
      ],
    },
  ];

  const afterForm = () => {
    console.log("Отправлено");
  };

  validateForms("[data-settings-password-form]", rules, afterForm);
};

initValidatePasswordForm();
