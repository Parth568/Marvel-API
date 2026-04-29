import { signUp, getSession } from "./supabase.js";

// Redirect if already logged in
const { session } = await getSession();
if (session) window.location.href = "/index.html";

const registerBtn = document.getElementById("register-btn");
const errorMsg = document.getElementById("error-msg");
const successMsg = document.getElementById("success-msg");

registerBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;

  errorMsg.textContent = "";
  successMsg.textContent = "";

  if (!email || !password || !confirm) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  if (password.length < 6) {
    errorMsg.textContent = "Password must be at least 6 characters.";
    return;
  }

  if (password !== confirm) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  registerBtn.textContent = "Creating account…";
  registerBtn.disabled = true;

  const { error } = await signUp(email, password);

  if (error) {
    errorMsg.textContent = error.message;
    registerBtn.textContent = "Create Account";
    registerBtn.disabled = false;
  } else {
    successMsg.textContent =
      "Account created! Check your email to confirm, then log in.";
    registerBtn.textContent = "Create Account";
    registerBtn.disabled = false;
  }
});

// Allow Enter key to submit
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") registerBtn.click();
});
