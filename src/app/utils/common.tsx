export function formatNumber(v: number): string {
    if (v >= 1e12) {
        return (v / 1e12).toFixed(2) + "T";
    }
    if (v >= 1e9) {
        return (v / 1e9).toFixed(2) + "B";
    } else if (v >= 1e6) {
        return (v / 1e6).toFixed(2) + "M";
    } else if (v >= 1) {
        return v.toFixed(2).toString();
    } else if (v >= 1e-3) {
        return v.toFixed(5);
    } else {
        return v.toString();
    }
}
