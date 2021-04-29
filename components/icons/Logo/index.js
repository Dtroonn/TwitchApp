import React from 'react';

export default function Logo({ className }) {
    return (
        <svg
            className={className}
            style={{ width: '60px', height: '60px' }}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg">
            <rect fill="#6441a4" height="512" rx="15%" width="512" />
            <path
                d="m115 101-22 56v228h78v42h44l41-42h63l85-85v-199zm260 185-48 48h-78l-42 42v-42h-65v-204h233zm-48-100v85h-30v-85zm-78 0v85h-29v-85z"
                fill="#fff"
            />
        </svg>
    );
}
