import React from 'react';
import './photo-list.css';
import { PhotoData } from '../main/main';

interface PhotoListProps {
    items: PhotoData[];
    selectedItem: PhotoData | undefined;
    onClick: React.Dispatch<React.SetStateAction<PhotoData | undefined>>
}

export default function PhotoList({ items, selectedItem, onClick }: PhotoListProps) {
    return (
        <div className="photo-list">
            <ul>
                {items.length > 0 ? items.map(item => (
                    <li key={item.foldername} className={selectedItem === item ? 'selected' : ''} onClick={() => onClick(item)}>{item.foldername}</li>
                )) : <div>No items</div>}
            </ul>
        </div>
    )
}