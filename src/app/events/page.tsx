import UnderConstruction from '@/components/UnderConstruction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | Under Construction - COSC',
  description: 'COSC Events page is currently under construction. Exciting meetups and hackathons coming soon!',
};

export default function EventsPage() {
  return (
    <UnderConstruction
      pageTitle="UNDER CONSTRUCTION"
    />
  );
}
