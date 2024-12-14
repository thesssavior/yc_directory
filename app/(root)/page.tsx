import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({searchParams}:
  {searchParams: Promise<{query?: string}>}
) {
  
  const query = (await searchParams).query; 
  const params = {search: query || null};
  // const posts = await client.fetch(STARTUPS_QUERY)
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})

  const session = await auth()

  return (
    <>
      <section className="pink_container" style={{background: "linear-gradient(to right, #eda597, #759b46)"}}>
        <h1 className="heading">Kompass</h1>
        <p className="sub-heading !max-w-3xl">
          Korean language classes for foreigners in Ansan
        </p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>

      </section>
      <SanityLive/>
    </>
  );
}
