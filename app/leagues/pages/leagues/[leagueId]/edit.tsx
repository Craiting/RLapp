import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getLeague from "app/leagues/queries/getLeague"
import updateLeague from "app/leagues/mutations/updateLeague"
import LeagueForm from "app/leagues/components/LeagueForm"

export const EditLeague = () => {
  const router = useRouter()
  const leagueId = useParam("leagueId", "number")
  const [league, { setQueryData }] = useQuery(getLeague, { where: { id: leagueId } })
  const [updateLeagueMutation] = useMutation(updateLeague)

  return (
    <div>
      <h1>Edit League {league.id}</h1>
      <pre>{JSON.stringify(league)}</pre>

      <LeagueForm
        initialValues={league}
        onSubmit={async () => {
          try {
            const updated = await updateLeagueMutation({
              where: { id: league.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/leagues/[leagueId]", `/leagues/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating league " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditLeaguePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditLeague />
      </Suspense>

      <p>
        <Link href="/leagues">
          <a>Leagues</a>
        </Link>
      </p>
    </div>
  )
}

EditLeaguePage.getLayout = (page) => <Layout title={"Edit League"}>{page}</Layout>

export default EditLeaguePage
