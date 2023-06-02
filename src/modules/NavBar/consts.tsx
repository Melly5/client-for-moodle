import {
  MagnifyingGlassIcon,
  ChatBubbleLeftIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const navigationIcons = [
  {
    name: "Поиск",
    icon: <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />,
    href: "/",
  },
  {
    name: "Сообщения",
    icon: <ChatBubbleLeftIcon className="h-6 w-6" aria-hidden="true" />,
    href: "/",
  },
  {
    name: "Уведомления",
    icon: <BellIcon className="h-6 w-6" aria-hidden="true" />,
    href: "/",
  },
];

export const icons = [
  {
    name: "Открыть меню",
    icon: <Bars3Icon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    name: "Закрыть меню",
    icon: <XMarkIcon className="h-6 w-6" aria-hidden="true" />,
  },
];
