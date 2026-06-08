import { useState } from "react";
import { useLucideIcons } from "../hooks/useLucideIcons.js";
import imageCompression from 'browser-image-compression';
import "./GuestUploadSection.css";

// Easily identifiable placeholder strings for Cloudinary credentials
const CLOUDINARY_CLOUD_NAME = "dcyk0cijc";       // Replace with your Cloudinary Cloud Name
const CLOUDINARY_UPLOAD_PRESET = "wedding_booth"; // Replace with your Cloudinary Unsigned Upload Preset


export function GuestUploadSection() {
    const maxPhotos = 5;
    // REMOVE THIS BEFORE THE WEDDING!
    localStorage.removeItem("wedding_upload_count");

    const [uploadedCount, setUploadedCount] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("wedding_upload_count");
            const parsed = parseInt(saved, 10);
            return isNaN(parsed) ? 0 : Math.min(parsed, maxPhotos);
        }
        return 0;
    });

    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // Real-time upload percentage (0 - 100)
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
            maxSizeMB: 1, // Compress to ~1MB to save Cloudinary storage
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

        // Track progress per file. We start with original size, but will update it after compression.
        const progressTracker = files.map(file => ({ loaded: 0, total: file.size }));
        let successfulUploads = 0;

        const uploadFile = async (file, index) => {
            try {
                // 1. Compress the file before uploading
                const compressedFile = await imageCompression(file, options);

                // Update tracker with the new smaller size so the progress bar stays accurate
                progressTracker[index].total = compressedFile.size;

                // 2. Perform the upload
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);

                    // Listen to upload progress events
                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            progressTracker[index].loaded = event.loaded;

                            // Compute overall combined progress
                            const totalLoaded = progressTracker.reduce((sum, item) => sum + item.loaded, 0);
                            const totalSize = progressTracker.reduce((sum, item) => sum + item.total, 0);
                            const percentage = Math.round((totalLoaded / totalSize) * 100);
                            setUploadProgress(percentage);
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
                    formData.append("file", compressedFile); // Append the compressed file, not original
                    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                    xhr.send(formData);
                });
            } catch (error) {
                return Promise.reject(new Error("Image compression failed."));
            }
        };

        try {
            // Upload all selected files in parallel
            const uploadPromises = files.map((file, idx) => uploadFile(file, idx));
            await Promise.allSettled(uploadPromises);

            if (successfulUploads > 0) {
                const newCount = uploadedCount + successfulUploads;
                setUploadedCount(newCount);
                localStorage.setItem("wedding_upload_count", String(newCount));

                if (successfulUploads === files.length) {
                    setStatus({
                        type: "success",
                        message: `Successfully uploaded ${successfulUploads} photo(s)! Thank you for sharing.`
                    });
                } else {
                    setStatus({
                        type: "success",
                        message: `Uploaded ${successfulUploads} photo(s), but some failed. Please try again.`
                    });
                }
            } else {
                setStatus({
                    type: "error",
                    message: "Failed to upload images. Please try again."
                });
            }
        } catch (err) {
            console.error("Cloudinary upload error:", err);
            setStatus({
                type: "error",
                message: "An unexpected error occurred during upload. Please check your connection."
            });
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            e.target.value = ""; // Clear file input selection
        }
    };

    return (
        <section className="section guest-upload-section" id="upload" aria-labelledby="uploadTitle">
            <div className="section-inner upload-grid reveal is-visible">

                <div className="upload-content-card animate-fade-in">
                    <span className="eyebrow">Share Your View</span>
                    <h2 id="uploadTitle">Live Memory Booth</h2>

                    <p className="upload-text">
                        We'd love to see our special day through your eyes! Snap and share up to 5 of your favorite moments with us. Your photos will be privately saved to our digital wedding album.
                    </p>

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

                    {/* Real-time Upload Progress Bar */}
                    {isUploading && (
                        <div className="upload-progress-container" aria-live="polite">
                            <div className="progress-bar-track">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <span className="progress-percentage">{uploadProgress}% Uploading...</span>
                        </div>
                    )}

                    {/* Status/Error Messages */}
                    {status && !isUploading && (
                        <div className={`upload-message ${status.type}`} role="alert">
                            {status.type === "success" ? (
                                <i data-lucide="check-circle" className="msg-icon" aria-hidden="true"></i>
                            ) : (
                                <i data-lucide="alert-circle" className="msg-icon" aria-hidden="true"></i>
                            )}
                            <span>{status.message}</span>
                        </div>
                    )}

                    {/* Limit Reached Note */}
                    {uploadedCount >= maxPhotos && (
                        <div className="thank-you-note">
                            <i data-lucide="heart" className="heart-icon-gold" aria-hidden="true"></i>
                            <p>You have shared 5 beautiful moments. Thank you for completing our digital guest album!</p>
                        </div>
                    )}

                    {/* Action Area */}
                    <div className="upload-actions">
                        <label
                            className={`submit-button upload-btn ${isUploading ? 'is-loading' : ''} ${uploadedCount >= maxPhotos ? 'disabled' : ''}`}
                            style={uploadedCount >= maxPhotos ? { opacity: 0.5, pointerEvents: 'none' } : undefined}
                        >
                            <i data-lucide={isUploading ? "loader-2" : "camera"} className={isUploading ? "animate-spin" : ""} aria-hidden="true"></i>
                            <span>{isUploading ? "Uploading..." : "Choose / Take Photo"}</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                style={{ display: "none" }}
                                disabled={isUploading || uploadedCount >= maxPhotos}
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    {/* Bottom Signature matches your PersonalNoteSection */}
                    <div className="upload-signature">
                        <span className="signature-salutation">Thank you for capturing this,</span>
                        <div className="signature-names">Nimasha &amp; Dinuka</div>
                    </div>
                </div>

            </div>
        </section>
    );
}