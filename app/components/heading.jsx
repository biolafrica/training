export default function Heading({type, name}){
  return(
    <div className="flex justify-between px-5 py-7 lg:px-20  border-b border-gray-100 mb-5">
      <p className="text-xl font-medium">{type}</p>
      <p className="font-medium">Hi, {name}</p>
    </div>
  )
}