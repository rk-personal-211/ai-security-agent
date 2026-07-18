import { z } from "zod";

import { env } from "../../config/index.js";
import { AppError } from "../../utils/app-error.js";

const accessTokenSchema = z.object({
  access_token: z.string().min(1),
  token_type: z.string(),
});

function getCredentials(): { clientId: string; clientSecret: string } {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    throw new AppError(503, "GITHUB_NOT_CONFIGURED", "GitHub OAuth is not configured.");
  }

  return { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET };
}

export function createAuthorizationUrl(state: string): string {
  const { clientId } = getCredentials();
  const url = new URL("https://github.com/login/oauth/authorize");

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", env.GITHUB_REDIRECT_URI);
  url.searchParams.set("scope", "repo read:user security_events");
  url.searchParams.set("state", state);

  return url.toString();
}

export async function exchangeAuthorizationCode(code: string): Promise<string> {
  const { clientId, clientSecret } = getCredentials();
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: env.GITHUB_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    throw new AppError(502, "GITHUB_OAUTH_EXCHANGE_FAILED", "GitHub OAuth could not be completed.");
  }

  const payload: unknown = await response.json();
  const parsedPayload = accessTokenSchema.safeParse(payload);

  if (!parsedPayload.success) {
    throw new AppError(502, "GITHUB_OAUTH_EXCHANGE_FAILED", "GitHub OAuth returned an invalid response.");
  }

  return parsedPayload.data.access_token;
}
