import { Star } from "lucide-react"
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
        <CardTitle className="font-medium hover:underline">
          <a href={repo.url} target="_blank">
            <span>{repo.owner}</span>/
            <span className="font-bold">{repo.name}</span>
          </a>
        </CardTitle>
        <CardDescription>{repo.description}</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="my-2 flex flex-wrap gap-2">
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
      <CardFooter>
        <div className="flex items-center gap-2">
          <Star size={16} />
          <span className="text-lg font-medium">{repo.stars}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
