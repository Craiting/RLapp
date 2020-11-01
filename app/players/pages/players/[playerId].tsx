import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getPlayer from "app/players/queries/getPlayer"
import deletePlayer from "app/players/mutations/deletePlayer"

export const Player = () => {
  const router = useRouter()
  const playerId = useParam("playerId", "number")
  const [player] = useQuery(getPlayer, { where: { id: playerId } })
  const [deletePlayerMutation] = useMutation(deletePlayer)

  return (
    <div>
      <h1>Player {player.id}</h1>
      <pre>{JSON.stringify(player, null, 2)}</pre>

      <Link href="/players/[playerId]/edit" as={`/players/${player.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deletePlayerMutation({ where: { id: player.id } })
            router.push("/players")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowPlayerPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/players">
          <a>Players</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Player />
      </Suspense>
    </div>
  )
}

ShowPlayerPage.getLayout = (page) => <Layout title={"Player"}>{page}</Layout>

export default ShowPlayerPage
