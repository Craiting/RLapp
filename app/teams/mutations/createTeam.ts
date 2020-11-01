import { Ctx } from "blitz"
import db, { TeamCreateArgs } from "db"

type CreateTeamInput = Pick<TeamCreateArgs, "data">
export default async function createTeam({ data }: CreateTeamInput, ctx: Ctx) {
  ctx.session.authorize()

  const team = await db.team.create({ data })

  return team
}
