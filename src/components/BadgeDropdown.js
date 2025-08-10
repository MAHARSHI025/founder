"use client"
import React, { useState, useRef, useEffect } from 'react';

const BadgeDropdown = ({ selectedBadges = [], onBadgeChange, placeholder = "Select badges..." }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Predefined badge options with colors and icons
    const badgeOptions = [
        { id: 'startup', label: 'Startup', color: '-blue-600', icon: '🚀' },
        { id: 'tech', label: 'Technology', color: '-purple-600', icon: '💻' },
        { id: 'finance', label: 'Finance', color: '-green-600', icon: '💰' },
        { id: 'healthcare', label: 'Healthcare', color: '-red-600', icon: '🏥' },
        { id: 'education', label: 'Education', color: '-yellow-600', icon: '📚' },
        { id: 'ecommerce', label: 'E-commerce', color: '-pink-600', icon: '🛒' },
        { id: 'ai', label: 'AI/ML', color: '-indigo-600', icon: '🤖' },
        { id: 'blockchain', label: 'Blockchain', color: '-orange-600', icon: '⛓️' },
        { id: 'sustainability', label: 'Sustainability', color: '-emerald-600', icon: '🌱' },
        { id: 'media', label: 'Media', color: '-rose-600', icon: '📺' },
        { id: 'gaming', label: 'Gaming', color: '-violet-600', icon: '🎮' },
        { id: 'fitness', label: 'Fitness', color: '-cyan-600', icon: '💪' },
        { id: 'food', label: 'Food & Beverage', color: '-amber-600', icon: '🍕' },
        { id: 'travel', label: 'Travel', color: '-teal-600', icon: '✈️' },
        { id: 'realestate', label: 'Real Estate', color: '-slate-600', icon: '🏠' },
        { id: 'consulting', label: 'Consulting', color: '-gray-600', icon: '💼' },
        { id: 'nonprofit', label: 'Non-Profit', color: '-lime-600', icon: '🤝' },
        { id: 'manufacturing', label: 'Manufacturing', color: '-zinc-600', icon: '🏭' },
        { id: 'retail', label: 'Retail', color: '-stone-600', icon: '🛍️' },
        { id: 'transportation', label: 'Transportation', color: '-neutral-600', icon: '🚗' }
    ];

    // Filter badges based on search term


    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Toggle badge selection
    const toggleBadge = (badgeId) => {
        const newSelectedBadges = selectedBadges.includes(badgeId)
            ? selectedBadges.filter(id => id !== badgeId)
            : [...selectedBadges, badgeId];
        
        onBadgeChange(newSelectedBadges);
    };

    // Get selected badge objects
    const selectedBadgeObjects = badgeOptions.filter(badge => 
        selectedBadges.includes(badge.id)
    );

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Selected badges display */}
            <div 
                className="min-h-[44px] border border-gray-300 rounded-lg p-2 cursor-pointer bg-white hover:border-gray-400 transition-all duration-200 "
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-1">
                    {selectedBadgeObjects.length > 0 ? (
                        selectedBadgeObjects.map((badge) => (
                                                         <div
                                 key={badge.id}
                                 className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text${badge.color} text-sm font-medium border border${badge.color}`}
                             >
                                <span>{badge.icon}</span>
                                <span>{badge.label}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleBadge(badge.id);
                                    }}
                                    className="ml-1 hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    ) : (
                        <span className="text-gray-500 text-sm">{placeholder}</span>
                    )}
                </div>
            </div>

            {/* Dropdown arrow */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </div>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg  max-h-60 overflow-hidden backdrop-blur-sm transition-all duration-150"
                >

                        {/* Badge options */}
                        <div className="max-h-48 overflow-y-auto">
                            {badgeOptions.length > 0 ? (
                                badgeOptions.map((badge) => (
                                    <div
                                        key={badge.id}
                                        className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors hover:bg-gray-50 ${
                                            selectedBadges.includes(badge.id) ? 'bg-blue-50' : ''
                                        }`}
                                        onClick={() => toggleBadge(badge.id)}
                                    >
                                        <div className={`w-6 h-6 rounded-full border border${badge.color} flex items-center justify-center text-white text-xs`}>
                                            {badge.icon}
                                        </div>
                                        <span className="text-lg font-large text-gray-700">
                                            {badge.label}
                                        </span>
                                        {selectedBadges.includes(badge.id) && (
                                            <div className="ml-auto text-blue-600">
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-4 text-center text-gray-500 text-sm">
                                    No badges found
                                </div>
                            )}
                        </div>
                </div>
            )}
        </div>
    );
};

export default BadgeDropdown; 