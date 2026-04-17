import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 10,
  duration: "2m",
};

const BASE_URL = "http://app:3000";
const PASSWORD = "Test@123";

function isOkStatus(status) {
  return status >= 200 && status < 300;
}

// ---------------- SETUP (CREATE EXACT USERS) ----------------
export function setup() {
  const users = [];
  let i = 1;

  while (users.length < 10) {
    const email = `user${i}_${Date.now()}@test.com`;

    const res = http.post(
      `${BASE_URL}/api/auth-register`,
      JSON.stringify({
        name: "test",
        email,
        password: PASSWORD,
      }),
      {
        headers: { "Content-Type": "application/json" },
        tags: { api: "auth_register" },
      }
    );

    if (isOkStatus(res.status)) {
      users.push({ email });
      console.log(`✅ User created: ${email}`);
    } else {
      console.error(`❌ Retry user: ${email} (${res.status})`);
    }

    i++;
    sleep(0.2); // small delay to stabilize DB
  }

  return users;
}

// ---------------- MAIN FLOW ----------------
export default function (data) {
  // Safe user mapping
  const user = data[(__VU - 1) % data.length];
  const email = user.email;

  // ---------------- LOGIN ----------------
  const loginRes = http.post(
    `${BASE_URL}/api/auth-login`,
    JSON.stringify({ email, password: PASSWORD }),
    {
      headers: { "Content-Type": "application/json" },
      tags: { api: "auth_login" },
    }
  );

  console.log(`VU${__VU} Login: ${loginRes.status}`);

  if (!isOkStatus(loginRes.status)) {
    console.error(`❌ Login failed VU${__VU}: ${loginRes.body}`);
    return;
  }

  const token = loginRes.json("token");

  if (!token) {
    console.error(`❌ No token for VU${__VU}`);
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // ---------------- ADD TO CART ----------------
  const addRes = http.post(
    `${BASE_URL}/api/cart`,
    JSON.stringify({
      productId: "69afbe8a03735244434806f1",
      quantity: 1,
    }),
    {
      headers,
      tags: { api: "add_to_cart" },
    }
  );

  check(addRes, {
    "add to cart success": (r) => r.status === 200,
  });

  sleep(1);

  // ---------------- GET CART ----------------
  const getRes = http.get(`${BASE_URL}/api/cart`, {
    headers,
    tags: { api: "get_cart" },
  });

  check(getRes, {
    "get cart success": (r) => r.status === 200,
  });

  // ---------------- LOGOUT ----------------
  const logoutRes = http.post(
    `${BASE_URL}/api/auth-logout`,
    null,
    {
      headers,
      tags: { api: "auth_logout" },
    }
  );

  console.log(`VU${__VU} Logout: ${logoutRes.status}`);

  sleep(1);
}