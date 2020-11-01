import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getTeam from "app/teams/queries/getTeam"
import deleteTeam from "app/teams/mutations/deleteTeam"
import getPlayers from "app/players/queries/getPlayers"

export const Team = () => {
  const router = useRouter()
  const teamId = useParam("teamId", "number")
  const [team] = useQuery(getTeam, { where: { id: teamId } })
  const [playerQuery] = useQuery(getPlayers, { where: { teamId: teamId } })
  const [deleteTeamMutation] = useMutation(deleteTeam)

  return (
    <div>
      <h1>{team.name}</h1>
      <pre>{JSON.stringify(team, null, 2)}</pre>
      <h2>Players</h2>
      {playerQuery.players.map((player) => {
        return <p>{player.name}</p>
      })}

      <Link href="/teams/[teamId]/edit" as={`/teams/${team.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteTeamMutation({ where: { id: team.id } })
            router.push("/teams")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowTeamPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/teams">
          <a>Teams</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Team />
      </Suspense>
    </div>
  )
}

ShowTeamPage.getLayout = (page) => <Layout title={"Team"}>{page}</Layout>

export default ShowTeamPage
