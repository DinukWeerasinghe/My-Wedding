import { useState } from "react";
import { useLucideIcons } from "../hooks/useLucideIcons.js";
import imageCompression from 'browser-image-compression';
import "./GuestUploadSection.css";

// Easily identifiable placeholder strings for Cloudinary credentials
const CLOUDINARY_CLOUD_NAME = "dcyk0cijc";       // Replace with your Cloudinary Cloud Name
const CLOUDINARY_UPLOAD_PRESET = "wedding_booth"; // Replace with your Cloudinary Unsigned Upload Preset


export function GuestUploadSection() {
    const maxPhotos = 5;

    const [uploadedCount, setUploadedCount] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("wedding_upload_count");
            const parsed = parseInt(saved, 10);
            return isNaN(parsed) ? 0 : Math.min(parsed, maxPhotos);
        }
        return 0;
    });

    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

    // Trigger Lucide icon updates when reactive states update
    useLucideIcons([uploadedCount, isUploading, uploadProgress, status]);

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (uploadedCount + files.length > maxPhotos) {
            setStatus({
                type: "error",
                message: `Limit exceeded! You can only upload ${maxPhotos - uploadedCount} more photo(s).`
            });
            e.target.value = "";
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);
        setStatus(null);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

        const progressTracker = files.map(file => ({ loaded: 0, total: file.size }));
        let successfulUploads = 0;

        const uploadFile = async (file, index) => {
            try {
                const compressedFile = await imageCompression(file, options);
                progressTracker[index].total = compressedFile.size;

                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);

                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            progressTracker[index].loaded = event.loaded;
                            const totalLoaded = progressTracker.reduce((sum, item) => sum + item.loaded, 0);
                            const totalSize = progressTracker.reduce((sum, item) => sum + item.total, 0);
                            setUploadProgress(Math.round((totalLoaded / totalSize) * 100));
                        }
                    };

                    xhr.onload = () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            successfulUploads++;
                            resolve();
                        } else {
                            let errMsg = "Upload failed";
                            try {
                                const errData = JSON.parse(xhr.responseText);
                                errMsg = errData.error?.message || errMsg;
                            } catch (_) { }
                            reject(new Error(errMsg));
                        }
                    };

                    xhr.onerror = () => reject(new Error("Network connection error."));
                    xhr.onabort = () => reject(new Error("Upload cancelled."));

                    const formData = new FormData();
                    formData.append("file", compressedFile);
                    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                    xhr.send(formData);
                });
            } catch {
                return Promise.reject(new Error("Image compression failed."));
            }
        };

        try {
            await Promise.allSettled(files.map((file, idx) => uploadFile(file, idx)));

            if (successfulUploads > 0) {
                const newCount = uploadedCount + successfulUploads;
                setUploadedCount(newCount);
                localStorage.setItem("wedding_upload_count", String(newCount));

                setStatus({
                    type: "success",
                    message: successfulUploads === files.length
                        ? `Thank you! ${successfulUploads} moment(s) added to our album 💛`
                        : `Uploaded ${successfulUploads} photo(s), but some failed. Please try again.`
                });
            } else {
                setStatus({ type: "error", message: "Upload failed. Please check your connection and try again." });
            }
        } catch (err) {
            console.error("Cloudinary upload error:", err);
            setStatus({ type: "error", message: "An unexpected error occurred. Please try again." });
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            e.target.value = "";
        }
    };

    const remainingSlots = maxPhotos - uploadedCount;
    const isAtLimit = uploadedCount >= maxPhotos;

    return (
        <section className="section guest-upload-section" id="upload" aria-labelledby="uploadTitle">
            <div className="section-inner upload-grid reveal is-visible">

                <div className="upload-content-card animate-fade-in">

                    {/* Floating camera decoration */}
                    <div className="upload-deco-icon" aria-hidden="true">
                        <i data-lucide="camera"></i>
                    </div>

                    <span className="eyebrow">Share Your View</span>
                    <h2 id="uploadTitle">Live Memory Booth</h2>

                    <p className="upload-text">
                        Every smile, every tear, every joyful glance — your perspective makes our story complete.
                        Share up to 5 of your favourite moments and they&apos;ll live forever in our wedding album.
                    </p>

                    {/* Warm contextual label */}
                    {!isAtLimit && (
                        <span className="upload-invite-label">
                            <i data-lucide="sparkles" aria-hidden="true"></i>
                            {uploadedCount === 0
                                ? `Up to ${maxPhotos} photos welcome`
                                : `${remainingSlots} more moment${remainingSlots !== 1 ? "s" : ""} welcome`}
                        </span>
                    )}

                    {/* Overall Progress Tracker */}
                    <div className="upload-status">
                        <div className="status-track">
                            <div
                                className="status-fill"
                                style={{ width: `${(uploadedCount / maxPhotos) * 100}%` }}
                            ></div>
                        </div>
                        <span className="status-text">
                            {uploadedCount} of {maxPhotos} Moments Captured
                        </span>
                    </div>

                    {/* Real-time Upload Progress */}
                    {isUploading && (
                        <div className="upload-progress-container" aria-live="polite">
                            <div className="progress-bar-track">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <span className="progress-percentage">{uploadProgress}% Uploading…</span>
                        </div>
                    )}

                    {/* Status Messages */}
                    {status && !isUploading && (
                        <div className={`upload-message ${status.type}`} role="alert">
                            {status.type === "success"
                                ? <i data-lucide="check-circle" className="msg-icon" aria-hidden="true"></i>
                                : <i data-lucide="alert-circle" className="msg-icon" aria-hidden="true"></i>
                            }
                            <span>{status.message}</span>
                        </div>
                    )}

                    {/* Limit Reached */}
                    {isAtLimit && (
                        <div className="thank-you-note">
                            <i data-lucide="heart" className="heart-icon-gold" aria-hidden="true"></i>
                            <p>You have gifted us 5 beautiful moments. Thank you from the bottom of our hearts!</p>
                        </div>
                    )}

                    {/* Action Area */}
                    <div className="upload-actions">
                        <label
                            className={`submit-button upload-btn ${isUploading ? "is-loading" : ""} ${isAtLimit ? "disabled" : ""}`}
                            style={isAtLimit ? { opacity: 0.42, pointerEvents: "none" } : undefined}
                        >
                            <i
                                data-lucide={isUploading ? "loader-2" : "camera"}
                                className={isUploading ? "animate-spin" : ""}
                                aria-hidden="true"
                            ></i>
                            <span>{isUploading ? "Uploading…" : "Add Your Photo"}</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                style={{ display: "none" }}
                                disabled={isUploading || isAtLimit}
                                onChange={handleFileChange}
                            />
                        </label>

                        {!isAtLimit && !isUploading && (
                            <span className="upload-hint">Opens your camera or photo library</span>
                        )}
                    </div>

                    {/* Signature */}
                    <div className="upload-signature">
                        <span className="signature-salutation">Thank you for capturing this,</span>
                        <div className="signature-names">Nimasha &amp; Dinuka</div>
                    </div>

                </div>
            </div>
        </section>
    );
}