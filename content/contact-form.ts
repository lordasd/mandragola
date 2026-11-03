import type { ContactFormCopy } from "./types";

export const contactFormEn: ContactFormCopy = {
  nameLabel: "Full name",
  phoneLabel: "Phone",
  emailLabel: "Email",
  sectorLabel: "Sector",
  companyLabel: "Company",
  requiredLabel: "(required)",
  optionalLabel: "(optional)",
  submitLabel: "Send message",
  demoNotice: "This is a demo — your message was not sent or stored.",
  errors: {
    nameRequired: "Please enter your full name.",
    phoneRequired: "Please enter your phone number.",
    phoneInvalid: "Please enter a valid phone number, for example +972 3 123 4567.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address, for example name@example.com.",
  },
};

export const contactFormHe: ContactFormCopy = {
  nameLabel: "שם מלא",
  phoneLabel: "טלפון",
  emailLabel: "דוא״ל",
  sectorLabel: "תחום",
  companyLabel: "חברה",
  requiredLabel: "(שדה חובה)",
  optionalLabel: "(רשות)",
  submitLabel: "שליחת הודעה",
  demoNotice: "זהו אתר הדגמה — ההודעה שלך לא נשלחה ולא נשמרה.",
  errors: {
    nameRequired: "יש להזין שם מלא.",
    phoneRequired: "יש להזין מספר טלפון.",
    phoneInvalid: "יש להזין מספר טלפון תקין, לדוגמה 03-1234567.",
    emailRequired: "יש להזין כתובת דוא״ל.",
    emailInvalid: "יש להזין כתובת דוא״ל תקינה, לדוגמה name@example.com.",
  },
};
