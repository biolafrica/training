import StartButton from "./components/startButton";
import fetchUser from "./utils/supabase/fetchUser";
import { checkExistingSession } from "./utils/database/checkTasks";

export default async function Home() {
  const userData = await fetchUser();
  const userId = userData.user.id
  const existingSession = await checkExistingSession(userId);

  return (
    <StartButton id={userId} existingSession={existingSession}/>
  );
}
