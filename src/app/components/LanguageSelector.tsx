"use client"
import {Link} from "@/navigation"


export default function LanguageSelector() {

	return (<div className="py-1">
		<Link className="hover:bg-lime-300 py-1 px-2 rounded-2xl" href={"/"} locale="en">EN</Link>
		<span> / </span>
		<Link className="hover:bg-lime-300 py-1 px-2 rounded-2xl" href={"/"} locale="fi">FI</Link>

	</div>);
}