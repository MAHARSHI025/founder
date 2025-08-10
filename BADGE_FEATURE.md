# Badge Feature Documentation

## Overview
The badge feature allows users to select multiple industry badges that represent their business or organization. These badges are displayed on their profile and in the market view.

## Components

### BadgeDropdown
A multi-select dropdown component that allows users to select multiple badges.

**Features:**
- Search functionality to filter badges
- Animated dropdown with smooth transitions
- Visual badges with icons and colors
- Click outside to close
- Returns an array of selected badge IDs

**Props:**
- `selectedBadges`: Array of selected badge IDs
- `onBadgeChange`: Callback function when badges change
- `placeholder`: Custom placeholder text

### BadgeDisplay
A component to display selected badges in a visual format.

**Features:**
- Animated badge appearance
- Color-coded badges with icons
- Responsive design
- Only shows if badges are selected

**Props:**
- `badges`: Array of badge IDs to display

## Available Badges

The system includes 20 predefined industry badges:

1. 🚀 Startup (Blue)
2. 💻 Technology (Purple)
3. 💰 Finance (Green)
4. 🏥 Healthcare (Red)
5. 📚 Education (Yellow)
6. 🛒 E-commerce (Pink)
7. 🤖 AI/ML (Indigo)
8. ⛓️ Blockchain (Orange)
9. 🌱 Sustainability (Emerald)
10. 📺 Media (Rose)
11. 🎮 Gaming (Violet)
12. 💪 Fitness (Cyan)
13. 🍕 Food & Beverage (Amber)
14. ✈️ Travel (Teal)
15. 🏠 Real Estate (Slate)
16. 💼 Consulting (Gray)
17. 🤝 Non-Profit (Lime)
18. 🏭 Manufacturing (Zinc)
19. 🛍️ Retail (Stone)
20. 🚗 Transportation (Neutral)

## Usage

### In Profile Edit Page
```jsx
import BadgeDropdown from '@/components/BadgeDropdown';

const [selectedBadges, setSelectedBadges] = useState([]);

<BadgeDropdown 
    selectedBadges={selectedBadges}
    onBadgeChange={setSelectedBadges}
    placeholder="Select your industry badges..."
/>
```

### In Profile Display
```jsx
import BadgeDisplay from '@/components/BadgeDisplay';

<BadgeDisplay badges={user.badges} />
```

## Database Schema

The user model includes a `badges` field:
```javascript
badges: {
    type: Array,
    default: []
}
```

## API Integration

The edit profile API accepts a `badges` field in the request body and updates the user's badges in the database.

## Styling

The components use Tailwind CSS classes and Framer Motion for animations. The design is responsive and follows the existing design system. 