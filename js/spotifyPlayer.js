document.addEventListener('DOMContentLoaded', function() {
    const spotifyPlayerContainer = document.getElementById('spotify-player-container');

    const iframe = document.createElement('iframe');
    iframe.src = localStorage.getItem('spotifyPlayerState') || 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?autoplay=true'; // TikTok Viral - December playlist
    iframe.width = '100%';
    iframe.height = '380';
    iframe.frameBorder = '0';
    iframe.allow = 'encrypted-media';

    spotifyPlayerContainer.appendChild(iframe);

    window.addEventListener('beforeunload', function() {
        localStorage.setItem('spotifyPlayerState', iframe.src);
    });

    // Ensure Spotify player continues playing in the background
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            iframe.src = localStorage.getItem('spotifyPlayerState') || iframe.src;
        }
    });
});