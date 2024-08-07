import { GraphQLRequestRule } from "../common/types/graphQL-request-rule";

console.info("[GraphQL Network Tab][Network Mocking Script]: Injected into the page.");

const customFetch = async function (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  console.info(
    "[GraphQL Network Tab][Network Mocking Script]: Intercepted fetch request",
    input,
    init
  );

  const requestRules =
    // @ts-expect-error - We know that the global variable exists
    (window.GRAPHQL_NETWORK_TAB?.requestRules as GraphQLRequestRule[]) ?? [];

  console.info(
    "[GraphQL Network Tab][Network Mocking Script]: Got request rules from the global scope.",
    requestRules
  );

  const request = input instanceof Request ? input.clone() : new Request(input.toString(), init);
  const originalBodyText = await request.text();
  const originalBody = originalBodyText ? JSON.parse(originalBodyText) : null;
  const operationName = originalBody?.operationName;

  const matchedRequestRule = requestRules.find(
    (rule) =>
      rule.endpoint === request.url &&
      rule.operationName === operationName &&
      !!rule.activeScenarioId
  );

  if (!matchedRequestRule) {
    console.info(
      "[GraphQL Network Tab][Network Mocking Script]: No matched request rules for the request. Returning original fetch."
    );

    return originalFetch(input, init);
  }

  console.info("request", request);

  // Request body can be sent only for request methods other than GET and HEAD.
  const canRequestBodyBeSent = !["GET", "HEAD"].includes(request.method);

  const matchedScenario = matchedRequestRule.scenarios.find(
    (scenario) => scenario.id === matchedRequestRule.activeScenarioId
  );

  if (!matchedScenario) {
    console.info(
      "[GraphQL Network Tab][Network Mocking Script]: No matched request rule for the operation name. Returning original fetch."
    );

    return originalFetch(input, init);
  }

  console.info(
    "[GraphQL Network Tab][Network Mocking Script]: Original request body",
    originalBody,
    canRequestBodyBeSent,
    matchedScenario
  );

  const originalResponse = await originalFetch(request, init);

  return new Response(new Blob([matchedScenario.response.body]), {
    status: Number(matchedScenario.response.statusCode),
    statusText: "OK",
    headers: [
      ...originalResponse.headers,
      ...Object.entries(matchedScenario.response.headers).map(
        ([name, value]) => [name, value] as [string, string]
      ),
    ],
  });
};

let originalFetch = window.fetch;

const attachFetch = () => {
  if (window.fetch === customFetch) {
    console.info("[GraphQL Network Tab][Network Mocking Script]: Fetch is already attached.");
    return;
  }

  console.info("[GraphQL Network Tab][Network Mocking Script]: Attaching fetch.");
  originalFetch = window.fetch;
  window.fetch = customFetch;
};

// @ts-expect-error - We know that the global variable exists
window.attachFetch = attachFetch;

// @ts-expect-error - We know that the global variable exists
window.restoreFetch = () => {
  console.info("[GraphQL Network Tab][Network Mocking Script]: Restoring original fetch.");
  window.fetch = originalFetch;
};

attachFetch();
