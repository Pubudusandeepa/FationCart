export default function formatCurrency(num) {
    return "$"+ Number(num.toFixed(1)).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}) + " ";
}