import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getLeagues from "app/leagues/queries/getLeagues"

const ITEMS_PER_PAGE = 100

export const LeaguesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ leagues, hasMore }] = usePaginatedQuery(getLeagues, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {leagues.map((league) => (
          <li key={league.id}>
            <Link href="/leagues/[leagueId]" as={`/leagues/${league.id}`}>
              <a>{league.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const LeaguesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/leagues/new">
          <a>Create League</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <LeaguesList />
      </Suspense>
    </div>
  )
}

LeaguesPage.getLayout = (page) => <Layout title={"Leagues"}>{page}</Layout>

export default LeaguesPage
