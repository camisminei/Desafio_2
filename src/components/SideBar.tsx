import { useEffect, useState } from 'react';

import { Button } from '../components/Button';

import { api } from '../services/api';


export interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface SideBarProps {
    selectedGenreId: number;
    genreSelected: (id: number) => void;
}


export function SideBar({ selectedGenreId, genreSelected }: SideBarProps) {

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    function handleClickButton(id: number) {
        genreSelected(id);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <nav className="sidebar">
                <span>Watch<p>Me</p></span>
                <div className="buttons-container">
                    {genres.map(genre => (
                        <Button
                            key={String(genre.id)}
                            title={genre.title}
                            iconName={genre.name}
                            onClick={() => handleClickButton(genre.id)}
                            selected={selectedGenreId === genre.id}
                        />
                    ))}
                </div>
            </nav>
        </div>
    )



}