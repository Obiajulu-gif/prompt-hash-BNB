import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
	// During build time, use a placeholder to avoid build errors
	// In production, this should be properly configured
	console.warn(
		"NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set. Using placeholder for build."
	);
}

export const client = createThirdwebClient({
	clientId: clientId || "placeholder_client_id",
});
