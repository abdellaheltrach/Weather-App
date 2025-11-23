import { Cloud, Languages, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const { t, i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 relative z-50">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-500 rounded-lg">
          <Cloud className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-br from-blue-400 to-blue-200">
          {t("title")}
        </h1>
      </div>

      <div className="flex w-full md:w-auto gap-2 items-center">
        {children}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/30 bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/50 cursor-pointer gap-2 min-w-[100px] transition-all duration-300"
            >
              <Languages className="w-4 h-4" />
              <span>{i18n.language === "en" ? "English" : "العربية"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-slate-900/95 border-slate-700 text-white backdrop-blur-md z-50"
          >
            <DropdownMenuItem
              onClick={() => changeLang("en")}
              className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white flex justify-between items-center"
            >
              <span>English</span>
              {i18n.language === "en" && (
                <Check className="w-4 h-4 text-blue-400" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLang("ar")}
              className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white flex justify-between items-center"
            >
              <span>العربية</span>
              {i18n.language === "ar" && (
                <Check className="w-4 h-4 text-blue-400" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
