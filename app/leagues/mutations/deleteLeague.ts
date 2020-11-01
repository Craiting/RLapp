import { Ctx } from "blitz"
import db, { LeagueDeleteArgs } from "db"

type DeleteLeagueInput = Pick<LeagueDeleteArgs, "where">

export default async function deleteLeague({ where }: DeleteLeagueInput, ctx: Ctx) {
  ctx.session.authorize()

  const league = await db.league.delete({ where })

  return league
}
