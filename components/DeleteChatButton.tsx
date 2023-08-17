import { HiOutlineDotsVertical } from "react-icons/hi";
import { CgTrash } from "react-icons/cg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DeleteChatButton = ({ setChat }: any) => {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="text-lg">
          <HiOutlineDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div
          onClick={() => {
            toast({
              description: "Your Chat Deleted Successfully.",
            });
          }}
        >
          <Button
            variant="secondary"
            className="flex items-center py-1 hover:bg-red-600 hover:text-white"
            onClick={() => setChat([])}
          >
            <CgTrash className="text-lg mr-1" />
            <span>Delete Chat</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteChatButton;
