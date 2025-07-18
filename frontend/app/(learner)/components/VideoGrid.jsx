import VideoCard from '@/components/profile/VideoCard';
import thumb from "@/public/logo.png";

const VideoGrid = ({ videos }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
            margin: "2rem"
        }}
    >
        {videos.map((video) => (
            <div key={video.id} style={{ cursor: 'pointer' }}>
                <VideoCard {...video} logo={thumb} />
            </div>
        ))}
    </div>
);

export default VideoGrid;