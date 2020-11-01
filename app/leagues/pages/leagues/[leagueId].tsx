import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getLeague from "app/leagues/queries/getLeague"
import getTeams from "app/teams/queries/getTeams"
import deleteLeague from "app/leagues/mutations/deleteLeague"

export const League = () => {
  const router = useRouter()
  const leagueId = useParam("leagueId", "number")
  const [league] = useQuery(getLeague, { where: { id: leagueId } })
  const [teams] = useQuery(getTeams, { where: { leagueId: leagueId } })
  const [deleteLeagueMutation] = useMutation(deleteLeague)

  return (
    <div>
      <h1>{league.name}</h1>
      <pre>{JSON.stringify(league, null, 2)}</pre>

      <Link href="/leagues/[leagueId]/edit" as={`/leagues/${league.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteLeagueMutation({ where: { id: league.id } })
            router.push("/leagues")
          }
        }}
      >
        Delete
      </button>
      <h1>Teams</h1>
      {teams.teams.map((team) => {
        return (
          <p>
            <Link href={`/teams/${team.id}`}>{team.name}</Link>
          </p>
        )
      })}
    </div>
  )
}

const ShowLeaguePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/leagues">
          <a>Leagues</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <League />
      </Suspense>
    </div>
  )
}

ShowLeaguePage.getLayout = (page) => <Layout title={"League"}>{page}</Layout>

export default ShowLeaguePage
