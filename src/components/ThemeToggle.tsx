import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeContext } from "@/components/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const getIcon = () => {
    return theme === "light" ? (
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    ) : (
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="w-9 px-0" 
      onClick={toggleTheme}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
