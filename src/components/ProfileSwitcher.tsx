import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ChevronDown, User } from "lucide-react";

const PROFILE_CONFIGS = [
  { role: 'RH', email: 'rh@example.com', password: 'rh123456', color: 'bg-blue-600' },
  { role: 'Buddy', email: 'buddy@example.com', password: 'buddy123456', color: 'bg-green-600' },
  { role: 'Onboardee', email: 'onboardee@example.com', password: 'onboardee123456', color: 'bg-purple-600' },
];

export function ProfileSwitcher() {
  const { profile, signOut, signIn } = useAuth();

  if (!profile) {
    return null;
  }

  const handleSwitchProfile = (email: string, password: string) => {
    signOut();
    setTimeout(() => {
      signIn(email, password);
    }, 100);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const currentConfig = PROFILE_CONFIGS.find(c => c.role === profile.role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 h-10"
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              {getInitials(profile.name || 'User')}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline-block text-sm font-medium max-w-[120px] truncate">
            {profile.role}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem disabled>
          <div className="flex flex-col gap-1 w-full">
            <p className="font-medium text-sm">{profile.name}</p>
            <p className="text-xs text-muted-foreground">{profile.email}</p>
            <p className="text-xs font-semibold text-primary mt-1">{profile.role}</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs">Mudar Perfil</DropdownMenuLabel>

        {PROFILE_CONFIGS.filter((config) => config.role !== profile.role).map((config) => (
          <DropdownMenuItem
            key={config.role}
            onClick={() => handleSwitchProfile(config.email, config.password)}
          >
            <span>{config.role}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
