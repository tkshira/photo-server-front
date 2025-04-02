import React from "react";
import PhotoItemPreview from "../photo-item-preview/photo-item-preview";
import './photo-list-preview.css';
import { PhotoItemData } from "../main/main";

interface PhotoListPreviewProps {
    photolist: PhotoItemData[];
}

export default function PhotoListPreview({ photolist }: PhotoListPreviewProps) {

    return (
        <div>
            <ul className="list">
                {photolist && photolist.length > 0 ? photolist.map((photo) => (
                    <PhotoItemPreview photoitemdata={photo}></PhotoItemPreview>
                )) : <div>No photo available</div>}
            </ul>
        </div>
    )

}