import { signInWithPassword, getSession } from "./supabase.js";

// Redirect if already logged in
const { session } = await getSession();
if (session) window.location.href = "/index.html";

const loginBtn = document.getElementById("login-btn");
const errorMsg = document.getElementById("error-msg");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  errorMsg.textContent = "";

  if (!email || !password) {
    errorMsg.textContent = "Please fill in both fields.";
    return;
  }

  loginBtn.textContent = "Logging in…";
  loginBtn.disabled = true;

  const { error } = await signInWithPassword(email, password);

  if (error) {
    errorMsg.textContent = error.message;
    loginBtn.textContent = "Log In";
    loginBtn.disabled = false;
  } else {
    window.location.href = "/index.html";
  }
});

// Allow Enter key to submit
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") loginBtn.click();
});
