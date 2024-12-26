declare namespace NodeJS {
	interface ProcessEnv {
		readonly PORT: any;
		readonly DB: string;
		readonly NODE_ENV: string;
		readonly SECRET: CipherKey;
		readonly GOOGLE_CLIENT_ID: string;
		readonly GOOGLE_CLIENT_SECRET: string;
		readonly LINKEDIN_CLIENT_ID: string;
		readonly LINKEDIN_CLIENT_SECRET: string;
	}
}
