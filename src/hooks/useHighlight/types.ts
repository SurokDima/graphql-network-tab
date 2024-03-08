export type MessagePayload = {
  language: HighlightLanguage;
  code: string;
};

export type HighlightLanguage = "json" | "graphql";
