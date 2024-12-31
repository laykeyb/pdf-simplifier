"use client";

import { FaUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <IoExitOutline className="h-4 w-4 mr-2"/>
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <Link href="/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
        <Link href="/upgrade"><DropdownMenuItem>Upgrade</DropdownMenuItem></Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
