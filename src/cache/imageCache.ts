import fs from "fs";
import path from "path";

const CACHE_FILE = path.join(
  process.cwd(),
  ".cache",
  "images.json"
);

export function getImageCache() {

  if (!fs.existsSync(CACHE_FILE)) {
    return {};
  }

  const data = fs.readFileSync(
    CACHE_FILE,
    "utf-8"
  );

  return JSON.parse(data);
}

export function saveImageCache(
  cache: Record<string, any>
) {

  const cacheDir = path.join(
    process.cwd(),
    ".cache"
  );

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
  }

  fs.writeFileSync(
    CACHE_FILE,
    JSON.stringify(
      cache,
      null,
      2
    )
  );
}
