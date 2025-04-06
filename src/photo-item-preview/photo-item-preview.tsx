import React from 'react';
import './photo-item-preview.css';
import { PhotoItemData } from '../main/main';

interface PhotoItemPreviewProps{
    photoitemdata: PhotoItemData;
}

export default function PhotoItemPreview(props: PhotoItemPreviewProps) {
    return (
        <div className="photo-item-preview">{props.photoitemdata.name}
        <img src={`data:image/png;base64,${props.photoitemdata.image}`} alt={props.photoitemdata.name}></img>
        </div>
    )
}