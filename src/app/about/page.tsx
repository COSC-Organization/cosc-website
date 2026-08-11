import UnderConstruction from '@/components/UnderConstruction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Under Construction - COSC',
  description: 'Canara Open Source Community About page is currently under construction. Stay tuned!',
};

export default function AboutPage() {
  return (
    <UnderConstruction
      pageTitle="UNDER CONSTRUCTION"
    />
  );
}
