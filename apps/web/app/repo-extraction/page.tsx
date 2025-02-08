import { Suspense } from "react";
import PageContent from "./page-content";

const page = () => {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
};

export default page;
