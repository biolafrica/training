import ReplyForm from "@/app/components/replyForm";
import { getMessage } from "@/app/utils/database/getTasks";


export default async function ({params}){
  const {id} = await params;
  const {messages} = await getMessage(id);

  return(

    <div>
      <div className="agentQuestion">
        <h3 className="text-center">{messages}</h3>
      </div>

      <ReplyForm/>
    </div>

  )

}