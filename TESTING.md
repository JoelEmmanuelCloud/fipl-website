# FIPL Website — Testing Guide

Work through each section in order. Tick each checkbox as you confirm it works.

---

## Pre-flight

Before testing anything, confirm the dev server is running:

```bash
npm run dev
```

Site opens at `http://localhost:3000` (or `3001` if port is taken).

Confirm all environment variables are loaded:

```bash
node scripts/verify.mjs
```

Expected output: **8 checks — 8 passed, 0 failed**

---

## 1. Supabase — Database & Storage

- [ ] Run `node scripts/verify.mjs` — all 8 checks pass
- [ ] Open Supabase dashboard → Table Editor → confirm these tables exist:
  - `news_articles` (6 rows from seed)
  - `media_kits` (empty)
  - `jobs` (empty)
  - `contact_submissions` (empty)
  - `newsletter_subscribers` (empty)
  - `alerts` (empty — if you ran the SQL)
  - `push_subscriptions` (empty — if you ran the SQL)
- [ ] Storage → confirm two public buckets exist:
  - `news-images`
  - `media-kit-assets`

---

## 2. Public — News & Media Page

URL: `http://localhost:3000/news`

- [ ] Page loads without errors
- [ ] 6 articles appear in the Press Releases tab (loaded from Supabase, not static)
- [ ] Filter dropdown — select **Operations** → only Operations articles show
- [ ] Search box — type "vendor" → only the vendor article shows → clear it
- [ ] Pagination — if more than 3 articles in filter, page buttons appear
- [ ] Recent Posts sidebar (desktop) shows the 7 most recent articles
- [ ] Click **Reading More** on any article → article detail page opens
- [ ] Article detail page shows: cover image, date, category, full content, sidebar with recent posts
- [ ] Click **← Back to News** → returns to /news
- [ ] Click **Media Kits** tab → shows "No media available" (empty, expected)

---

## 3. Public — Careers Page

URL: `http://localhost:3000/careers`

- [ ] Page loads without errors
- [ ] Open roles section shows **"No open roles at this time. Check back soon."** (empty DB, expected)
- [ ] "Don't See Your Role?" banner shows with **Join Our Talent Pool** button
- [ ] Clicking Join Our Talent Pool opens a `mailto:careers@fipl-ng.com` draft

---

## 4. Public — Contact Form

URL: `http://localhost:3000/contact`

- [ ] Fill in all fields (First Name, Last Name, Email, Subject, Message)
- [ ] Click **Submit Enquiry** → button changes to "Sending…" then "✓ Message Sent!"
- [ ] Open Supabase → `contact_submissions` table → new row appears with your data
- [ ] Check `info@fipl-ng.com` inbox → email arrives with full message and **Reply** button

> If email doesn't arrive: Resend domain verification for `fipl-ng.com` may be pending — check the Resend dashboard.

---

## 5. Public — Newsletter Subscribe

URL: `http://localhost:3000/contact` (bottom of page)

- [ ] Enter an email address → click **Subscribe** → button shows "✓ Subscribed!"
- [ ] Open Supabase → `newsletter_subscribers` table → new row appears
- [ ] Check `info@fipl-ng.com` inbox → admin notification email arrives ("New newsletter subscriber")
- [ ] Check the subscriber's inbox → welcome email arrives from FIPL
- [ ] Submit the same email again → no error, no duplicate row in DB, no second email sent

---

## 6. Admin — Login & Layout

URL: `http://localhost:3000/admin`

- [ ] Visiting `/admin` without logging in → **redirects to /admin/login**
- [ ] Visiting `/admin/news` without logging in → **redirects to /admin/login**
- [ ] On the login page, enter a wrong password → **"Invalid password"** error appears
- [ ] Enter the correct password (`j1aE5yCAiolnqF9V`) → redirects to `/admin` dashboard
- [ ] Dashboard shows 4 stat cards: News Articles (6), Media Kits (0), Open Jobs (0), Contact Submissions (count)
- [ ] Sidebar navigation links: Dashboard, News Articles, Media Kits, Jobs, Site Alerts, Contact Submissions
- [ ] Bell icon visible in the sidebar header
- [ ] Click **Sign Out** → redirects to `/admin/login`, can no longer access `/admin`
- [ ] Log back in to continue testing

---

## 7. Admin — News Articles

URL: `http://localhost:3000/admin/news`

- [ ] All 6 seeded articles appear in the table with title, category, date
- [ ] Click **+ New Article**
- [ ] Fill in all fields:
  - Title: `Test Article`
  - Slug: auto-fills from title
  - Category: `Operations`
  - Read Time: `2 min read`
  - Display Date: `May 29, 2025`
  - Date (ISO): pick today's date
  - Excerpt: any short text
  - Content (HTML): `<p>Test paragraph.</p>`
- [ ] Upload an image using the file picker (any image)
- [ ] Click **Publish Article** → redirects back to the article list, new article appears
- [ ] Visit `http://localhost:3000/news` → new article appears at the top
- [ ] Visit `http://localhost:3000/news/test-article` → article detail page loads with your content and image
- [ ] Back in admin, click **Edit** on the test article → form pre-fills with existing data
- [ ] Change the title → click **Save Changes** → title updates in list
- [ ] Click **Delete** → confirmation prompt → confirm → article removed from list and from `/news`

---

## 8. Admin — Media Kits

URL: `http://localhost:3000/admin/media`

