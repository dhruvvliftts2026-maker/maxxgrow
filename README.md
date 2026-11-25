# Maxxgrow — Social Media Services

Mobile-first React + Vite storefront with a dark purple/neon theme.

## Deploy directly to Vercel

1. Extract `maxxgrow.zip`.
2. Upload the folder contents to a new GitHub repository named `maxxgrow`.
3. Open https://vercel.com and choose **Add New → Project**.
4. Import your `maxxgrow` GitHub repository.
5. Vercel should detect Vite automatically. Confirm:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**.

The included `vercel.json` stores the Vite build settings. The `api/` folder is placed at the project root so Vercel can detect serverless API functions.

## Run locally

Install Node.js LTS from https://nodejs.org/, then run in the project folder:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, usually http://localhost:5173.

## Payment integration status — important

The storefront currently uses a **demo checkout**. ZapUPI endpoints are safe placeholders and return “not configured”; they do not create live payment orders yet. Before accepting money, implement and test the official current ZapUPI request format, authentication/signature, status checks, webhook verification, and persistent order storage.

Add secrets in **Vercel → Project → Settings → Environment Variables**, not in frontend files or GitHub:

- `ZAPUPI_API_KEY`
- `ZAPUPI_SECRET_KEY`
- `ZAPUPI_WEBHOOK_SECRET`
- `ZAPUPI_CREATE_ORDER_URL`
- `ZAPUPI_STATUS_URL`

After adding or changing environment variables, redeploy the project. Never share or commit real secret keys.

## Current limitations

- Guest order history is stored in the visitor's browser only.
- Payment is not live yet.
- SMM provider fulfillment is disabled.
- Replace the sample review with genuine customer feedback and permission before publishing.
