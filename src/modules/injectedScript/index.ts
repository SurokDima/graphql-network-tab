import { AppliedRule, Rule } from "../common/types/rule";
import { safeParseJSON } from "../common/utils/string.utils";

import { logger } from "./logger";
import { sendMessageToContentScript } from "./services";

logger.info("Injected script is running.");

const customFetch = async function (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  logger.info("Intercepted fetch request", input, init);

  const rules =
    // @ts-expect-error - We know that the global variable exists
    (window.GRAPHQL_NETWORK_TAB?.requestRules as Rule[]) ?? [];

  logger.info("Retrieved the following rules", rules);

  const request = input instanceof Request ? input.clone() : new Request(input.toString(), init);

  logger.info("Cloned Request object", request);

  const originalBodyText = await request.text();
  const originalBodyResult = safeParseJSON(originalBodyText);

  if (!originalBodyResult.ok) {
    logger.warn("Failed to parse original body", originalBodyResult.error);
    return originalFetch(input, init);
  }

  if (!originalBodyResult.value) {
    logger.info("Original body is empty", originalBodyResult.value);
    return originalFetch(input, init);
  }

  const operationName = (originalBodyResult.value as { operationName?: string }).operationName;

  if (!operationName) {
    logger.info("Original body does not contain operation name", originalBodyResult.value);
    return originalFetch(input, init);
  }

  logger.info("Operation name", operationName);

  const matchedRequestRule = rules.find(
    (rule) =>
      rule.endpoint === request.url &&
      rule.operationName === operationName &&
      !!rule.activeScenarioId
  );

  if (!matchedRequestRule) {
    logger.info(
      `No matched request rules for endpoint ${request.url} and operation name ${operationName}`
    );

    return originalFetch(input, init);
  }

  logger.info("Matched request rule", matchedRequestRule);

  const matchedScenario = matchedRequestRule.scenarios.find(
    (scenario) => scenario.id === matchedRequestRule.activeScenarioId
  );

  if (!matchedScenario) {
    logger.info("No matched scenario for the request in the matched rule");

    return originalFetch(input, init);
  }

  const startDateTimestamp = Date.now();

  logger.info("Starting original fetch", request, init);
  const originalResponse = await originalFetch(request, init);
  logger.info("Received original response", originalResponse);

  const response = new Response(new Blob([matchedScenario.response.body]), {
    status: Number(matchedScenario.response.statusCode),
    statusText: "OK",
    headers: [
      ...originalResponse.headers,
      ...Object.entries(matchedScenario.response.headers).map(
        ([name, value]) => [name, value] as [string, string]
      ),
    ],
  });

  const appliedRule = {
    rule: matchedRequestRule,
    requestDetails: {
      url: request.url,
      method: request.method,
      startDateTimestamp,
    },
  } satisfies AppliedRule;

  logger.info("Creating an applied rule", appliedRule);

  sendMessageToContentScript({
    action: "ruleApplied",
    appliedRule,
  });

  return response;
};

let originalFetch = window.fetch;

// It must be called `attachFetch` since server worker will be injecting scripts that uses this global function
const attachFetch = () => {
  if (window.fetch === customFetch) {
    logger.warn("Fetch is already attached.");
    return;
  }

  logger.info("Attaching fetch.");
  originalFetch = window.fetch;
  window.fetch = customFetch;
};

// @ts-expect-error - We know that the global variable exists
window.attachFetch = attachFetch;

// it must be called `restoreFetch` since server worker will be injecting scripts that uses this global function
// @ts-expect-error - We know that the global variable exists
window.restoreFetch = () => {
  logger.info("Restoring original fetch.");
  window.fetch = originalFetch;
};
