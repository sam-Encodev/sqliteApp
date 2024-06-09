CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`email` text,
	`password` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
DROP TABLE `user`;