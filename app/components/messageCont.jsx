export default function MessageCont({data, icon}){
  return(
    <div className="border m-5 p-5 rounded-lg border-gray-100 flex">
      <img className="mx-2" src={`${icon}`} alt={`${icon}`} />
      <h3 className="whitespace-pre-wrap font-medium">{data}</h3>
    </div>
  )
}