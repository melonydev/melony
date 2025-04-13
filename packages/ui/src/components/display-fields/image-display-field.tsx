import { ImageFieldConfig } from "@/lib/types/fields";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ImageDisplayField({
  field,
  value,
}: {
  field: ImageFieldConfig;
  value: unknown;
}) {
  const imagePath = value;
  const imageUrl = imagePath
    ? (imagePath as string).startsWith("http") ||
      (imagePath as string).startsWith("//")
      ? imagePath
      : `${field.config?.baseImageUrl || ""}${imagePath}`
    : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "w-[28px] h-[28px] overflow-hidden rounded-sm bg-muted cursor-pointer",
            { "w-[64px] h-[64px]": field.config?.large }
          )}
        >
          {imageUrl ? (
            <>
              <img
                src={imageUrl as string}
                alt=""
                width={field.config?.large ? 64 : 24}
                height={field.config?.large ? 64 : 24}
                className="object-cover w-full h-full"
              />
            </>
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <ImageIcon className="h-4 w-4" />
            </div>
          )}
        </div>
      </DialogTrigger>
      {imageUrl && (
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="w-full aspect-square">
            <img src={imageUrl as string} alt="" className="object-contain" />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
