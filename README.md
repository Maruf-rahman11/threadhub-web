# ThreadHUb

**A community-driven platform for sharing and discussing topics in Education,Entertainment, Health, and Politics etc.**

---

## Project overview

ThreadHub is a discussion-driven web application where users can create posts, engage with others, and discover content across three main verticals: **Education**, **Health**, and **Politics** etc.

---

## Main technologies

* **Frontend:** React, React Router (v6 loader routes), Tailwind CSS, DaisyUI
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Payments:** Stripe (PaymentIntent / Checkout)
* **Charts & UI:** Recharts, React Icons, SweetAlert2
* **Other:** Axios, react-helmet

---

## Core features

* Create, read, and view posts across categories (Education, Health, Politics)
* User accounts and authentication (AuthContext)
* Membership plans: **Bronze** (default, limited posts) and **Gold** (more privileges)
* Stripe-based payment flow to upgrade members to Gold
* Recent posts, Popular posts, and Top-rated sections
* Responsive design with light/dark mode (DaisyUI themes)
* Error/404 page and friendly UX
* Admin utilities to update applicant/user status

---

## Dependencies

Key dependencies used in this project (partial):

* `react`, `react-dom`
* `react-router-dom`
* `tailwindcss`, `daisyui`
* `axios`
* `express`, `mongodb`
* `stripe`
* `@stripe/react-stripe-js`, `@stripe/stripe-js`
* `recharts`
* `react-icons`
* `sweetalert2`
* `react-helmet`

---

## Run locally (development)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd project-folder
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

### 4. Start server (development)

```bash
cd server
npm run dev
# or: node server.js / nodemon
```

### 5. Start client (development)

```bash
cd client
npm run dev
# or: npm start (CRA)
```

Now open `http://localhost:5173` (or the port your dev server shows) and test.

---

## Stripe & Webhooks (local testing)

* Use Stripe test keys in `.env`.
* Use the Stripe CLI to forward webhooks when developing locally:

```bash
stripe listen --forward-to localhost:5000/webhook
```

* Verify `checkout.session.completed` or `payment_intent.succeeded` to mark a user as Gold.

---

## API Endpoints (examples)

* `POST /applicants` — create applicant
* `PATCH /applicants/update-status/:email` — update applicant status by email
* `POST /create-payment-intent` — create Stripe PaymentIntent
* `POST /create-checkout-session` — create Stripe Checkout session
* `GET /courses` — fetch courses

Adjust these to your server route names.

---

## Deployment

* Deploy server (Express + Node) to Heroku / Render / Railway / DigitalOcean App Platform.
* Deploy client (React) to Vercel / Netlify / Surge.
* In production, set real Stripe keys and add your webhook URL in the Stripe Dashboard.

---

## Useful resources

* Stripe docs: [https://stripe.com/docs](https://stripe.com/docs)
* Tailwind docs: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
* DaisyUI: [https://daisyui.com/](https://daisyui.com/)
* Recharts: [https://recharts.org/](https://recharts.org/)

---

## License & Contact

MIT License — feel free to reuse.

If you want updates or help integrating features (Stripe, ratings persistence, chat persistence), open an issue or contact: `mrsohan34@gmail.com`.

---

*Last updated: Oct 25, 2025*
