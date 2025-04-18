import { sql } from "./client.ts";
import { fakerPT_BR } from "@faker-js/faker";

await sql`
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_in_cents INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

await sql`TRUNCATE TABLE products`;

for(let i = 0; i < 200; i++) {
  const productsToInsert = Array.from({ length: 10_000 }).map(() => ({
    name: fakerPT_BR.commerce.productName(),
    description: fakerPT_BR.commerce.productDescription(),
    price_in_cents: fakerPT_BR.number.int({min: 100, max: 10_000}),
  }));
  
  await sql`INSERT INTO products ${sql(productsToInsert)}`;

  console.log('Inserted 10k products. Total inserted:', (i + 1) * 10_000);
}

await sql.end();