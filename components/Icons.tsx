type IconName = "menu" | "close" | "arrow" | "pin" | "book" | "people" | "whatsapp" | "sound" | "stop" | "heart" | "filter" | "search" | "check";

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    arrow: <><path d="M4 12h15M14 7l5 5-5 5" /></>,
    pin: <><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
    book: <><path d="M4 5.5c3-1 5.7-.7 8 1v13c-2.3-1.7-5-2-8-1V5.5ZM20 5.5c-3-1-5.7-.7-8 1v13c2.3-1.7 5-2 8-1V5.5Z" /></>,
    people: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19v-1.2A5.5 5.5 0 0 1 9 12.3a5.5 5.5 0 0 1 5.5 5.5V19M16 5.5a3 3 0 0 1 0 5.8M16.5 13a5 5 0 0 1 4 4.8V19"/></>,
    whatsapp: <><path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z"/><path d="M9 8.1c.3-.2.6-.2.8.2l.8 1.4c.1.2 0 .5-.3.8l-.4.4c.5 1.1 1.3 1.9 2.4 2.4l.5-.5c.2-.2.4-.2.7-.1l1.4.7c.3.2.4.5.2.8-.3.7-1 1-1.7 1-2.3-.3-5.3-3.1-5.6-5.4-.1-.7.4-1.4 1.2-1.7Z"/></>,
    sound: <><path d="M4 10v4h4l4 3V7l-4 3H4ZM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></>,
    stop: <><path d="M8 8h8v8H8z"/></>,
    heart: <><path d="M20 8.8c0 4.2-8 9.1-8 9.1S4 13 4 8.8a4 4 0 0 1 7-2.6l1 1.1 1-1.1a4 4 0 0 1 7 2.6Z"/></>,
    filter: <><path d="M4 6h16M7 12h10M10 18h4"/></>,
    search: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4 4"/></>,
    check: <><path d="m5 12 4.5 4.5L19 7"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
