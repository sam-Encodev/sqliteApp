CREATE TABLE `movies` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`release_year` integer
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`email` text,
	`password` text,
	`created_at` integer,
	`updated_at` integer
);
