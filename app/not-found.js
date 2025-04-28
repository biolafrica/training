import Link from "next/link"

export default function NotFound(){
  return(
    <main className="not-found">
      <h2><b>We Hit a Brick Wall.</b></h2>
      <h5>We could not find the page you were looking for.</h5>
      <h5>Go back to all <Link href="/" style={{color: "#2aa874"}}>Dashboard</Link></h5>
    </main>
  )
}