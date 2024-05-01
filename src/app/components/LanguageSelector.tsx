"use client"
import {Link} from "@/navigation"


export default function LanguageSelector() {

	return (<div>
		<Link href={"/"} locale="en">EN</Link>
		<Link href={"/"} locale="fi">FI</Link>

	</div>);
}