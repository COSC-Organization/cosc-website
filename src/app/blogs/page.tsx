import UnderConstruction from '@/components/UnderConstruction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs | Under Construction - COSC',
  description: 'COSC Blogs page is currently under construction. Stay tuned for exciting articles and tutorials!',
};

export default function BlogsPage() {
  return (
    <UnderConstruction
      pageTitle="UNDER CONSTRUCTION"
    />
  );
}
