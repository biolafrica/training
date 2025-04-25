import { getReport } from "@/app/utils/database/getTasks"


export default async function SelectedReport({params}){
  const {id} = await params;
  const {summary} = await getReport(id)
  return(
    <h4>{summary}</h4>
  )

}