import UnderConstruction from '@/components/UnderConstruction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Under Construction - COSC',
  description: 'Canara Open Source Community website is currently under construction. Stay tuned!',
};

export default function UnderConstructionPage() {
  return (
    <UnderConstruction
      pageTitle="UNDER CONSTRUCTION"
      
    />
  );
}
