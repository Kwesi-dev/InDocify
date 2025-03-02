import { customAlphabet } from "nanoid";
import crypto from "crypto";
/**
 * Scrolls to a section of the page
 * @param sectionId The id of the section to scroll to
 */

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Decodes a base64 string
 * @param encoded The base64 string to decode
 * @returns The decoded string
 */
export const atob = (encoded: string) =>
  Buffer.from(encoded, "base64").toString("utf-8");

/**
 * Extracts the owner and repo from a GitHub repository URL
 * @param repoUrl The URL of the repository
 * @returns An object with the owner and repo
 */

export function extractOwnerAndRepo(repoUrl: string): {
  owner: string;
  repo: string;
} {
  const match = repoUrl?.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    return { owner: "", repo: "" };
  }
  return { owner: match[1] as string, repo: match[2] as string };
}

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const nanoid = customAlphabet(alphabet, 10);

export const getDocsColumnName = (title: string) => {
  switch (title) {
    case "Getting Started":
      return "get_started";
    case "Development Guidelines":
      return "development_guidelines";
    default:
      return "get_started";
  }
};

export const encryptToken = (token: string) => {
  const algorithm = "aes-256-cbc";
  // Create a 32-byte key using SHA-256
  const hash = crypto.createHash("sha256");
  hash.update(process.env.GITHUB_API_SIGNING_SECRET as string);
  const key = hash.digest();

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Prepend IV to encrypted data
  return iv.toString("hex") + encrypted;
};

export const decryptToken = (encryptedToken: string) => {
  const algorithm = "aes-256-cbc";
  // Create a 32-byte key using SHA-256
  const hash = crypto.createHash("sha256");
  hash.update(process.env.GITHUB_API_SIGNING_SECRET as string);
  const key = hash.digest();

  const iv = Buffer.from(encryptedToken.slice(0, 32), "hex");
  const encryptedText = encryptedToken.slice(32);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
