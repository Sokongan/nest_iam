import 'dotenv/config';
export const serviceEndpoints = {
    oauth:
    {
        admin: process.env.OAUTH_ADMIN_URL!,
        public: process.env.OAUTH_PUBLIC_URL!,
        private: process.env.OAUTH_PRIVATE_URL!,
    },

    authentication:
    {
        admin: process.env.AUTHENTICATION_ADMIN_URL!,
        public: process.env.AUTHENTICATION_PUBLIC_URL!
    }
    ,
    authorization:
    {
        admin: process.env.AUTHORIZATION_ADMIN_URL!,
        public: process.env.AUTHORIZATION_PUBLIC_URL!
    }
}