import { resetPasswordForEmail, updateUser, supabase } from "./supabase.js";

const stepRequest = document.getElementById("step-request");
const stepUpdate = document.getElementById("step-update");

// ─── Check if this is a recovery redirect from Supabase email link ───
// Supabase appends #access_token=...&type=recovery to the URL
supabase.auth.onAuthStateChange(async (event) => {
  if (event === "PASSWORD_RECOVERY") {
    stepRequest.style.display = "none";
    stepUpdate.style.display = "block";
  }
});

// ─── Step 1: Send reset email ─────────────────────────────────
const requestBtn = document.getElementById("request-btn");
const requestError = document.getElementById("request-error");
const requestSuccess = document.getElementById("request-success");

requestBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  requestError.textContent = "";
  requestSuccess.textContent = "";

  if (!email) {
    requestError.textContent = "Please enter your email.";
    return;
  }

  requestBtn.textContent = "Sending…";
  requestBtn.disabled = true;

  const { error } = await resetPasswordForEmail(email);

  if (error) {
    requestError.textContent = error.message;
  } else {
    requestSuccess.textContent = "Reset link sent! Check your email.";
  }

  requestBtn.textContent = "Send Reset Link";
  requestBtn.disabled = false;
});

// ─── Step 2: Update password ──────────────────────────────────
const updateBtn = document.getElementById("update-btn");
const updateError = document.getElementById("update-error");
const updateSuccess = document.getElementById("update-success");

updateBtn.addEventListener("click", async () => {
  const newPassword = document.getElementById("new-password").value;
  const confirm = document.getElementById("confirm-new-password").value;
  updateError.textContent = "";
  updateSuccess.textContent = "";

  if (!newPassword || !confirm) {
    updateError.textContent = "Please fill in both fields.";
    return;
  }

  if (newPassword.length < 6) {
    updateError.textContent = "Password must be at least 6 characters.";
    return;
  }

  if (newPassword !== confirm) {
    updateError.textContent = "Passwords do not match.";
    return;
  }

  updateBtn.textContent = "Updating…";
  updateBtn.disabled = true;

  const { error } = await updateUser(newPassword);

  if (error) {
    updateError.textContent = error.message;
    updateBtn.textContent = "Update Password";
    updateBtn.disabled = false;
  } else {
    updateSuccess.textContent = "Password updated! Redirecting to login…";
    setTimeout(() => (window.location.href = "/login.html"), 2000);
  }
});
