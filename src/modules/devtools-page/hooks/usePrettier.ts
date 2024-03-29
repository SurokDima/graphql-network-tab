import { useEffect, useState } from "react";

import jsonParser from "prettier/plugins/babel";
import estreeParser from "prettier/plugins/estree";
import graphQLParser from "prettier/plugins/graphql";
import { format } from "prettier/standalone";

export const usePrettier = (code: string, language: "graphql" | "json") => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [formattedCode, setFormattedCode] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    format(code, {
      parser: language,
      useTabs: false,
      tabWidth: 2,
      plugins: [graphQLParser, jsonParser, estreeParser],
    })
      .then((formattedCode) => {
        setFormattedCode(formattedCode);
      })
      .catch((error) => {
        console.error("error", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [code, language]);

  return { formattedCode, isLoading, error };
};
