import { Ctx } from "blitz"
import db, { LeagueCreateArgs } from "db"

type CreateLeagueInput = Pick<LeagueCreateArgs, "data">
export default async function createLeague({ data }: CreateLeagueInput, ctx: Ctx) {
  ctx.session.authorize()

  const league = await db.league.create({ data })

  return league
}
