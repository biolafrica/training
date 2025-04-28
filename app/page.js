import StartButton from "./components/startButton";
import fetchUser from "./utils/supabase/fetchUser";
import { checkExistingSession } from "./utils/database/checkTasks";
import Instruction from "./components/instruction";

export default async function Home() {
  const userData = await fetchUser();
  const userId = userData.user.id
  const existingSession = await checkExistingSession(userId);

  return (
    
    <div className="border border-gray-300 rounded-2xl grid lg:grid-cols-3 overflow-scroll h-[calc(100vh-2.5rem)] m-5">

      <Instruction/>

      <div className="lg:col-span-2">

        <div className="flex justify-between px-5 py-7  border-b border-gray-100 mb-5">
          <p className="text-xl font-medium">Homepage</p>
          <p className="font-medium">Welcome Abiodun</p>
        </div>

        <div className="px-5 md:px-30 m-auto w-fit py-20 ">
          <StartButton id={userId} existingSession={existingSession}/>
        </div>
        
      </div>

    </div>
    
   
  );
}
