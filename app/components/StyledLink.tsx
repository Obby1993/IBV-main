// components/StyledLink.tsx
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface StyledLinkProps {
  href: string;
  className: string;
  children: ReactNode;
}

const StyledLink: FC<StyledLinkProps> = ({ href, children, className }) => {
  return (
    <Link href={href} className={className}>
      <button className="btn btn-outline btn-warning font-emoji cursor-none  ">{children}</button> {/* Vous pouvez changer les classes CSS selon vos besoins */}
    </Link>
  );
};

export default StyledLink;
