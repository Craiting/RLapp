import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getPlayers from "app/players/queries/getPlayers"

const ITEMS_PER_PAGE = 100

export const PlayersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ players, hasMore }] = usePaginatedQuery(getPlayers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <Link href="/players/[playerId]" as={`/players/${player.id}`}>
              <a>{player.name}</a>
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

const PlayersPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/players/new">
          <a>Create Player</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PlayersList />
      </Suspense>
    </div>
  )
}

PlayersPage.getLayout = (page) => <Layout title={"Players"}>{page}</Layout>

export default PlayersPage
