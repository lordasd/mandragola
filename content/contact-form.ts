import type { ContactFormCopy } from "./types";

export const contactFormEn: ContactFormCopy = {
  nameLabel: "Full name",
  emailLabel: "Email",
  messageLabel: "Message",
  submitLabel: "Send message",
  requiredNote: "All fields are required.",
  demoNotice: "This is a demo — your message was not sent or stored.",
  errors: {
    nameRequired: "Please enter your full name.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address, for example name@example.com.",
    messageRequired: "Please enter a message.",
  },
};

export const contactFormHe: ContactFormCopy = {
  nameLabel: "שם מלא",
  emailLabel: "דוא״ל",
  messageLabel: "הודעה",
  submitLabel: "שליחת הודעה",
  requiredNote: "יש למלא את כל השדות.",
  demoNotice: "זהו אתר הדגמה — ההודעה שלך לא נשלחה ולא נשמרה.",
  errors: {
    nameRequired: "יש להזין שם מלא.",
    emailRequired: "יש להזין כתובת דוא״ל.",
    emailInvalid: "יש להזין כתובת דוא״ל תקינה, לדוגמה name@example.com.",
    messageRequired: "יש להזין הודעה.",
  },
};
