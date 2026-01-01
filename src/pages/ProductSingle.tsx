import { Image, Skeleton } from "@heroui/react";
import { useGetProductBySlugQuery } from "../services/product";
import { useParams } from "react-router-dom";

export default function ProductSingle() {
  const { slug } = useParams();
  const { data, error, isLoading } = useGetProductBySlugQuery(slug!, {
    skip: !slug,
  });

  return (
    <div className="max-w-5xl mx-auto px-6">
      {error ? (
        <div className="h-96 flex justify-center items-center">
          <small className="text-danger text-2xl">
            {(error as any)?.data?.message}
          </small>
        </div>
      ) : isLoading ? (
        <div className="space-y-5 p-4">
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
        </div>
      ) : data ? (
        <>
          <Image
            src={
              data.imageUrl.startsWith("/")
                ? `${import.meta.env.VITE_API_URL}${data.imageUrl}`
                : data.imageUrl
            }
            alt={data.title}
            height={120}
            width={1024}
            className="aspect-video object-cover"
          />
          <article className="text-pretty my-10">
            <h1 className="mb-10 lg:text-5xl text-4xl font-semibold">
              {data.title}
            </h1>
            <div className="sm:p-20 p-8 bg-gray-50">
              <h3 className="font-bold sm:text-3xl text-2xl">Recipe</h3>
              <p className="mt-6 sm:text-xl text-lg">
                Here's a simple recipe for {data.title}:
              </p>
              <p className="mt-6 sm:text-xl text-lg">Ingredients:</p>
              <ul className="mt-2 sm:text-xl text-lg leading-10">
                {data.ingredients.map((ing) => (
                  <li key={ing} className="indent-1">
                    - {ing}
                  </li>
                ))}
              </ul>
              <p className="mt-6 sm:text-xl text-lg">Instructions:</p>
              <ol className="mt-2 sm:text-xl text-lg list-decimal list-inside leading-10">
                {data.instructions.map((ins) => (
                  <li key={ins} className="indent-1">
                    {ins}
                  </li>
                ))}
              </ol>
              <p className="mt-6 sm:text-xl text-lg">
                Enjoy your delicious {data.title}!
              </p>
            </div>
          </article>
        </>
      ) : null}
    </div>
  );
}
