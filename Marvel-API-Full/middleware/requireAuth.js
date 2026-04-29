import supabase from "../config/db.js";

export default async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Missing Authorization: Bearer <token> header",
    });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({
      success: false,
      message: error?.message || "Invalid or expired token",
    });
  }

  req.user = data.user;
  next();
}
