import ArtworkDetail from '@/components/artwork/ArtworkDetail';

interface ArtworkPageProps {
  params: {
    id: string;
  };
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ArtworkDetail artworkId={params.id} />
    </div>
  );
} 