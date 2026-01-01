import { Skeleton } from "@heroui/react";
import Alert from "../../../components/Alert";
import { Simple } from "../../../components/Card";
import { useAppSelector } from "../../../hooks";
import { useGetProductsQuery } from "../../../services/product";

export default function CuratedProducts() {
  const user = useAppSelector((state) => state.user.user);
  const { data, error, isLoading } = useGetProductsQuery(
    { limit: 6, offset: 0, categories: ["curated"] },
    {
      skip: !user,
    }
  );

  if (error) {
    return <Alert title={(error as any)?.response?.data?.message} />;
  }

  if (isLoading) {
    return (
      <ul
        role="list"
        className="grid gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
      >
        <li className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
          </div>
        </li>
        <li className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
          </div>
        </li>
        <li className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
          </div>
        </li>
        <li className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
          </div>
        </li>
        <li className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
          </div>
        </li>
        <li className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
          </div>
        </li>
      </ul>
    );
  }

  if (data) {
    return (
      <>
        <h3 className="font-semibold text-4xl">Curated Collections</h3>
        <ul
          role="list"
          className="mt-8 grid gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
        >
          {data.map(({ badges, imageUrl, title, slug }) => (
            <Simple
              key={slug}
              imageUrl={imageUrl}
              title={title}
              as="li"
              badges={badges}
              href={`/product/${slug}`}
              slug={slug}
            />
          ))}
        </ul>
      </>
    );
  }

  return <></>;
}
