import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { generateAvatarSVG } from "../../lib/utils";

const Avatar = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20 transition-all duration-200 hover:ring-primary/40",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = forwardRef(({ className, src, ...props }, ref) => {
  if (!src) return null;
  return (
    <img
      ref={ref}
      className={cn("aspect-square h-full w-full object-cover", className)}
      src={src}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef(({ className, name, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("aspect-square h-full w-full flex items-center justify-center", className)}
    dangerouslySetInnerHTML={{ __html: atob(generateAvatarSVG(name).split(',')[1]) }}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };