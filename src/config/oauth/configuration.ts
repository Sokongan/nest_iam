import { registerAs } from "@nestjs/config";

export default registerAs("hydra", () => ({
  adminUrl: process.env.HYDRA_ADMIN_URL,
  publicUrl: process.env.HYDRA_PUBLIC_URL,
}));