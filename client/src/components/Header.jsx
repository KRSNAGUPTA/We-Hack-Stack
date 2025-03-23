import React from "react";
import { Dock, DockIcon } from "./magicui/dock";
import { Bot, File, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import QuizIcon from "@mui/icons-material/Quiz";
function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <Dock direction="middle">
        <DockIcon onClick={() => navigate("/")}>
          <Home className="text-indigo-700" />
        </DockIcon>
        <Separator orientation="vertical" />
        <DockIcon onClick={() => navigate("/case")}>
          <Search />
        </DockIcon>
        <Separator orientation="vertical" />
        <DockIcon onClick={() => navigate("/quiz")}>
          <QuizIcon />
        </DockIcon>
        <Separator orientation="vertical" />
        <DockIcon onClick={() => navigate("/chat")}>
          <Bot />
        </DockIcon>
      </Dock>
    </div>
  );
}

export default Header;
