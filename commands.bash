# generate migrations
bunx drizzle-kit generate 
[https://orm.drizzle.team/kit-docs/commands#generate-migrations]

# pull DDL from existing database and generate schema.ts file 
bunx drizzle-kit introspect
[https://orm.drizzle.team/kit-docs/commands#introspect--pull]

# delete previously generated migration
bunx drizzle-kit drop
[https://orm.drizzle.team/kit-docs/commands#drop-migration]

# check consistency of your migrations
bunx drizzle-kit check
[https://orm.drizzle.team/kit-docs/commands#check]

# browse database locally
bunx drizzle-kit studio
[https://orm.drizzle.team/kit-docs/commands#drizzle-studio]