import React from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createLeague from "app/leagues/mutations/createLeague"
import LeagueForm from "app/leagues/components/LeagueForm"

const NewLeaguePage: BlitzPage = () => {
  const router = useRouter()
  const [createLeagueMutation] = useMutation(createLeague)

  return (
    <div>
      <h1>Create New League</h1>

      <LeagueForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const league = await createLeagueMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(league))
            router.push("/leagues/[leagueId]", `/leagues/${league.id}`)
          } catch (error) {
            alert("Error creating league " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/leagues">
          <a>Leagues</a>
        </Link>
      </p>
    </div>
  )
}

NewLeaguePage.getLayout = (page) => <Layout title={"Create New League"}>{page}</Layout>

export default NewLeaguePage
