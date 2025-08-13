# Logo Configuration Guide

## 🎨 Environment Variable Logo System

Your application now supports dynamic logo configuration through environment variables. Here's how to use it:

## Environment Variables

Add these to your `.env.local` file:

```env
# Application Branding
NEXT_PUBLIC_APP_NAME=Calcnest
NEXT_PUBLIC_APP_TAGLINE=Wellness Tools
NEXT_PUBLIC_APP_LOGO=/images/logo.svg
NEXT_PUBLIC_APP_LOGO_ALT=Calcnest Logo
```

## Logo Options

### 1. **SVG Logo** (Recommended)

```env
NEXT_PUBLIC_APP_LOGO=/images/logo.svg
```

- Best for scalability
- Small file size
- Perfect quality at any size

### 2. **PNG/JPG Logo**

```env
NEXT_PUBLIC_APP_LOGO=/images/logo.png
```

- Traditional image format
- Good for photographic logos

### 3. **External URL**

```env
NEXT_PUBLIC_APP_LOGO=https://yourdomain.com/logo.png
```

- For CDN-hosted logos
- External asset management

### 4. **Base64 Encoded**

```env
NEXT_PUBLIC_APP_LOGO=data:image/svg+xml;base64,PHN2Zy4uLg==
```

- Inline logos (no external requests)
- Best for small, simple logos

## Using the Logo Component

### Basic Usage

```tsx
import Logo from "@/components/ui/Logo";

<Logo />;
```

### Advanced Usage

```tsx
<Logo
  size="lg" // sm, md, lg, xl
  showText={true} // Show app name next to logo
  className="hover:scale-105" // Custom styling
  textClassName="text-blue-500" // Style the text
  href="/" // Make it clickable
/>
```

### Size Options

- **sm**: 24x24px icon
- **md**: 32x32px icon (default)
- **lg**: 40x40px icon
- **xl**: 48x48px icon

## Logo File Setup

1. **Create logo files** in `public/images/`:

   ```
   public/
   ├── images/
   │   ├── logo.svg    ← Your main logo
   │   ├── logo.png    ← Fallback format
   │   └── favicon.ico ← Browser icon
   ```

2. **Update environment variables** to point to your logo
3. **Restart development server** to load new environment variables

## Current Implementation

- ✅ **Navigation Header**: Uses Logo component with gradient styling
- ✅ **Footer**: Uses app name from environment
- ✅ **Metadata**: Uses app name for page titles
- ✅ **Fallback**: Heart icon when no custom logo is provided

## Logo Design Guidelines

### Recommended Specifications:

- **Format**: SVG (preferred) or PNG
- **Size**: 40x40px minimum for sharpness
- **Style**: Simple, clean design
- **Colors**: Consider your theme colors
- **Background**: Transparent or solid

### Example SVG Logo Structure:

```svg
<svg width="40" height="40" viewBox="0 0 40 40">
  <!-- Your logo content -->
</svg>
```

## Quick Start

1. **Design your logo** (40x40px, SVG preferred)
2. **Save it** as `public/images/logo.svg`
3. **Update `.env.local`**:
   ```env
   NEXT_PUBLIC_APP_LOGO=/images/logo.svg
   NEXT_PUBLIC_APP_LOGO_ALT=Your Logo Description
   ```
4. **Restart your dev server**
5. **Your logo appears** automatically in navigation and anywhere you use `<Logo />`

## Troubleshooting

- **Logo not showing?** Check file path and restart dev server
- **Wrong size?** Adjust the `size` prop on Logo component
- **Styling issues?** Use `className` and `textClassName` props
- **Need fallback?** Logo component automatically shows Heart icon if image fails

Your logo system is now fully centralized and configurable! 🎉
