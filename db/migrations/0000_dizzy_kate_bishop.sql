CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer NOT NULL,
	`amount` real NOT NULL,
	`date` text DEFAULT (CURRENT_TIMESTAMP),
	`description` text,
	`type` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
