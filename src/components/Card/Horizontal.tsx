import { Button, Card, CardBody, Image } from "@heroui/react";
import type { HorizontalCardProps } from "./types";
import { Link } from "react-router-dom";

export default function Horizontal({
  imageUrl,
  title,
  description,
  href,
}: HorizontalCardProps) {
  return (
    <Card
      className="border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
      radius="none"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-20 items-center justify-center">
          <div className="relative col-span-6 md:col-span-5">
            <Image
              alt={title}
              className="object-cover"
              height={200}
              shadow="md"
              src={imageUrl}
              width="100%"
              radius="none"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-7">
            <div className="flex justify-between items-start">
              <div className="lg:pr-20">
                <h3 className="text-4xl font-semibold mt-2 mb-4">{title}</h3>
                <p className="text-small text-foreground/80 leading-6 text-pretty">
                  {description}
                </p>
                <Button
                  as={Link}
                  href={href}
                  radius="sm"
                  className="mt-6"
                  size="lg"
                >
                  READ MORE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
