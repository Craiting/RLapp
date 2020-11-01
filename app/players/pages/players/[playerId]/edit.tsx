import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getPlayer from "app/players/queries/getPlayer"
import updatePlayer from "app/players/mutations/updatePlayer"
import PlayerForm from "app/players/components/PlayerForm"

export const EditPlayer = () => {
  const router = useRouter()
  const playerId = useParam("playerId", "number")
  const [player, { setQueryData }] = useQuery(getPlayer, { where: { id: playerId } })
  const [updatePlayerMutation] = useMutation(updatePlayer)

  return (
    <div>
      <h1>Edit Player {player.id}</h1>
      <pre>{JSON.stringify(player)}</pre>

      <PlayerForm
        initialValues={player}
        onSubmit={async () => {
          try {
            const updated = await updatePlayerMutation({
              where: { id: player.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/players/[playerId]", `/players/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating player " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditPlayerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPlayer />
      </Suspense>

      <p>
        <Link href="/players">
          <a>Players</a>
        </Link>
      </p>
    </div>
  )
}

EditPlayerPage.getLayout = (page) => <Layout title={"Edit Player"}>{page}</Layout>

export default EditPlayerPage
