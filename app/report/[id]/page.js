import Heading from "@/app/components/heading";
import Instruction from "@/app/components/instruction";
import MessageCont from "@/app/components/messageCont";
import { getTask } from "@/app/utils/database/getTasks"
import Link from "next/link";


export default async function SelectedReport({params}){
  const {id} = await params;
  const {summary} = await getTask.getReport(id)

  return(

    <div className=" body-cont grid lg:grid-cols-3">

      <Instruction/>

      <div className="lg:col-span-2">

        <Heading type="Document"/>

        <div className="lg:mx-30 lg:my-20 ">

          <MessageCont  data={summary} icon="/Document.svg" />

          <div className="w-fit m-auto">
            <Link href="/" className="pri-btn">Back Home</Link>
          </div>
         
        </div>

      </div>

    </div>
 
  )

}