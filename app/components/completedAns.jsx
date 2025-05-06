export default function CompletedQuestion({reply}){
  return(
    <div className="border m-5 p-5 rounded-lg border-gray-100 flex">
      <div className="whitespace-pre-wrap font-medium">{reply}</div>
      <img className="mx-2" src="/Person 4.svg" alt="user icon" />
    </div>
  )
}