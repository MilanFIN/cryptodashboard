"use server";

import { cookies } from "next/headers";


export async function saveBookmarked(bookmarked: string[]) {
	cookies().set("bookmarked", bookmarked.join(","))
}

export async function getBookmarked(): Promise<string[]> {
	const bookmarked = cookies().get("bookmarked");
	if (bookmarked != null && bookmarked.value !== "") {
		return bookmarked.value.split(",");

	}
	else {
		return [];
	}
}