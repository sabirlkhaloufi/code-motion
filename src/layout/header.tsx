import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import {
  ChevronDownIcon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import logo from '@/assets/code-motion.png';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mainMenu } from '@/data/constant/menu';
import { cn } from '@/utils/tailwind';

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
      <div className="container flex h-14 items-center px-4 md:px-8">
        <NavLink to="/" className="mr-6 hidden items-center space-x-2 md:flex">
          <img src={logo} alt="logo" width={35} />
          <span className="inline-block font-bold">Code Motion</span>
          <Badge
            className="rounded-lg border-yellow-900 bg-yellow-500/20 px-1.5 text-yellow-600"
            variant="outline"
          >
            beta
          </Badge>
        </NavLink>
        <div className="mr-4 hidden flex-1 justify-center md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainMenu.map((menu, index) =>
              menu.items !== undefined ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger
                    className={cn(
                      'flex items-center py-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none',
                      menu.items
                        .filter((subitem) => subitem.to !== undefined)
                        .map((subitem) => subitem.to)
                        .includes(location.pathname)
                        ? 'text-foreground'
                        : 'text-foreground/60',
                    )}
                  >
                    {menu.title}
                    <ChevronDownIcon className="-mr-1 ml-1 h-3 w-3 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48"
                    align="start"
                    forceMount
                  >
                    {menu.items.map((subitem, subindex) =>
                      subitem.to !== undefined ? (
                        <NavLink key={subindex} to={subitem.to}>
                          <DropdownMenuItem
                            className={cn('hover:cursor-pointer', {
                              'bg-muted': subitem.to === location.pathname,
                            })}
                          >
                            {subitem.title}
                          </DropdownMenuItem>
                        </NavLink>
                      ) : subitem.label ? (
                        <DropdownMenuLabel key={subindex}>
                          {subitem.title}
                        </DropdownMenuLabel>
                      ) : (
                        <DropdownMenuSeparator key={subindex} />
                      ),
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavLink
                  key={index}
                  to={menu.to ?? ''}
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      isActive ? 'text-foreground' : 'text-foreground/60',
                    )
                  }
                >
                  {menu.title}
                </NavLink>
              ),
            )}
          </nav>
        </div>
        {/* mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <HamburgerMenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 sm:max-w-xs">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2"
            >
              <img src={logo} alt="logo" width={35} />
            </NavLink>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8 pl-8">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={
                  'item-' +
                  mainMenu.findIndex((item) =>
                    item.items !== undefined
                      ? item.items
                          .filter((subitem) => subitem.to !== undefined)
                          .map((subitem) => subitem.to)
                          .includes(location.pathname)
                      : false,
                  )
                }
              >
                <div className="flex flex-col space-y-3">
                  {mainMenu.map((menu, index) =>
                    menu.items !== undefined ? (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b-0 pr-6"
                      >
                        <AccordionTrigger
                          className={cn(
                            'py-1 hover:text-primary hover:no-underline [&[data-state=open]]:text-primary',
                            menu.items
                              .filter((subitem) => subitem.to !== undefined)
                              .map((subitem) => subitem.to)
                              .includes(location.pathname)
                              ? 'text-foreground'
                              : 'text-foreground/60',
                          )}
                        >
                          <div className="flex">{menu.title}</div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-1 pl-4">
                          <div className="mt-1">
                            {menu.items.map((submenu, subindex) =>
                              submenu.to !== undefined ? (
                                <NavLink
                                  key={subindex}
                                  to={submenu.to}
                                  onClick={() => setOpen(false)}
                                  className={({ isActive }) =>
                                    cn(
                                      'block h-auto justify-start py-1 font-normal hover:text-primary',
                                      isActive
                                        ? 'text-foreground'
                                        : 'text-foreground/60',
                                    )
                                  }
                                >
                                  {submenu.title}
                                </NavLink>
                              ) : submenu.label !== '' ? null : (
                                <div className="px-3">
                                  {/* <Separator /> */}
                                </div>
                              ),
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <NavLink
                        key={index}
                        to={menu.to ?? ''}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'py-1 text-sm font-medium transition-colors hover:text-primary',
                            isActive ? 'text-foreground' : 'text-foreground/60',
                          )
                        }
                      >
                        {menu.title}
                      </NavLink>
                    ),
                  )}
                </div>
              </Accordion>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <a href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <img src={logo} alt="logo" width={35} />
          <span className="inline-block font-bold">Code Motion</span>
          <Badge
            className="rounded-lg border-yellow-900 bg-yellow-500/20 px-1.5 text-yellow-600"
            variant="outline"
          >
            beta
          </Badge>
        </a>
        {/* right */}
        <div className="ml-auto flex items-center justify-between space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex items-center space-x-2">
            <a
              href="https://github.com/amasin76/code-motion"
              title="GitHub Repo"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0',
                )}
              >
                <GitHubLogoIcon className="h-full w-full" />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <button>
              <UserButton afterSignOutUrl="/" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
