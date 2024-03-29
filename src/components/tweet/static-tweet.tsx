import { unstable_cache } from "next/cache";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import { getTweet as _getTweet } from "react-tweet/api";

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ["tweet"],
  { revalidate: 3600 * 24 },
);

export async function StaticTweet({ id }: { id: string }) {
  try {
    const tweet = await getTweet(id);
    return tweet ? (
      <div className="not-prose">
        <EmbeddedTweet tweet={tweet} />
      </div>
    ) : (
      <TweetNotFound />
    );
  } catch (error) {
    console.error(error);
    return <TweetNotFound error={error} />;
  }
}
