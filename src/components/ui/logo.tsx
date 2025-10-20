import React from 'react';
import {
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  TwitterIcon,
} from "@/icon/IconsAll";

type IconButtonProps = {
  href: string;
  children: React.ReactNode;
  bgClass?: string;
  textClass?: string;
  size?: string;
}

function IconButton({ href, children, bgClass, textClass, size }: IconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${size ?? ''} flex items-center justify-center rounded-full ${bgClass ?? ''} ${textClass ?? ''}`}
    >
      {children}
    </a>
  );
}

export function FooterIcons() {
  return (
    <div className="flex gap-3">
      <IconButton href="https://facebook.com">
        <FacebookIcon className="w-4 h-4" />
      </IconButton>
      <IconButton href="https://github.com">
        <GithubIcon className="w-4 h-4" />
      </IconButton>
      <IconButton href="https://google.com">
        <GoogleIcon className="w-4 h-4" />
      </IconButton>
      <IconButton href="https://twitter.com">
        <TwitterIcon className="w-4 h-4" />
      </IconButton>
    </div>
  );
}

