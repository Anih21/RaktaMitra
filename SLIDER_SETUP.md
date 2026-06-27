# Image Slider Setup Guide

## Overview
A modern, responsive image slider has been added to your homepage with the following features:
- ✅ Automatic slide changes every 5 seconds
- ✅ Smooth fade/slide animations
- ✅ Previous/Next navigation arrows
- ✅ Clickable navigation dots
- ✅ Autoplay pauses on hover
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Dark overlay for text readability
- ✅ 550px height on desktop, responsive on mobile

## Files Created
1. **src/components/ImageSlider.jsx** - Main slider component
2. **src/styles/image-slider.css** - Complete styling with animations and responsive design
3. **src/pages/Home.jsx** - Updated to include the slider

## How to Add Your Images

### Step 1: Prepare Your Images
You have 4 Gemini-generated images:
- `Gemini_Generated_Image_k5c47lk5c47lk5c4.png` → **slider-1.jpg**
- `Gemini_Generated_Image_k5c47lk5c47lk5c4 (1).png` → **slider-2.jpg**
- `Gemini_Generated_Image_k5c47lk5c47lk5c4 (2).png` → **slider-3.jpg**
- `Gemini_Generated_Image_k5c47lk5c47lk5c4 (3).png` → **slider-4.jpg**

**Recommended:**
- Convert PNG to JPG for better performance
- Resize to 1920x1080px for desktop quality
- Optimize file size (aim for <300KB per image)

### Step 2: Place Images in Public Folder
Copy renamed images to: `public/`

```
raktamitra (2)/
├── public/
│   ├── slider-1.jpg
│   ├── slider-2.jpg
│   ├── slider-3.jpg
│   └── slider-4.jpg
├── src/
├── package.json
...
```

### Step 3: (Optional) Customize Slide Content

Edit `src/pages/Home.jsx` around line 26-42 to customize titles, text, and CTAs:

```jsx
const sliderSlides = [
  {
    image: '/slider-1.jpg',
    title: 'Your custom title',
    text: 'Your custom description',
    cta: { text: 'Button text', link: '/donate-blood' }
  },
  // ... more slides
];
```

## Features Explanation

### Autoplay with Pause on Hover
- Slides automatically advance every 5 seconds
- Pauses when user hovers over the slider
- Resumes after 10 seconds of inactivity

### Navigation
- **Arrow buttons**: Click left/right to navigate
- **Dots**: Click any dot to jump to that slide
- Manual navigation pauses autoplay for 10 seconds

### Responsive Behavior
| Device | Height | Text Size |
|--------|--------|-----------|
| Desktop (1024px+) | 550px | Full content visible |
| Tablet (768-1024px) | 420px | Adjusted sizing |
| Mobile (480-768px) | 300px | Centered text |
| Small Mobile (<480px) | 240px | Title only, no description |

### Accessibility
- ✅ Keyboard navigation support (arrow buttons & dots focusable)
- ✅ ARIA labels for screen readers
- ✅ Respects `prefers-reduced-motion` preference
- ✅ High contrast dark overlay ensures text readability

## Customization Tips

### Change Slide Duration
Edit `src/components/ImageSlider.jsx` line 15:
```jsx
}, 5000);  // 5000ms = 5 seconds (change to your preference)
```

### Change Animation Speed
Edit `src/styles/image-slider.css` line 36:
```css
transition: opacity 0.8s ease-in-out;  /* Change 0.8s to your speed */
```

### Adjust Overlay Color
Edit `src/styles/image-slider.css` line 57:
```css
background: linear-gradient(
  135deg,
  rgba(15, 35, 55, 0.65) 0%,  /* Dark blue tint */
  rgba(31, 78, 137, 0.45) 50%,
  rgba(0, 0, 0, 0.35) 100%
);
```

### Change Arrow/Dot Colors
Edit `src/styles/image-slider.css` lines 153, 182:
```css
background: rgba(255, 153, 0, 0.9);  /* Change saffron color */
border-color: rgba(255, 153, 0, 1);
```

## Testing the Slider

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Verify:**
   - Slides auto-advance every 5 seconds
   - Arrows and dots work
   - Hover stops autoplay
   - Responsive on mobile (DevTools)
   - Text is readable over images

## Troubleshooting

### Images Not Showing
- Ensure images are in the `public/` folder
- Check file names match exactly: `/slider-1.jpg`, `/slider-2.jpg`, etc.
- Verify image paths in slider data

### Slider Not Responsive
- Check that styles are properly imported
- Inspect CSS in DevTools
- Clear browser cache

### Autoplay Not Working
- Check console for JavaScript errors
- Verify `setInterval` is not being blocked
- Test in different browser

## File Sizes & Optimization

For best performance:
- **JPG format**: 1920x1080px, 80-85% quality = ~200KB per image
- **WebP format**: Same dimensions, better compression = ~100KB per image

Example optimization (MacOS/Linux):
```bash
# Convert PNG to JPG
convert input.png -quality 85 -resize 1920x1080 output.jpg

# Or use ImageMagick for batch conversion
mogrify -format jpg -quality 85 *.png
```

## Next Steps

1. ✅ Copy images to `public/` folder
2. ✅ Test the slider in browser
3. ✅ Customize content if needed
4. ✅ Deploy!

---

**Component Location:** `src/components/ImageSlider.jsx`
**Styles Location:** `src/styles/image-slider.css`
**Usage in:** `src/pages/Home.jsx`
