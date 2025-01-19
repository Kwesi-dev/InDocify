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
