import React from 'react';

// Animation météo SVG/CSS selon le code météo
export default function WeatherAnimation({ iconCode, description }) {
    // Soleil
    if (iconCode.startsWith('01')) {
        return (
            <svg width="90" height="90" viewBox="0 0 90 90">
                <circle cx="45" cy="45" r="22" fill="#FFD93B">
                    <animate attributeName="r" values="20;24;20" dur="2s" repeatCount="indefinite" />
                </circle>
                {[...Array(8)].map((_, i) => (
                    <line
                        key={i}
                        x1={45 + 32 * Math.cos((i * Math.PI) / 4)}
                        y1={45 + 32 * Math.sin((i * Math.PI) / 4)}
                        x2={45 + 40 * Math.cos((i * Math.PI) / 4)}
                        y2={45 + 40 * Math.sin((i * Math.PI) / 4)}
                        stroke="#FFD93B"
                        strokeWidth="4"
                        strokeLinecap="round"
                        opacity="0.7"
                    >
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                    </line>
                ))}
            </svg>
        );
    }
    // Nuages
    if (["02", "03", "04"].some(code => iconCode.startsWith(code))) {
        return (
            <svg width="90" height="90" viewBox="0 0 90 90">
                <ellipse cx="50" cy="60" rx="24" ry="14" fill="#B0BEC5">
                    <animate attributeName="cx" values="50;54;50" dur="2s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="38" cy="65" rx="16" ry="10" fill="#CFD8DC" />
            </svg>
        );
    }
    // Pluie
    if (["09", "10"].some(code => iconCode.startsWith(code))) {
        return (
            <svg width="90" height="90" viewBox="0 0 90 90">
                <ellipse cx="50" cy="60" rx="24" ry="14" fill="#90A4AE" />
                <ellipse cx="38" cy="65" rx="16" ry="10" fill="#B0BEC5" />
                {[0, 1, 2].map(i => (
                    <line
                        key={i}
                        x1={40 + i * 10}
                        y1="75"
                        x2={40 + i * 10}
                        y2="85"
                        stroke="#2196F3"
                        strokeWidth="3"
                    >
                        <animate attributeName="y1" values="75;85;75" dur="1.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                        <animate attributeName="y2" values="85;95;85" dur="1.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                    </line>
                ))}
            </svg>
        );
    }
    // Orage
    if (iconCode.startsWith("11")) {
        return (
            <svg width="90" height="90" viewBox="0 0 90 90">
                <ellipse cx="50" cy="60" rx="24" ry="14" fill="#90A4AE" />
                <polygon points="50,70 58,70 52,85 60,85" fill="#FFD93B">
                    <animate attributeName="points" values="50,70 58,70 52,85 60,85;50,75 58,75 52,90 60,90;50,70 58,70 52,85 60,85" dur="0.7s" repeatCount="indefinite" />
                </polygon>
            </svg>
        );
    }
    // Neige
    if (iconCode.startsWith("13")) {
        return (
            <svg width="90" height="90" viewBox="0 0 90 90">
                <ellipse cx="50" cy="60" rx="24" ry="14" fill="#B0BEC5" />
                {[0, 1, 2].map(i => (
                    <circle
                        key={i}
                        cx={45 + i * 10}
                        cy="80"
                        r="3"
                        fill="#fff"
                    >
                        <animate attributeName="cy" values="80;90;80" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                ))}
            </svg>
        );
    }
    // Brouillard/vent
    if (iconCode.startsWith("50")) {
        return (
            <svg width="90" height="90" viewBox="0 0 90 90">
                <ellipse cx="50" cy="60" rx="24" ry="14" fill="#B0BEC5" />
                <rect x="30" y="75" width="30" height="4" rx="2" fill="#B0BEC5">
                    <animate attributeName="x" values="30;40;30" dur="1.5s" repeatCount="indefinite" />
                </rect>
            </svg>
        );
    }
    // Par défaut, soleil
    return (
        <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="22" fill="#FFD93B" />
        </svg>
    );
}
