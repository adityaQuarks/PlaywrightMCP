import { test, expect } from '@playwright/test';

const API_ENDPOINT = 'https://fakestoreapi.com/products/1';
// Dynamic import for Ajv
let Ajv: any;

test.beforeAll(async () => {
  Ajv = (await import('ajv')).default;
});

// JSON Schema for product validation
const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    description: { type: 'string' },
  },
  required: ['id', 'title', 'price', 'category', 'description'],
  additionalProperties: true,
};

test('API Test: Validate FakeStore API Product Endpoint', async ({ request }) => {
  console.log(`\n--- Starting API Test ---`);
  console.log(`Endpoint: ${API_ENDPOINT}\n`);

  // Step 1: Send GET request
  console.log('Step 1: Sending GET request...');
  const response = await request.get(API_ENDPOINT);
  console.log(`✓ Request sent successfully\n`);

  // Step 2: Verify response status is 200
  console.log('Step 2: Verifying response status...');
  expect(response.status()).toBe(200);
  console.log(`✓ Response status: ${response.status()}\n`);

  // Step 3: Parse response body
  console.log('Step 3: Parsing response body...');
  const responseBody = await response.json();
  console.log(`✓ Response body parsed successfully\n`);

  // Step 4: Validate required keys exist
  console.log('Step 4: Validating required keys...');
  const requiredKeys = ['id', 'title', 'price', 'category', 'description'];
  for (const key of requiredKeys) {
    expect(responseBody).toHaveProperty(key);
    console.log(`  ✓ Key '${key}' is present`);
  }
  console.log();

  // Step 5: Validate data types using JSON Schema with Ajv
  console.log('Step 5: Validating data types using JSON Schema...');
  const AjvClass = (await import('ajv')).default;
  const ajv = new AjvClass();
  const validate = ajv.compile(productSchema);
  const isValid = validate(responseBody);

  if (isValid) {
    console.log(`✓ Response schema is valid\n`);
  } else {
    console.log(`✗ Schema validation errors:`, validate.errors);
    throw new Error('Schema validation failed');
  }

  // Step 6: Log product title and price
  console.log('Step 6: Logging product details...');
  console.log(`📦 Product Title: ${responseBody.title}`);
  console.log(`💰 Product Price: $${responseBody.price}`);
  console.log(`📂 Category: ${responseBody.category}\n`);

  // Additional assertions
  expect(responseBody.id).toBe(1);
  expect(typeof responseBody.title).toBe('string');
  expect(typeof responseBody.price).toBe('number');
  expect(typeof responseBody.category).toBe('string');
  expect(typeof responseBody.description).toBe('string');

  console.log('--- API Test Completed Successfully ---\n');
});
