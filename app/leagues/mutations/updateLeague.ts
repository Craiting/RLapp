import { Ctx } from "blitz"
import db, { LeagueUpdateArgs } from "db"

type UpdateLeagueInput = Pick<LeagueUpdateArgs, "where" | "data">

export default async function updateLeague({ where, data }: UpdateLeagueInput, ctx: Ctx) {
  ctx.session.authorize()

  const league = await db.league.update({ where, data })

  return league
}
