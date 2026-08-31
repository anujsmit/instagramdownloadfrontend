
import React, { useEffect, useState } from "react";
import "./css/Home.css";
import ads1 from "../assets/ads1.png"
import ads2 from "../assets/ads2.png"
function Home() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoSize, setVideoSize] = useState("");
    const [showResult, setShowResult] = useState(false);

    const API_URL = "https://apiinsta.anujkattel.com.np/";

    useEffect(() => {
        document.title =
            "Download Instagram Reels & Videos Online Free | Instagram Downloader";

        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [videoUrl]);

    const isInstagramUrl = (value) => {
        try {
            const parsed = new URL(value);

            const host = parsed.hostname
                .toLowerCase()
                .replace(/^www\./, "");

            return (
                (host === "instagram.com" || host === "instagram.co") &&
                /^\/(reel|reels|p|tv)\//i.test(parsed.pathname)
            );
        } catch {
            return false;
        }
    };

    const downloadVideo = async (instagramUrl) => {
        if (loading) return;

        setLoading(true);
        setError("");
        setShowResult(false);

        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
            setVideoUrl(null);
        }

        try {
            const response = await fetch(
                `${API_URL}/api/instagram/download/video`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        url: instagramUrl,
                    }),
                }
            );

            if (!response.ok) {
                let message = `Download failed (${response.status})`;

                try {
                    const data = await response.json();

                    if (data.error) {
                        message = data.error;
                    }

                    if (data.message) {
                        message = data.message;
                    }
                } catch {
                    // Ignore JSON parsing errors
                }

                throw new Error(message);
            }

            const blob = await response.blob();

            if (!blob || blob.size === 0) {
                throw new Error("The server returned an empty video.");
            }

            const objectUrl = URL.createObjectURL(blob);

            setVideoUrl(objectUrl);
            setVideoSize(
                `${(blob.size / 1024 / 1024).toFixed(2)} MB • Video + Audio Ready`
            );

            setShowResult(true);

            setTimeout(() => {
                document
                    .getElementById("resultCard")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
            }, 100);
        } catch (err) {
            console.error("Download error:", err);

            setError(
                err.message ||
                "Something went wrong while downloading. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        setError("");

        const trimmedUrl = url.trim();

        if (!trimmedUrl) {
            setError("Please paste an Instagram URL.");
            return;
        }

        if (!isInstagramUrl(trimmedUrl)) {
            setError("Please enter a valid Instagram Reel or video URL.");
            return;
        }

        downloadVideo(trimmedUrl);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleDownload();
        }
    };

    return (
        <div className="page">
            <main>
                {/* HERO */}
                <section className="hero">

                    <h1>
                        Download Instagram <br />
                        <span>Videos & Reels</span>
                    </h1>

                    <p className="subtitle">
                        The fastest and most reliable Instagram video downloader. Paste
                        any public Instagram Reel or video URL below and save it to your
                        device instantly.
                    </p>

                    <div className="download-shell">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Paste Instagram video or reel URL…"
                            autoComplete="off"
                            inputMode="url"
                        />

                        <button
                            className="download-btn"
                            type="button"
                            onClick={handleDownload}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loader"></span>
                            ) : (
                                <span>Download</span>
                            )}
                        </button>
                    </div>

                    {error && <p className="error">{error}</p>}

                    <div
                        className="trust-row"
                        aria-label="Downloader features"
                    >
                        <span>✓ No registration</span>
                        <span>✓ Mobile friendly</span>
                        <span>✓ High quality</span>
                        <span>✓ Free forever</span>
                    </div>
                </section>

                {/* MAIN CONTENT */}
                <div className="two-col">
                    <div className="main-col">
                        {/* RESULT CARD */}
                        {showResult && videoUrl && (
                            <section id="resultCard" className="result">
                                <div className="result-head">
                                    <h2>Your Video is Ready</h2>

                                    <span className="ready">✓ READY</span>
                                </div>

                                <div className="video-box">
                                    <video
                                        src={videoUrl}
                                        controls
                                        playsInline
                                        preload="metadata"
                                    />
                                </div>

                                <div className="video-info">
                                    <h3>Instagram Video Download</h3>
                                    <p>{videoSize}</p>
                                </div>

                                <a
                                    className="save-btn"
                                    href={videoUrl}
                                    download={`instagram-video-${Date.now()}.mp4`}
                                >
                                    ⬇ Download Video
                                </a>
                            </section>
                        )}

                        {/* HOSTINGER AD */}
                        <a
                            href="https://www.hostinger.com/pricing?REFERRALCODE=AT0ANUJKA2XJ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hostinger-fallback"
                        >
                            <img
                                src={ads1}
                                alt="Hostinger advertisement"
                            />
                        </a>

                        {/* SEO BLOG */}
                        <section className="seo-blog">
                            <div className="blog-header">
                                <span className="blog-eyebrow">
                                    INSTAGRAM DOWNLOADER GUIDE
                                </span>

                                <h2>Online Instagram Downloader</h2>

                                <p>
                                    Download Instagram Reels and videos online quickly,
                                    easily, and for free. No app or registration required.
                                </p>
                            </div>

                            <article className="blog-content">
                                <h2>Download Instagram Videos & Reels Online</h2>

                                <p>
                                    <strong>Instagram Video Downloader</strong> is a simple
                                    online tool that helps you download publicly available
                                    Instagram videos and Reels directly to your device. You
                                    don't need to install an application or browser extension.
                                </p>

                                <p>
                                    Simply copy an Instagram video or Reel link, paste it into
                                    the downloader above, and start your download. Our Instagram
                                    downloader is designed to work across modern devices and
                                    browsers, including Android phones, iPhones, tablets,
                                    Windows PCs, Macs, and Linux computers.
                                </p>

                                {/* AD */}
                                <div className="inline-ad">
                                    <div className="inline-ad-label">
                                        — Sponsored —
                                    </div>

                                    <div className="inline-ad-slot">
                                        <iframe
                                            src="//www.highperformanceformat.com/e1c6887f4d314058fcfd928312cfe9fe"
                                            width="728"
                                            height="90"
                                            style={{
                                                border: 0,
                                                maxWidth: "100%",
                                            }}
                                            title="Advertisement"
                                        />
                                    </div>
                                </div>

                                <div className="blog-highlight">
                                    <div className="blog-highlight-icon">
                                        📥
                                    </div>

                                    <div>
                                        <h3>Simple Instagram Video Downloads</h3>

                                        <p>
                                            Copy the public Instagram Reel or video URL, paste it
                                            above, and download the available video directly to
                                            your device.
                                        </p>
                                    </div>
                                </div>

                                <h2>
                                    What is an Instagram Video Downloader?
                                </h2>

                                <p>
                                    An Instagram video downloader is an online service that
                                    allows users to save publicly available Instagram videos
                                    and Reels for offline viewing.
                                </p>

                                <p>
                                    Instead of recording your screen or installing additional
                                    software, you can use a web browser to process the URL and
                                    download the available video.
                                </p>

                                <p>
                                    <strong>instagram.anujkattel.com.np</strong> focuses on
                                    keeping the downloading process simple. There is no
                                    complicated setup: paste a valid Instagram URL into the
                                    input field and click the Download button.
                                </p>

                                {/* AD */}
                                <div className="inline-ad">
                                    <div className="inline-ad-label">
                                        — Sponsored —
                                    </div>

                                    <div className="inline-ad-slot">
                                        <iframe
                                            src="//www.highperformanceformat.com/d17ae82179681e09d8bd366e96a5c92b"
                                            width="300"
                                            height="250"
                                            style={{
                                                border: 0,
                                                maxWidth: "100%",
                                            }}
                                            title="Advertisement"
                                        />
                                    </div>
                                </div>

                                <h2>Why Use Our Instagram Downloader?</h2>

                                <p>
                                    There are many Instagram download tools available online,
                                    but they can sometimes be difficult to use, overloaded
                                    with unnecessary steps, or require software installations.
                                </p>

                                <p>
                                    Our goal is to provide a clean, lightweight, and
                                    mobile-friendly experience.
                                </p>

                                <ul className="blog-list">
                                    <li>
                                        <strong>Easy to use:</strong> Paste an Instagram URL and
                                        start the download process.
                                    </li>

                                    <li>
                                        <strong>No registration:</strong> You don't need to
                                        create an account before using the downloader.
                                    </li>

                                    <li>
                                        <strong>Works in your browser:</strong> No additional
                                        desktop software or browser extension is required.
                                    </li>

                                    <li>
                                        <strong>Mobile friendly:</strong> Use the downloader
                                        from Android, iPhone, tablet, or computer.
                                    </li>

                                    <li>
                                        <strong>Fast processing:</strong> The service is designed
                                        to make the downloading process quick and straightforward.
                                    </li>

                                    <li>
                                        <strong>Free to use:</strong> You can use the basic
                                        Instagram video downloading functionality without a paid
                                        subscription.
                                    </li>
                                </ul>

                                {/* AD */}
                                <div className="inline-ad">
                                    <div className="inline-ad-label">
                                        — Sponsored —
                                    </div>

                                    <div className="inline-ad-slot">
                                        <iframe
                                            src="//www.highperformanceformat.com/6b6efee01e32941daf411ef490d5ab0c"
                                            width="320"
                                            height="50"
                                            style={{
                                                border: 0,
                                                maxWidth: "100%",
                                            }}
                                            title="Advertisement"
                                        />
                                    </div>
                                </div>

                                <h2>Supported Instagram Content</h2>

                                <p>
                                    Our downloader is primarily designed for publicly
                                    accessible Instagram video content.
                                </p>

                                <p>
                                    Depending on what Instagram makes available through the
                                    supplied URL, supported content can include:
                                </p>

                                <div className="content-tags">
                                    <span>Instagram Reels</span>
                                    <span>Instagram Videos</span>
                                    <span>Public Posts</span>
                                    <span>Video Posts</span>
                                </div>

                                <p>
                                    Private accounts and content that is not publicly accessible
                                    cannot be downloaded through this service. You should only
                                    download content when you have the necessary permission or
                                    rights to do so.
                                </p>

                                {/* AD */}
                                <div className="inline-ad">
                                    <div className="inline-ad-label">
                                        — Sponsored —
                                    </div>

                                    <div className="inline-ad-slot">
                                        <iframe
                                            src="//www.highperformanceformat.com/6ddbb78bf5064f6ab92b570c70ae05fc"
                                            width="468"
                                            height="60"
                                            style={{
                                                border: 0,
                                                maxWidth: "100%",
                                            }}
                                            title="Advertisement"
                                        />
                                    </div>
                                </div>

                                <h2>
                                    How to Download Instagram Reels and Videos?
                                </h2>

                                <div className="steps-grid">
                                    <div className="blog-step">
                                        <span>01</span>

                                        <div>
                                            <h3>Copy the Instagram Link</h3>

                                            <p>
                                                Open Instagram and navigate to the public Reel or
                                                video you want to save. Use Instagram's share options
                                                to copy its link.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="blog-step">
                                        <span>02</span>

                                        <div>
                                            <h3>Paste the URL</h3>

                                            <p>
                                                Return to this website and paste the Instagram URL
                                                into the downloader input field at the top of the
                                                page.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="blog-step">
                                        <span>03</span>

                                        <div>
                                            <h3>Click Download</h3>

                                            <p>
                                                Click the Download button and wait while the server
                                                processes the public Instagram video URL.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="blog-step">
                                        <span>04</span>

                                        <div>
                                            <h3>Save Your Video</h3>

                                            <p>
                                                When the video is ready, preview it and use the
                                                Download Video button to save it to your device.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* HOSTINGER SIDEBAR/BANNER */}
                                <a
                                    href="https://www.hostinger.com/pricing?REFERRALCODE=AT0ANUJKA2XJ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={ads2}
                                        alt="Hostinger advertisement"
                                        width="100%"
                                    />
                                </a>

                                <h2>
                                    Can I Use the Instagram Downloader on Mobile?
                                </h2>

                                <p>
                                    Yes. The website is designed to be responsive and can be
                                    used from modern mobile browsers.
                                </p>

                                <p>
                                    You can use it on Android and iPhone devices without
                                    installing a separate application.
                                </p>

                                <p>
                                    Simply open your browser, visit{" "}
                                    <strong>instagram.anujkattel.com.np</strong>, copy the
                                    Instagram video or Reel URL, paste it into the downloader,
                                    and follow the download steps.
                                </p>

                                {/* AD */}
                                <div className="inline-ad">
                                    <div className="inline-ad-label">
                                        — Sponsored —
                                    </div>

                                    <div className="inline-ad-slot">
                                        <iframe
                                            src="//www.highperformanceformat.com/281a994327b8eb88a8ef6183e80bf0c5"
                                            width="160"
                                            height="300"
                                            style={{
                                                border: 0,
                                                maxWidth: "100%",
                                            }}
                                            title="Advertisement"
                                        />
                                    </div>
                                </div>

                                <h2>Is This Instagram Downloader Free?</h2>

                                <p>
                                    Yes. The Instagram downloader is available to use online
                                    without requiring a paid membership or account registration.
                                </p>

                                <p>
                                    Advertising helps support the operation and maintenance of
                                    the free service.
                                </p>

                                <h2>Is Instagram Video Downloader Safe?</h2>

                                <p>
                                    You do not need to provide your Instagram username or
                                    password to use this downloader.
                                </p>

                                <p>
                                    Never enter your Instagram login credentials into a
                                    third-party downloader.
                                </p>

                                <p>
                                    For your privacy and security, only use the downloader
                                    with public Instagram URLs and avoid submitting sensitive
                                    information.
                                </p>

                                <p>
                                    We also recommend downloading only content that you own or
                                    have permission to save.
                                </p>

                                {/* AD */}
                                <div className="inline-ad">
                                    <div className="inline-ad-label">
                                        — Sponsored —
                                    </div>

                                    <div className="inline-ad-slot">
                                        <iframe
                                            src="//www.highperformanceformat.com/7a30d0deca33ac1d7b964680c8a83782"
                                            width="160"
                                            height="600"
                                            style={{
                                                border: 0,
                                                maxWidth: "100%",
                                            }}
                                            title="Advertisement"
                                        />
                                    </div>
                                </div>

                                <div className="blog-warning">
                                    <strong>
                                        ⚠ Copyright & Privacy Notice
                                    </strong>

                                    <p>
                                        Please respect the copyright, privacy, and intellectual
                                        property rights of Instagram users. Do not use downloaded
                                        content to infringe another person's copyright, privacy,
                                        or other rights.
                                    </p>
                                </div>

                                <h2>Frequently Asked Questions</h2>

                                <div className="faq-list">
                                    <details>
                                        <summary>
                                            What is an Instagram video downloader?
                                        </summary>

                                        <p>
                                            An Instagram video downloader is an online tool that
                                            can help you save publicly accessible Instagram videos
                                            or Reels to your device using their URL.
                                        </p>
                                    </details>

                                    <details>
                                        <summary>
                                            How do I download an Instagram Reel?
                                        </summary>

                                        <p>
                                            Copy the public Reel link from Instagram, paste it
                                            into the downloader above, click Download, and save the
                                            resulting video when it is ready.
                                        </p>
                                    </details>

                                    <details>
                                        <summary>
                                            Does the downloader work on Android or iPhone?
                                        </summary>

                                        <p>
                                            Yes. The website can be accessed through a modern
                                            mobile browser on Android and iPhone devices.
                                        </p>
                                    </details>

                                    <details>
                                        <summary>
                                            Do I need to install an application?
                                        </summary>

                                        <p>
                                            No. The downloader is browser-based, so you can use it
                                            directly from your web browser.
                                        </p>
                                    </details>

                                    <details>
                                        <summary>
                                            Do I need an Instagram account?
                                        </summary>

                                        <p>
                                            You do not need to provide your Instagram login
                                            credentials to use the downloader. The tool is intended
                                            for publicly accessible URLs.
                                        </p>
                                    </details>

                                    <details>
                                        <summary>
                                            Why isn't my Instagram video downloading?
                                        </summary>

                                        <p>
                                            Make sure that you copied the complete Instagram URL
                                            and that the content is publicly accessible. Instagram
                                            may also change how its content is delivered, which can
                                            temporarily affect third-party downloading tools.
                                        </p>
                                    </details>

                                    <details>
                                        <summary>
                                            Can I download private Instagram videos?
                                        </summary>

                                        <p>
                                            No. This service is intended for publicly accessible
                                            Instagram content and does not provide a way to bypass
                                            private-account restrictions.
                                        </p>
                                    </details>

                                    <details>
                                        <summary>
                                            Is this Instagram downloader affiliated with Instagram?
                                        </summary>

                                        <p>
                                            No. This website is an independent third-party service
                                            and is not affiliated with, endorsed by, or sponsored
                                            by Instagram or Meta.
                                        </p>
                                    </details>
                                </div>

                                <div className="blog-footer-note">
                                    <strong>
                                        Use Instagram Downloader Responsibly
                                    </strong>

                                    <p>
                                        This service is intended for downloading publicly
                                        available content that you have permission to save.
                                        Please respect creators and applicable copyright laws.
                                    </p>
                                </div>
                            </article>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;

