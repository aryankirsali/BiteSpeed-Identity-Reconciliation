# Bitespeed Identity Reconciliation

## 📌 Overview
This project is a backend service for identity reconciliation, ensuring proper handling of user contacts and their relationships. It provides an API to manage and retrieve contact identities.

## 🚀 Tech Stack
- **Node.js + Express.js** (with Typescript)
- **PostgreSQL** (Database)

---

## 🔍 API Endpoints

### ✅ **1. Health Check**
**Endpoint:** `GET /health`

**Description:** Returns server health status.

**cURL Command:**
```sh
curl -X GET https://bitespeed-identity-reconciliation-p8di.onrender.com/health
```
**Response:**
```json
{
  "server": "🟢 Server is running",
  "database": "🟢 Database is connected"
}
```

### 🔎 **2. Identify Contact**
**Endpoint:** `POST /identify`

**Description:** Accepts user contact details and returns identity reconciliation.

**Request Body:**
```json
{
  "email": "aryankirsali@gmail.com",
  "phoneNumber": "6397547477"
}
```

**cURL Command:**
```sh
curl -X POST https://bitespeed-identity-reconciliation-p8di.onrender.com/identify \
     -H "Content-Type: application/json" \
     -d '{"email": "aryankirsali@gmail.com", "phoneNumber": "6397547477"}'
```

**Response Example:**
```json
{
  "contact": {
    "id": 1,
    "email": "aryankirsali@gmail.com",
    "phone_number": "6397547477",
    "linked_id": null,
    "link_precedence": "primary"
  }
}
```

---

## 🛠 Future Improvements
While this implementation is functional, here are potential improvements:

### 1️⃣ **Redis Caching: Write-Through Cache would be a good solution here**

### 2️⃣ **Authentication & Authorization: JWT based Auth**

### 3️⃣ **Rate Limiting: Limit requests to prevent DoS attacks and request abuse**

### 4️⃣ **Logging & Monitoring using winston & Prometheus+Grafana**

### 5️⃣ **Unit & Integration Testing**

