import { BookData } from "@/types";
import Link from "next/link";
import React from "react";
import style from "./book-item.module.css";

const BookItem = ({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) => {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <img src={coverImgUrl} />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
