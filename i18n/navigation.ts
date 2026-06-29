import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Link/router yang locale-aware (otomatis menambah /id bila perlu).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
