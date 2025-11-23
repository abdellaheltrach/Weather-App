import { Card, CardContent } from "@/components/ui/card";

export function CurrentWeatherSkeleton() {
  return (
    <Card className="md:col-span-2 bg-linear-to-br from-blue-600 to-blue-800 border-none text-white shadow-2xl relative overflow-hidden">
      <CardContent className="p-8 relative z-10 flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 bg-blue-300/30 rounded-full animate-pulse"></div>
              <div className="w-32 h-4 bg-blue-300/30 rounded animate-pulse"></div>
            </div>
            <div className="w-24 h-3 bg-blue-300/30 rounded animate-pulse"></div>
          </div>
          <div className="w-12 h-6 bg-white/20 rounded-full backdrop-blur-sm animate-pulse"></div>
        </div>

        {/* Temperature & Icon Section */}
        <div className="flex items-center gap-6 my-8">
          <div className="w-24 h-24 bg-blue-300/30 rounded-full animate-pulse"></div>
          <div>
            <div className="w-32 h-16 bg-blue-300/30 rounded-lg animate-pulse mb-2"></div>
            <div className="w-24 h-5 bg-blue-300/30 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Weather Stats Grid */}
        <div className="grid grid-cols-3 gap-4 bg-black/10 rounded-xl p-4 backdrop-blur-sm">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-1 ${
                i === 2 ? "border-x border-white/10" : ""
              }`}
            >
              <div className="w-5 h-5 bg-blue-300/30 rounded-full animate-pulse"></div>
              <div className="w-16 h-4 bg-blue-300/30 rounded animate-pulse"></div>
              <div className="w-12 h-3 bg-blue-300/30 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
