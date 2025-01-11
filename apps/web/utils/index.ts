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
