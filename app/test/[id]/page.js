import Instruction from "@/app/components/instruction";
import ReplyForm from "@/app/components/replyForm";
import { getMessage } from "@/app/utils/database/getTasks";

export const dynamic = 'force-dynamic';
export default async function ({params}){
  const {id} = await params;
  const message = await getMessage(id);

  return(

    <div className="border border-gray-300 rounded-2xl grid lg:grid-cols-3 overflow-scroll h-[calc(100vh-2.5rem)] m-5">

      <Instruction/>

      <div className="lg:col-span-2">

        <div className="flex justify-between px-5 py-7 lg:px-20  border-b border-gray-100 mb-5">
          <p className="text-xl font-medium">Test</p>
          <p className="font-medium">Hi, Abiodun</p>
        </div>

        <div className=" lg:mx-30 lg:my-20 ">
          <div className="border m-5 p-5 rounded-lg border-gray-100 flex">
            <img className="mx-2" src="/Support agent.svg" alt="agent icon" />
            <h3 className="whitespace-pre-wrap font-medium">{message.messages}</h3>
          </div>

          <ReplyForm message={message}/>
        </div>

      </div>

    </div>

  )

}