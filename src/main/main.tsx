import React, { useEffect, useState } from 'react';
import PhotoList from '../photo-list/photo-list';
import PhotoListPreview from '../photo-list-preview/photo-list-preview';
import './main.css';

export interface PhotoItemData {
    name: string;
    image: string;
}

export interface PhotoData {
    foldername: string;
    photolist: PhotoItemData[];
}

export default function Main() {
    const [photoList, setPhotoList] = useState<PhotoData[]>([]);

    const [selectedItem, setSelectedItem] = useState<PhotoData>();

    useEffect(() => {
        fetch("http://localhost:8080/photo-data")
            .then(res => res.json())
            .then(result => {
                setPhotoList(result);
            })
    }, [])

    return (
        <div>
            <h1>Photo List</h1>
            <div className="main">
                <div>
                    <PhotoList items={photoList} onClick={setSelectedItem} selectedItem={selectedItem}></PhotoList>
                </div>
                <div>
                    {selectedItem ? <PhotoListPreview photolist={selectedItem.photolist}></PhotoListPreview> : <div>Select an folder</div>}
                </div>
            </div>
        </div>
    )
}