import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../App.css'
    const VideoList = () => {
        const [videos, setVideos] = useState([]);
        const [page, setPage] = useState(1);
        const [hasMore, setHasMore] = useState(true);

            const fetchVideos = async () => {
                try {
                const response = await fetch(
                    `https://pixabay.com/api/videos/?key=45439854-9437c62e4f56e197f55bf3786&page=${page}&per_page=5`
                );
                const data = await response.json();
                if (data.hits.length === 0) {
                    setHasMore(false);
                }
                setVideos((prevVideos) => [...prevVideos, ...data.hits]);
                } catch (error) {
                console.error('Error fetching videos:', error);
                }
            };

                useEffect(() => {
                    fetchVideos();
                }, [page]);
                
                const fetchMoreVideos = () => {
                    setPage((prevPage) => prevPage + 1);
                };

    return (
        <div className="video-list">
            <InfiniteScroll
            dataLength={videos.length}
            next={fetchMoreVideos}
            hasMore={hasMore}
            loader={<p>Loading...</p>}
            endMessage={<p>No more videos to load</p>}
            >
            {videos.map((video) => (
                <div key={video.id} className="video-container">
                <video width="320" height="240" controls>
                    <source src={video.videos.tiny.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* <p>{video.tags}</p> */}
                </div>
            ))}
            </InfiniteScroll>
        </div>
    );
    };

export default VideoList;