import type { Result } from "true-myth/result"
import { err, ok } from "true-myth/result"
import { sleep } from "@/lib/timeout"

const fetchImageCache = new Map<
  string,
  Promise<Result<HTMLImageElement, string>>
>()
export function fetchImage(
  url: string,
  timeoutInMs = 5000
): Promise<Result<HTMLImageElement, string>> {
  if (!fetchImageCache.has(url)) {
    fetchImageCache.set(
      url,
      new Promise((resolve) => {
        const image = new Image()
        image.onload = () => resolve(ok(image))
        image.onerror = (event) => resolve(err(event.toString()))

        image.src = url

        sleep(timeoutInMs).then(() => resolve(err("Timeout reached")))
      })
    )
  }

  return fetchImageCache.get(url)!
}
