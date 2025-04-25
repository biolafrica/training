import ReplyForm from "@/app/components/replyForm";
import { getMessage } from "@/app/utils/database/getTasks";

export const dynamic = 'force-dynamic';
export default async function ({params}){
  const {id} = await params;
  const message = await getMessage(id);

  return(

    <div>
      <div className="agentQuestion">
        <h3 className="text-center">{message.messages}</h3>
      </div>

      <ReplyForm message={message}/>
    </div>

  )

}