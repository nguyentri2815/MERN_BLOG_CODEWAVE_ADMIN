function removeAccents(str) {
    const accents = 'àáạảãâầấậẩẫäçèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ';
    const noAccents = 'aaaaaaaaaaaceeeeeeiiiiiioooooooooooouuuuuuuuuuyyyyy';
    return str
        .split('')
        .map((char) => {
            const index = accents.indexOf(char);
            return index !== -1 ? noAccents[index] : char;
        })
        .join('');
}

export function textToSlug(text) {
    return removeAccents(text)                // Remove accents
        .toLowerCase()                        // Convert to lowercase
        .trim()                               // Trim whitespace from both ends
        .replace(/[\s]+/g, '-')               // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')             // Remove all non-word characters (except hyphens)
        .replace(/\-\-+/g, '-')               // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, '');             // Remove hyphens from start and end
}