import React from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createTeam from "app/teams/mutations/createTeam"
import TeamForm from "app/teams/components/TeamForm"

const NewTeamPage: BlitzPage = () => {
  const router = useRouter()
  const [createTeamMutation] = useMutation(createTeam)

  return (
    <div>
      <h1>Create New Team</h1>

      <TeamForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const team = await createTeamMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(team))
            router.push("/teams/[teamId]", `/teams/${team.id}`)
          } catch (error) {
            alert("Error creating team " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/teams">
          <a>Teams</a>
        </Link>
      </p>
    </div>
  )
}

NewTeamPage.getLayout = (page) => <Layout title={"Create New Team"}>{page}</Layout>

export default NewTeamPage
