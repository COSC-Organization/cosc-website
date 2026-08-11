import UnderConstruction from '@/components/UnderConstruction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workshops | Under Construction - COSC',
  description: 'COSC Workshops page is currently under construction. Hands-on workshops coming soon!',
};

export default function WorkshopsPage() {
  return (
    <UnderConstruction
      pageTitle="UNDER CONSTRUCTION"
    />
  );
}
