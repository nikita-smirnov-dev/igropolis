import { validateForms } from "@/assets/js/helpers/validate-forms";

const initValidateSettingsForm = () => {
  const form = document.querySelector("[data-settings-form]");
  if (!form) return;

  const rules = [
    {
      ruleSelector: "[data-user-login-input]",
      rules: [
        {
          rule: "required",
          value: true,
          errorMessage: "Заполните Логин!",
        },
      ],
    },
    {
      ruleSelector: "[data-user-email-input]",
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

  validateForms("[data-settings-form]", rules, afterForm);
};

initValidateSettingsForm();
