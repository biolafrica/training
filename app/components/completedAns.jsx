export default function CompletedQuestion({reply}){
  return(
    <div className="border m-5 p-5 rounded-lg border-gray-100 flex">
      <h3 className="whitespace-pre-wrap font-medium">{reply}</h3>
      <img className="mx-2" src="/Person 4.svg" alt="user icon" />
    </div>
  )
}