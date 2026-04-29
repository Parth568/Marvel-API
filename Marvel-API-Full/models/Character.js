import supabase from "../config/db.js";

const TABLE = "characters";
const ALLOWED_FIELDS = ["marvel_id", "name", "description", "thumbnail_url"];

function unwrap({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

const Character = {
  async findAll(limit = 100) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("id", { ascending: true })
      .limit(limit);
    return unwrap({ data, error }) || [];
  },

  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return unwrap({ data, error });
  },

  async findByName(name) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .ilike("name", `%${name}%`);
    return unwrap({ data, error }) || [];
  },

  async findExactName(name) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .ilike("name", name)
      .limit(1);
    return unwrap({ data, error }) || [];
  },

  async nameStartsWith(prefix) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .ilike("name", `${prefix}%`)
      .limit(10);
    return unwrap({ data, error }) || [];
  },

  async create(characterData) {
    const payload = {};
    for (const key of ALLOWED_FIELDS) {
      if (characterData[key] !== undefined) payload[key] = characterData[key];
    }
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();
    return unwrap({ data, error });
  },

  async updateById(id, updateData) {
    const payload = {};
    for (const key of ALLOWED_FIELDS) {
      if (updateData[key] !== undefined) payload[key] = updateData[key];
    }
    if (Object.keys(payload).length === 0) return null;

    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("id", id)
      .select()
      .maybeSingle();
    return unwrap({ data, error });
  },

  async deleteById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .delete()
      .eq("id", id)
      .select()
      .maybeSingle();
    return unwrap({ data, error });
  },

  async count() {
    const { count, error } = await supabase
      .from(TABLE)
      .select("id", { count: "exact", head: true });
    if (error) throw new Error(error.message);
    return count ?? 0;
  },

  async findRandom() {
    const total = await Character.count();
    if (!total) return null;
    const offset = Math.floor(Math.random() * total);
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .range(offset, offset);
    if (error) throw new Error(error.message);
    return data?.[0] || null;
  },
};

export default Character;
