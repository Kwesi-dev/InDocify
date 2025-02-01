"use client";

import { usePathname, useRouter } from "next/navigation";

const useCreateQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();

  const addQueryString = (
    paramsObj: Record<string, string>,
    keysToRemove?: string[],
  ) => {
    const params = new URLSearchParams(window.location.search);

    if (keysToRemove) {
      keysToRemove.forEach((key) => params.delete(key));
    }

    Object.entries(paramsObj).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const removeQueryString = (name: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(name);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllQueryString = () => {
    router.push(pathname);
  };

  const clearSpecificQueryStrings = (names: string[]) => {
    const params = new URLSearchParams(window.location.search);
    names.forEach((name) => params.delete(name));
    router.push(`${pathname}?${params.toString()}`);
  };

  const fetchAllQueryString = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  };

  return {
    addQueryString,
    removeQueryString,
    clearAllQueryString,
    clearSpecificQueryStrings,
    fetchAllQueryString,
  };
};

export default useCreateQueryString;
