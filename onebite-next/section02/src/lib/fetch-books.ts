import { BookData } from "@/types";

const fetchBooks = async (q?: string): Promise<BookData[]> => {
  let url = `http://localhost:12345/book`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default fetchBooks;
