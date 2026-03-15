import { GitFork, Star } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import type { TRepo } from "@/types/TRepo"
import { Badge } from "./ui/badge"

export default function RepoCard({ repo }: { repo: TRepo }) {
  const primaryLang =
    repo.language && repo.language.length !== 0 ? repo.language : null

  const badges = [primaryLang, ...repo.topics]

  return (
    <Card className="h-full transition-shadow hover:shadow-xl">
      <CardHeader>
        <CardTitle className="line-clamp-1 font-medium hover:underline">
          <a href={repo.url} target="_blank">
            <span>{repo.owner}</span>/
            <span className="font-bold">{repo.name}</span>
          </a>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {repo.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-5 whitespace-nowrap">
          {badges.map(
            (badge, i) =>
              badge && (
                <Badge
                  key={`${badge}-${i}`}
                  variant={i === 0 ? "default" : "outline"}
                >
                  {badge}
                </Badge>
              )
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <div className="flex items-center gap-1 rounded-2xl px-2 outline">
          <Star size={16} />
          <span className="text-lg font-medium">{repo.stars}</span>
        </div>
        <div className="flex items-center gap-1 rounded-2xl px-2 outline">
          <GitFork size={16} />
          <span className="text-lg font-medium">{repo.forks}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