- [ ] Upload form is visible with Title, Category, File, and Thumbnail fields
- [ ] Enter a title, pick category **Our Plants**, select any image file
- [ ] Click **Upload** → item appears in the grid below
- [ ] Visit `http://localhost:3000/news` → click **Media Kits** tab → click **Our Plants** → your upload appears as a clickable image
- [ ] Click the image → file opens in new tab (served from Supabase Storage public URL)
- [ ] Back in admin, click **Delete** on the item → it disappears

---

## 9. Admin — Jobs

URL: `http://localhost:3000/admin/jobs`

- [ ] Click **+ Post Job**
- [ ] Fill in:
  - Job Title: `Electrical Engineer`
  - Department: `Engineering`
  - Location: `Port Harcourt, Rivers State`
  - Type: `Full Time`
  - Description: any text
  - Requirements: any text
- [ ] Click **Post Job** → redirects to jobs list, job appears with **Active** badge
- [ ] Visit `http://localhost:3000/careers` → job card appears in the Open Roles section
- [ ] Back in admin, click **Close** → badge changes to **Closed**
- [ ] Visit `/careers` again → job disappears (only active jobs are shown publicly)
- [ ] Click **Reopen** → job is active again
- [ ] Click **Edit** → form pre-fills → make a change → **Save Changes**
- [ ] Click **Delete** → job removed

---

## 10. Admin — Site Alerts

URL: `http://localhost:3000/admin/alerts`

**Info alert:**
- [ ] Title: `Notice`, Message: `Afam plant maintenance on 15 June.`, Type: **Info**
- [ ] Click **Publish Alert** → toast appears: "Alert published"
- [ ] Visit `http://localhost:3000` → blue banner appears at the top of the page
- [ ] Click the **X** on the banner → it dismisses
- [ ] Reload the page → banner is gone for this browser session (sessionStorage)
- [ ] Open a private/incognito window → banner reappears

**Warning alert:**
- [ ] Publish a **Warning** type alert → orange banner on the public site

**Critical alert:**
- [ ] Publish a **Critical** type alert → red banner on the public site

**Deactivate:**
- [ ] In admin, click **Deactivate** on any alert → banner disappears from public site within ~60 seconds
- [ ] Click **Delete** → alert removed permanently

---

## 11. Admin — Notification Bell

- [ ] Open a second browser tab, go to `http://localhost:3000/contact`
- [ ] Submit the contact form
- [ ] Switch back to the admin tab (`/admin`)
- [ ] Within 60 seconds the bell badge shows a red dot with a count
- [ ] Click the bell → dropdown shows the submission with name, subject, and timestamp
- [ ] Subscribe to the newsletter in the public site → within 60 seconds the bell updates
- [ ] Click **View all submissions →** in the dropdown → navigates to `/admin/submissions`
- [ ] Submissions page shows all contact messages with full details

---

## 12. Admin — Toast Notifications

- [ ] In admin, publish an alert → green toast appears bottom-right: "Alert published"
- [ ] Deactivate an alert → toast: "Alert deactivated"
- [ ] Delete an alert → toast: "Alert deleted"
- [ ] Toast disappears automatically after 4 seconds
- [ ] Clicking the X on the toast dismisses it immediately

---

## 13. Browser Push Notifications

> Requires HTTPS in production. On localhost, Chrome and Edge support it. Safari requires macOS 13+.

- [ ] Visit `http://localhost:3000`
- [ ] Scroll to footer → **"Get notified of new articles"** link appears below social icons
- [ ] Click it → browser permission prompt appears
- [ ] Click **Allow** → text changes to "Notifications on — turn off"
- [ ] Open Supabase → `push_subscriptions` table → one row appears with your browser's endpoint
- [ ] In admin, publish a new article (`/admin/news` → **+ New Article**)
- [ ] Within seconds, a push notification appears on your device/desktop with the article title
- [ ] Click the notification → browser opens `http://localhost:3000/news/[article-slug]`
- [ ] Click **"Notifications on — turn off"** in footer → subscription removed, Supabase row deleted

---

## 14. Email Delivery (Resend)

> Requires `fipl-ng.com` to be verified in the Resend dashboard for emails to deliver. Until then, sends to external addresses are silently dropped.

**To verify the domain:**
1. Go to [resend.com/domains](https://resend.com/domains)
2. Add `fipl-ng.com`
3. Add the 3 DNS records Resend provides (TXT + MX + DKIM) to your DNS provider
4. Click Verify — takes a few minutes to propagate

**Emails to test once domain is verified:**
- [ ] Contact form submission → email to `info@fipl-ng.com` (full message + Reply button)
- [ ] Newsletter subscribe (new email) → email to `info@fipl-ng.com` (subscriber notification)
- [ ] Newsletter subscribe (new email) → welcome email to the subscriber

---

## 15. Environment Variables

- [ ] All keys in `.env.local` (single file, no `.env`)
- [ ] `.env.local` is listed in `.gitignore` — confirm it does not appear in `git status`
- [ ] `.env.local.example` is committed — use it as a reference when deploying

```bash
git status  # .env.local should NOT appear here
```

---

## Summary Checklist

| Area | Status |
|---|---|
| Supabase tables + storage | |
| News page — live data | |
| Careers page — live jobs | |
| Contact form — DB + email | |
| Newsletter — DB + email (admin + subscriber) | |
| Admin login / auth | |
| Admin news CRUD + image upload | |
| Admin media upload | |
| Admin jobs CRUD | |
| Admin site alerts | |
| Admin notification bell | |
| Admin toast notifications | |
| Browser push notifications | |
| Email delivery (Resend domain) | |
