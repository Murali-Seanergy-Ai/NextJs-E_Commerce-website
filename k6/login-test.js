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

// ---------------- SETUP (REGISTER USERS) ----------------
export function setup() {
  for (let i = 1; i <= 10; i++) {
    const email = `user${i}@test.com`;

    const res = http.post(
      `${BASE_URL}/api/auth-register`,
      JSON.stringify({ name: "test", email, password: PASSWORD }),
      {
        headers: { "Content-Type": "application/json" },
        tags: { api: "auth_register" },   // ✅ TAG ADDED
      }
    );

    if (!(isOkStatus(res.status) || res.status === 409)) {
      console.error(`Register failed for ${email}: ${res.status}`);
    }

    sleep(0.2);
  }
}

// ---------------- MAIN FLOW ----------------
export default function () {
  const email = `user${__VU}@test.com`;

  // LOGIN
  const loginRes = http.post(
    `${BASE_URL}/api/auth-login`,
    JSON.stringify({ email, password: PASSWORD }),
    {
      headers: { "Content-Type": "application/json" },
      tags: { api: "auth_login" },   // ✅ TAG ADDED
    }
  );

  console.log(`VU${__VU} Login: ${loginRes.status}`);

  if (!isOkStatus(loginRes.status)) {
    console.error(`VU${__VU} Login failed`);
    return;
  }

  const token = loginRes.json("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // ADD TO CART
  const addRes = http.post(
    `${BASE_URL}/api/cart`,
    JSON.stringify({ productId: "69afbe8a03735244434806f1", quantity: 1 }),
    {
      headers,
      tags: { api: "add_to_cart" },   // ✅ ALREADY GOOD
    }
  );

  check(addRes, {
    "add to cart success": (r) => r.status === 200,
  });

  sleep(1);

  // GET CART
  const getRes = http.get(`${BASE_URL}/api/cart`, {
    headers,
    tags: { api: "get_cart" },   // ✅ ALREADY GOOD
  });

  check(getRes, {
    "get cart success": (r) => r.status === 200,
  });

  // LOGOUT
  const logoutRes = http.post(
    `${BASE_URL}/api/auth-logout`,
    null,
    {
      headers,
      tags: { api: "auth_logout" },   // ✅ TAG ADDED
    }
  );

  console.log(`VU${__VU} Logout: ${logoutRes.status}`);

  sleep(1);
}