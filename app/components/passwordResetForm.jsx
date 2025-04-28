'use client'

import { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "../utils/supabase/client";

export default function PasswordResetForm({token}){
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword }, { access_token: token });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // Redirect to a success page or login page
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <label className="mb-5" htmlFor="newPassword">
        <h5>New Password:</h5>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </label>

      <button disabled={loading} className="pri-btn">{loading ? "Loading..." : "Reset Password"}</button>
    </form>
  );

}