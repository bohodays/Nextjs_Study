"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import React, { useActionState, useEffect, useRef } from "react";

const ReviewItemDeleteButton = ({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) => {
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden />
      <input name="bookId" value={bookId} hidden />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
};

export default ReviewItemDeleteButton;
