import { useCtfStore } from "@/stores/ctf";
import { Link } from "@tanstack/react-router";

export function Nav() {
  const ctf = useCtfStore();

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <img src="/logo.jpeg" alt="CTF Logo" width={16} height={16} />
        <span className="font-bold inline-block">{ctf.name}</span>\
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          to="/challenges"
          className={"text-foreground/60 transition-colors hover:text-foreground/80"}
        >
          Challenges
        </Link>
        <Link
          to="/scoreboard/team"
          className={"text-foreground/60 transition-colors hover:text-foreground/80"}
        >
          Scoreboard
        </Link>
        <Link
          to="/rules"
          className={"text-foreground/60 transition-colors hover:text-foreground/80"}
        >
          Rules
        </Link>
      </nav>
    </div>
  );
}
