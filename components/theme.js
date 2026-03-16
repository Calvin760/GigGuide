export const theme = {

    colors: {
        primary: "#1D4ED8",       // vivid blue for buttons, accents
        secondary: "#3B82F6",     // lighter blue for highlights

        background: "#F0F4FF",    // very light blue/gray background
        backgroundAlt: "#E0EBFF", // slightly darker for cards or headers

        surface: "#FFFFFF",        // white cards / UI sections

        text: "#1F2937",           // dark gray, easy on eyes
        textLight: "#4B5563",      // medium gray
        textGrey: "#9CA3AF",       // subtle gray

        border: "#D1D5DB",         // light gray borders

        error: "#EF4444",          // red
        success: "#10B981",        // green
        warning: "#F59E0B",        // yellow

        highlight: "#2563EB",      // bright blue accent

        dark: "#1E3A8A",           // deep blue
        white: "#FFFFFF"
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32
    },

    radius: {
        sm: 8,
        md: 14,
        lg: 22,
        pill: 999
    },

    fonts: {
        regular: "inter",
        medium: "inter-md",
        semibold: "inter-sb",
        bold: "inter-b",
    },

    typography: {
        title: {
            fontSize: 28,
            fontFamily: "inter-b",
            color: "#1F2937"
        },

        subtitle: {
            fontSize: 18,
            fontFamily: "inter-sb",
            color: "#1F2937"
        },

        body: {
            fontSize: 16,
            fontFamily: "inter",
            color: "#4B5563"
        },

        caption: {
            fontSize: 13,
            fontFamily: "inter-md",
            color: "#6B7280"
        }
    },

    shadows: {
        small: {
            shadowColor: "#1D4ED8",  // subtle blue shadow
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 3
        },

        card: {
            shadowColor: "#1D4ED8",
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 6
        },

        large: {
            shadowColor: "#1D4ED8",
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10
        }
    }

};