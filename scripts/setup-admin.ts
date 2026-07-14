/**
 * Links an existing Supabase Auth user (created manually in the dashboard)
 * to the `profiles` table with role = 'admin'. Does NOT create the user or
 * touch a password — run this only after you've created your account in
 * Supabase → Authentication → Users.
 *
 * Usage: npx tsx scripts/setup-admin.ts you@example.com
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createAdminClient } from "../src/lib/supabase/admin";

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npx tsx scripts/setup-admin.ts <email>");
    process.exit(1);
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error("Failed to list users:", error.message);
    process.exit(1);
  }

  const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!user) {
    console.error(
      `No auth user found with email "${email}". Create it in the Supabase dashboard first (Authentication → Users → Add user).`,
    );
    process.exit(1);
  }

  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert({ id: user.id, email: user.email!, role: "admin" }, { onConflict: "id" });

  if (upsertError) {
    console.error("Failed to upsert profile:", upsertError.message);
    process.exit(1);
  }

  console.log(`✓ Linked ${email} (${user.id}) to profiles with role "admin".`);
}

main();
