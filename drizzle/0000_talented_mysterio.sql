CREATE TABLE "audit_logs" (
	"uuid" uuid PRIMARY KEY NOT NULL,
	"action" text NOT NULL,
	"user_id" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"ip_address" text NOT NULL
);
