import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstTeamArgs } from "db"

type GetTeamInput = Pick<FindFirstTeamArgs, "where">

export default async function getTeam({ where }: GetTeamInput, ctx: Ctx) {
  ctx.session.authorize()

  const team = await db.team.findFirst({ where })

  if (!team) throw new NotFoundError()

  return team
}
