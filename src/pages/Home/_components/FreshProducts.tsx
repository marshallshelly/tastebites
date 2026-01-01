import { Skeleton } from "@heroui/react";
import Alert from "../../../components/Alert";
import { Simple } from "../../../components/Card";
import { useAppSelector } from "../../../hooks";
import { useGetProductsQuery } from "../../../services/product";

export default function FreshProducts() {
  const user = useAppSelector((state) => state.user.user);
  const { data, error, isLoading } = useGetProductsQuery(
    { limit: 4, offset: 0, categories: ["fresh"] },
    {
      skip: !user,
    }
  );

  if (error) {
    return <Alert title={(error as any)?.response?.data?.message} />;
  }

  if (isLoading) {
    return (
      <>
        <div className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
          </div>
        </div>
        <div className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
          </div>
        </div>
        <div className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
          </div>
        </div>
      </>
    );
  }

  if (data) {
    return (
      <>
        <h3 className="font-semibold text-3xl mb-6">Fresh Recipes</h3>
        {data.map(({ imageUrl, title, slug }) => (
          <Simple
            key={slug}
            imageUrl={imageUrl}
            title={title}
            href={`/product/${slug}`}
            slug={slug}
          />
        ))}
      </>
    );
  }

  return <></>;
}
