import { auth } from "@/auth";
import { createOrRetrieveCustomer } from "@/lib/polar/actions";
import { CustomerPortal } from "@polar-sh/nextjs";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN ?? "",
  server: "sandbox",
  getCustomerId: async (req) => {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      throw new Error("User not found");
    }

    return createOrRetrieveCustomer({
      email: user.email ?? "",
      uuid: user.id ?? "",
    });
  },
});
