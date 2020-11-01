import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getTeam from "app/teams/queries/getTeam"
import updateTeam from "app/teams/mutations/updateTeam"
import TeamForm from "app/teams/components/TeamForm"

export const EditTeam = () => {
  const router = useRouter()
  const teamId = useParam("teamId", "number")
  const [team, { setQueryData }] = useQuery(getTeam, { where: { id: teamId } })
  const [updateTeamMutation] = useMutation(updateTeam)

  return (
    <div>
      <h1>Edit Team {team.id}</h1>
      <pre>{JSON.stringify(team)}</pre>

      <TeamForm
        initialValues={team}
        onSubmit={async () => {
          try {
            const updated = await updateTeamMutation({
              where: { id: team.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/teams/[teamId]", `/teams/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating team " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditTeamPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTeam />
      </Suspense>

      <p>
        <Link href="/teams">
          <a>Teams</a>
        </Link>
      </p>
    </div>
  )
}

EditTeamPage.getLayout = (page) => <Layout title={"Edit Team"}>{page}</Layout>

export default EditTeamPage
