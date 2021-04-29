import React from 'react';
import Title from '../components/Title';

export default function Home() {
    return (
        <div className="container">
            <Title>
                Добро пожаловать, это сервис для поиска и добавления видео в избранное. Вбейте в
                строку поиска что-нибудь.
            </Title>
        </div>
    );
}
