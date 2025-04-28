import Instruction from "@/app/components/instruction";
import ReplyForm from "@/app/components/replyForm";
import { getTask } from "@/app/utils/database/getTasks";
import Heading from "@/app/components/heading";
import MessageCont from "@/app/components/messageCont";
import fetchUser from "@/app/utils/supabase/fetchUser";

export const dynamic = 'force-dynamic';

export default async function ({params}){
  const {id} = await params;
  const message = await getTask.getMessage(id);
  const userData = await fetchUser();

  return(

    <div className="body-cont grid lg:grid-cols-3">

      <Instruction/>

      <div className="lg:col-span-2">

        <Heading type="Test" name={userData.user.email}/>

        <div className=" lg:mx-30 lg:my-20 ">
          <MessageCont data={message.messages} icon="/Support agent.svg"/>
          <ReplyForm message={message}/>
        </div>

      </div>

    </div>

  )

}