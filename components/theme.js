// theme.js

export const theme = {

    colors: {
        primary: "#FF2D6F",      // pink accent (buttons)
        secondary: "#4FD1FF",    // blue accent

        background: "#5B1EE5",   // purple background
        backgroundAlt: "#3C0FB5",

        surface: "#FFFFFF",      // cards / UI sections

        text: "#111111",         // black text
        textLight: "#444444",

        border: "#E5E5E5",

        error: "#FF4D6D",
        success: "#22C55E",
        warning: "#F59E0B",

        highlight: "#FF5C8A",

        dark: "#1A0A5E",
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
        regular: "System",
        medium: "System",
        semibold: "System",
        bold: "System"
    },

    fontWeights: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700"
    },

    typography: {
        title: {
            fontSize: 28,
            fontWeight: "700",
            color: "#111111"
        },

        subtitle: {
            fontSize: 18,
            fontWeight: "600",
            color: "#111111"
        },

        body: {
            fontSize: 16,
            fontWeight: "400",
            color: "#222222"
        },

        caption: {
            fontSize: 13,
            fontWeight: "400",
            color: "#555555"
        }
    },

    shadows: {
        small: {
            shadowColor: "#1A0A5E",
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 3
        },

        card: {
            shadowColor: "#1A0A5E",
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 6
        },

        large: {
            shadowColor: "#1A0A5E",
            shadowOpacity: 0.35,
            shadowRadius: 18,
            elevation: 10
        }
    }

};