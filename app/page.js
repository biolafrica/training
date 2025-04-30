import StartButton from "./components/startButton";
import fetchUser from "./utils/supabase/fetchUser";
import { checkExistingSession } from "./utils/database/checkTasks";
import Instruction from "./components/instruction";
import Heading from "./components/heading";

export default async function Home() {
  const userData = await fetchUser();
  const userId = userData.user.id
  const existingSession = await checkExistingSession(userId);

  return (
    
    <div className="body-cont grid lg:grid-cols-3">

      <Instruction/>

      <div className="lg:col-span-2">

        <Heading type="Home"/>

        <div className="px-5 md:px-30 m-auto w-fit py-20 ">
          <StartButton id={userId} existingSession={existingSession}/>
        </div>
        
      </div>

    </div>
    
   
  );
}
