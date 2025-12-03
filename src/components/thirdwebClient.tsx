import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("No Client ID Provided");
}

export const client = createThirdwebClient({
  clientId,
});
