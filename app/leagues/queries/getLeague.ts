import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstLeagueArgs } from "db"

type GetLeagueInput = Pick<FindFirstLeagueArgs, "where">

export default async function getLeague({ where }: GetLeagueInput, ctx: Ctx) {
  ctx.session.authorize()

  const league = await db.league.findFirst({ where })

  if (!league) throw new NotFoundError()

  return league
}
