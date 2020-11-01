import React from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createPlayer from "app/players/mutations/createPlayer"
import PlayerForm from "app/players/components/PlayerForm"

const NewPlayerPage: BlitzPage = () => {
  const router = useRouter()
  const [createPlayerMutation] = useMutation(createPlayer)

  return (
    <div>
      <h1>Create New Player</h1>

      <PlayerForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const player = await createPlayerMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(player))
            router.push("/players/[playerId]", `/players/${player.id}`)
          } catch (error) {
            alert("Error creating player " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/players">
          <a>Players</a>
        </Link>
      </p>
    </div>
  )
}

NewPlayerPage.getLayout = (page) => <Layout title={"Create New Player"}>{page}</Layout>

export default NewPlayerPage
