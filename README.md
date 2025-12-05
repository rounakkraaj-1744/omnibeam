# Omnibeam 🚀

> A unified, multi-channel notification orchestration platform that routes messages across Email, Slack, Push Notifications, and SMS through a single API endpoint.

---

## ✨ Features

- **Unified API** – Send notifications to multiple channels with one request [web:9]
- **Real-time Delivery Logs** – Track notification status across all channels instantly
- **Automatic Retries** – Built-in exponential backoff for failed deliveries
- **Channel Orchestration** – Email (Resend), Slack, Web Push, and SMS support
- **Serverless Architecture** – Powered by Cloudflare Workers + Upstash Redis queues
- **User Dashboard** – Configure channels, send test notifications, view delivery history
- **Rate Limiting** – Per-user rate limits to prevent abuse
- **Type-Safe** – Full TypeScript support across frontend and workers

---

## 🏗️ Architecture

NotifyOS uses a queue-based architecture for reliable message delivery [web:9]:

```plaintext
    Client Request
            ↓
    Next.js API Route (/api/notify)
            ↓
    Upstash Redis Queue (job creation)
            ↓
    Cloudflare Workers (process jobs)
        ├── Email Worker (Resend API)
        ├── Slack Worker (Slack Web API)
        ├── Push Worker (Web Push Protocol)
        └── SMS Worker (Twilio)
            ↓
    Convex (real-time logs)
            ↓
    Dashboard (live status updates)
```


**Key Design Decisions:**
- **Cloudflare Workers** handle channel-specific delivery logic with sub-50ms cold starts
- **Upstash Redis** provides durable queues without managing infrastructure
- **Convex** powers real-time log synchronization to the dashboard
- **BetterAuth** manages authentication with social providers
- **Drizzle ORM** for type-safe database operations

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Cloudflare account (Workers)
- Upstash account (Redis)
- Convex account (real-time backend)

### Installation

1. Clone the repository
```bash
git clone https://github.com/rounakkraaj-1744/omnibeam.git
```
2. cd omnibeam
```bash
cd omnibeam
```

3. Install dependencies
```bash
npm install
```

4. Set up environment variables
```bash
cp .env.example .env.local
```

### Environment Variables

Database
DATABASE_URL=your_turso_or_neon_url

Auth
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000

Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

Convex
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url

Channel Providers
RESEND_API_KEY=your_resend_key
SLACK_BOT_TOKEN=your_slack_token
VAPID_PUBLIC_KEY=your_vapid_public
VAPID_PRIVATE_KEY=your_vapid_private
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token


### Development

Run Next.js dev server
```bash
npm run dev
```

Deploy Cloudflare Workers
```bash
npm run deploy:workers
```

Run Convex backend
```bash
npx convex dev
```


Visit `http://localhost:3000` to access the dashboard.

---

## 📡 API Reference

### Send Notification

```http
POST /api/notify
Authorization: Bearer <your_api_key>
Content-Type: application/json
```

**Request Body:**

```json
{
    "channels": ["email", "slack", "push"],
    "message": "Your order #1234 has been shipped!",
    "to": {
        "email": "user@example.com",
        "slackUser": "@username",
        "pushSubscription": "<web-push-subscription-object>"
    },
    "metadata": {
        "priority": "high",
        "tags": ["order", "shipping"]
    }
}
```

**Response:**

```json
{
    "jobId": "notif_abc123xyz",
    "status": "queued",
    "channels": {
        "email": "pending",
        "slack": "pending",
        "push": "pending"
    },
    "createdAt": "2024-12-06T02:26:00Z"
}
```

### Check Delivery Status

```http
GET /api/notify/:jobId
Authorization: Bearer <your_api_key>
```

text

**Response:**

```json
{
    "jobId": "notif_abc123xyz",
    "channels": {
    "email": {
        "status": "delivered",
        "attempts": 1,
        "deliveredAt": "2024-12-06T02:26:03Z"
    },
    "slack": {
        "status": "failed",
        "attempts": 3,
        "lastError": "channel_not_found"
    },
    "push": {
        "status": "delivered",
        "attempts": 1,
        "deliveredAt": "2024-12-06T02:26:02Z"
    }
}
```

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Convex (real-time data)

**Backend:**
- Cloudflare Workers
- Upstash Redis (queues)
- Drizzle ORM
- BetterAuth

**Channel Providers:**
- Resend (Email)
- Slack Web API
- Web Push Protocol
- Twilio (SMS)

---

## 📊 Dashboard Features

### 1. Channel Configuration
Connect and manage notification channels with OAuth flows and API key storage.

### 2. Test Composer
Send test notifications to verify channel setup with instant feedback.

### 3. Real-time Logs
Monitor delivery status, retry attempts, and failure reasons as they happen.

### 4. API Key Management
Generate, revoke, and rotate API keys with usage analytics.

---

## 🔐 Security

- API keys hashed with bcrypt before storage
- Rate limiting per user (100 requests/minute default)
- CORS protection on all endpoints
- Encrypted channel credentials at rest
- No sensitive data in logs

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps [web:3]:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request