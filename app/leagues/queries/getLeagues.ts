import { Ctx } from "blitz"
import db, { FindManyLeagueArgs } from "db"

type GetLeaguesInput = Pick<FindManyLeagueArgs, "where" | "orderBy" | "skip" | "take">

export default async function getLeagues(
  { where, orderBy, skip = 0, take }: GetLeaguesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const leagues = await db.league.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.league.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    leagues,
    nextPage,
    hasMore,
    count,
  }
}
