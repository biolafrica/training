import Instruction from "@/app/components/instruction";
import ReplyForm from "@/app/components/replyForm";
import { getTask } from "@/app/utils/database/getTasks";
import Heading from "@/app/components/heading";
import MessageCont from "@/app/components/messageCont";
import Loading from "@/app/loading";


export const dynamic = 'force-dynamic';

export default async function selectedTest({params}){
  const {id} = await params;
  const message = await getTask.getMessage(id);

  return(

    <div className="body-cont grid lg:grid-cols-3">

      <Instruction/>

      <div className="lg:col-span-2">

        <Heading type="Chat"/>

        <div className=" lg:mx-30 lg:my-20 ">
          <MessageCont data={message.messages} icon="/Support agent.svg"/>
          <ReplyForm message={message}/>
        </div>

      </div>

    </div>

  )

}