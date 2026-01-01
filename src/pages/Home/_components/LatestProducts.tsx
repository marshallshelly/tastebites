import { Skeleton } from "@heroui/react";
import Alert from "../../../components/Alert";
import { Post } from "../../../components/Card";
import { useAppSelector } from "../../../hooks";
import { useGetProductsQuery } from "../../../services/product";

export default function LatestProducts() {
  const user = useAppSelector((state) => state.user.user);
  const { data, error, isLoading } = useGetProductsQuery(
    { limit: 2, offset: 0 },
    {
      skip: !user,
    }
  );

  if (error) {
    return <Alert title={(error as any)?.response?.data?.message} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-7">
        <div className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-60 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
          </div>
        </div>
        <div className="space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-60 rounded-lg bg-secondary"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
          </div>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <>
        <h3 className="font-semibold text-3xl mb-6">Latest Recipes</h3>
        <div className="space-y-7">
          {data.map(
            ({
              author,
              authorImageUrl,
              createdAt,
              description,
              imageUrl,
              title,
              slug,
            }) => (
              <Post
                key={slug}
                title={title}
                description={description}
                imageUrl={imageUrl}
                author={author}
                authorImageUrl={authorImageUrl}
                createdAt={createdAt}
                href={`/product/${slug}`}
              />
            )
          )}
        </div>
      </>
    );
  }

  return <></>;
}
