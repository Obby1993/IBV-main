// components/StyledLink.tsx
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface StyledLinkProps {
  href: string;
  children: ReactNode;
}

const StyledLink: FC<StyledLinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <button className="btn btn-outline btn-warning font-emoji mr-6">{children}</button> {/* Vous pouvez changer les classes CSS selon vos besoins */}
    </Link>
  );
};

export default StyledLink;
