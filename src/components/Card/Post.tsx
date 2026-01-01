import { Image, User } from "@heroui/react";
import type { PostCardProps } from "./types";
import { createElement, useMemo } from "react";
import { intervalToDuration } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  imageUrl,
  title,
  isLoading,
  as = "div",
  author,
  authorImageUrl,
  createdAt,
  description,
  href,
}: PostCardProps) {
  const difference = useMemo(() => {
    const { days = 0 } = intervalToDuration({
      start: new Date(createdAt),
      end: new Date(),
    });
    let diff = "Today";
    if (days === 1) diff = "Yesterday";
    else if (days > 1) diff = `${days} days ago`;
    return diff;
  }, [createdAt]);

  return createElement(
    as,
    { className: "relative" },
    <>
      <Link
        to={href}
        className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden max-h-80"
      >
        <Image
          isZoomed
          radius="none"
          alt={title}
          src={imageUrl}
          isLoading={isLoading}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <article className="p-6 bg-gray-100 border">
        <Link to={href} className="mb-2 text-base font-semibold text-gray-900">
          {title}
        </Link>
        <p className="mt-2">{description}</p>
        <div className="flex justify-between mt-8 items-center">
          <User name={author} avatarProps={{ src: authorImageUrl }} />
          <time dateTime={createdAt}>{difference}</time>
        </div>
      </article>
    </>
  );
}
