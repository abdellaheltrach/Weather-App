import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ForecastListSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-400/30 rounded-full animate-pulse"></div>
            <div className="w-24 h-5 bg-slate-300/30 rounded animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5"
            >
              {/* Day name */}
              <div className="w-16 h-4 bg-slate-300/30 rounded animate-pulse"></div>

              {/* Icon & label */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-400/30 rounded-full animate-pulse"></div>
                <div className="w-16 h-3 bg-slate-400/30 rounded animate-pulse"></div>
              </div>

              {/* Temperatures */}
              <div className="flex gap-2">
                <div className="w-8 h-4 bg-white/30 rounded animate-pulse"></div>
                <div className="w-8 h-4 bg-slate-500/30 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
