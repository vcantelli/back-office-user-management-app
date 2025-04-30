import { Avatar, Skeleton, Box } from "@mui/material";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
};

export default function AvatarWithFallback({ src, alt }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box position="relative" width={40} height={40}>
      {!loaded && (
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ position: "absolute", top: 0, left: 0 }}
        />
      )}
      <Avatar src={src} alt={alt} onLoad={() => setLoaded(true)} sx={{ width: 40, height: 40 }} />
    </Box>
  );
}
