import { create } from "zustand";

interface DocumentationStore {
  documentation: string | null;
  isGenerating: boolean;
  setDocumentation: (documentation: string | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  reset: () => void;
}

export const useDocumentationStore = create<DocumentationStore>((set) => ({
  documentation: null,
  isGenerating: false,
  setDocumentation: (documentation) => set({ documentation }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  reset: () => set({ documentation: null, isGenerating: false }),
}));
