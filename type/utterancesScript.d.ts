declare namespace astroHTML.JSX {
    interface ScriptHTMLAttributes {
        repo?: string,
        theme?: "github-light" | "github-dark" | "preferred-color-scheme" | "github-dark-orange" | "icy-dark" | "dark-blue" | "photon-dark" | "boxy-light" | "gruvbox-dark"
        'issue-term'?: string | "pathname" | "url" | "title" | "og:title"
        'issue-number'?: string
    }
}