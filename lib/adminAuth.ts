import { timingSafeEqual } from "crypto";

export function isAdminAuthorized(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const provided = request.headers.get("x-admin-password") || "";

  if (!password) {
    return process.env.NODE_ENV !== "production";
  }

  const expected = Buffer.from(password);
  const actual = Buffer.from(provided);

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}
