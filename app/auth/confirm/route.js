import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  
  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Redirect user to homepage after successful authentication
      return redirect('/');
    }
  }

  // Redirect to an error page if authentication fails
  return redirect('/error');
}